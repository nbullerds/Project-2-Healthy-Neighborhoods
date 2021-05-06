# Import the functions we need from flask
from flask import Flask
from flask import render_template 
from flask import jsonify
from config import username, password

# Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Define the database connection parameters
database_name = 'MSP_Neighborhoods'
connection_string = f'postgresql://{username}:{password}@localhost:5432/{database_name}'

# Connect to the database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

# Choose the table we wish to use
neighborhoodsTable = base.classes.Neighborhoods
placesTable = base.classes.Places

# Instantiate the Flask application. (Chocolate cake recipe.)
# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching

# Here's where we define the various application routes ...
@app.route("/")
def IndexRoute():
    webpage = render_template("index.html")
    return webpage

@app.route("/neighborhoods")
def GetNeighborhoodsData():
    session = Session(engine)
    results = session.query(neighborhoodsTable).all()
    session.close

    nlist = []
    for i in results:
        ndict = {"Neighborhood": i.Neighborhood, 
        "City": i.City, 
        "NeighborhoodPopulation": i.NeighborhoodPopulation,
        "NeighborhoodHouseholds": i.NeighborhoodHouseholds, 
        "MedianIncome": i.MedianIncome, 
        "PublicTransportPrct": i.PublicTransportPrct, 
        "WalkBiketoWorkPrct": i.WalkBiketoWorkPrct, 
        "UnemploymentPrct": i.UnemploymentPrct, 
        "AgeBelow18Prct": i.AgeBelow18Prct, 
        "Age18To34Prct": i.Age18To34Prct, 
        "Age35To54Prct": i.Age35To54Prct, 
        "Age55To75Prct": i.Age55To75Prct, 
        "AgeAbove75Prct": i.AgeAbove75Prct}
        nlist.append(ndict)
    return jsonify(nlist)

@app.route("/places")
def GetPlacesData():
    session = Session(engine)
    results = session.query(placesTable).all()
    session.close

    plist = []
    for i in results:
        pdict = {"placeName": i.placeName, 
        "placeType": i.placeType, 
        "placeLat": i.placeLat,
        "placeLng": i.placeLng}
        nlist.append(pdict)
    return jsonify(plist)

# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)