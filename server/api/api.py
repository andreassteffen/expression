#!/usr/bin/env python

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


def get_expression(symbol):
	conn = get_db()
	expression = pd.read_sql("SELECT e.celllinename, e.symbol, e.expression, a.site_primary, a.histology, a.hist_subtype1 FROM expression e JOIN annotation a ON e.annotation_id=a.id WHERE symbol = '{}'".format(symbol), conn)
	expression = expression.groupby('site_primary').describe().reset_index().pivot(index = 'site_primary', columns = 'level_1', values = 'expression').reset_index()
	expression = expression.to_dict(orient = 'records')
	return expression or ('Not found', 404)

logging.basicConfig(level=logging.INFO)
app = connexion.App(__name__)

app.add_api('api.yaml')

EXPRESSION = {
	'BRD4':[{'celllinename':'HCT116','expression':4.0234}]
}



if __name__ == "__main__":
	app.run(port=3001, debug = True)