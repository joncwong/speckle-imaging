from flask import Flask
from flask_restful import Api
from resources.simplesearch import SimpleSearch
from mysql import mysql
app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
app.config['MYSQL_DATABASE_DB'] = 'speckle_imaging'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql.init_app(app)
api = Api(app)

api.add_resource(SimpleSearch, '/olist')

if __name__ == '__main__':
    app.run(debug=True)
