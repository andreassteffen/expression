import flask
import sqlite3
import os

def get_db():
	db = getattr(flask.g, '_database', None)

	if db is None:
		db = flask.g._database = sqlite3.connect(os.path.normpath(os.path.dirname(__file__) + '/../../database/ccle.db'))
	return db
