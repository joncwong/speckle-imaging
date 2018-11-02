from flask_restful import Resource
from flaskext.mysql import MySQL
from mysql import mysql
import json

class SimpleSearch(Resource):
    def get(self):
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM dec14raw")
        data = cursor.fetchall()
        return json.dumps(data,indent=4)