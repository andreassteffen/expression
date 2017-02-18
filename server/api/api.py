#!/usr/bin/env python
from flask import Flask
from flask_restplus import Resource, Api

from helper.statistics import calc_whisker
from helper.database import get_db
import pandas as pd

app = Flask(__name__)
api = Api(app)


#endpoints
@api.route('/api/expression/<string:symbol>')
class expression(Resource):
	def get(self, symbol):
		app.logger.info('shit')	
		conn = get_db()
		expression = pd.read_sql("SELECT e.celllinename, e.symbol, e.expression, a.site_primary as x, a.histology, a.hist_subtype1 FROM expression e JOIN annotation a ON e.annotation_id=a.id WHERE symbol = '{}'".format(symbol), conn)
		expression = expression.groupby('x').apply(calc_whisker).reset_index()
		expression.x = expression.x.str.replace('_',' ')
		expression = expression.to_dict(orient = 'records')
		return expression or ('Not found', 404)

if __name__ == "__main__":
	app.run(port=3001, debug = True)

