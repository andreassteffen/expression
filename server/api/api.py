#!/usr/bin/env python
from logging.handlers import RotatingFileHandler

import connexion
import logging
import pandas as pd
import flask
import os

import sqlite3

def get_db():
	db = getattr(flask.g, '_database', None)
	if db is None:
		db = flask.g._database = sqlite3.connect(os.path.normpath(os.path.dirname(__file__) + '/../database/ccle.db'))
	return db

def calc_whisker(data):
	logger.info('Info', data)

	Q1, median, Q3 = pd.np.percentile(data.expression.tolist(), [25, 50, 75])
	IQR = Q3 - Q1

	loval = Q1 - 1.5 * IQR
	hival = Q3 + 1.5 * IQR

	whiskhi = list(pd.np.compress(data.expression >= hival, data.expression))
	whisklo = list(pd.np.compress(data.expression <= loval, data.expression))
	actual_hival = pd.np.max(whiskhi)
	actual_loval = pd.np.min(whisklo)
	
	return pd.Series({'open':Q1, 'median': median, 'high': Q3, 'low': loval, 'high': hival, 'outliers': whiskhi+whisklo })

def get_expression(symbol):
	conn = get_db()
	expression = pd.read_sql("SELECT e.celllinename, e.symbol, e.expression, a.site_primary, a.histology, a.hist_subtype1 FROM expression e JOIN annotation a ON e.annotation_id=a.id WHERE symbol = '{}'".format(symbol), conn)
	expression = expression.groupby('site_primary').apply(calc_whisker).reset_index()
	expression = expression.to_dict(orient = 'records')
	return expression or ('Not found', 404)

logging.basicConfig(level=logging.INFO)
app = connexion.App(__name__)

app.add_api('api.yaml')

EXPRESSION = {
	'BRD4':[{'celllinename':'HCT116','expression':4.0234}]
}

logger = logging.getLogger('connexion.api')


if __name__ == "__main__":
	app.run(port=3001, debug = True)

