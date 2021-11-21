from genericpath import exists
from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource
from geopy import distance
from datetime import datetime as dt
from configparser import ConfigParser
import json
import random
import os
import googlemaps

#Init
parser = ConfigParser()
parser.read(os.path.join(os.path.abspath(os.path.dirname(__file__)),'settings.ini'))
print('Key: ' + parser.get('google_maps', 'key'))
gmaps = googlemaps.Client(key=parser.get('google_maps', 'key'))

app = Flask(__name__)
api = Api(app)

parkingsspots = []

def get_parkingsspots(requ):

    matching = []
    for spot in parkingsspots:
        if spot['length'] >= float(requ["length"]):
            spotloc = (float(requ["lat"]), float(requ["lon"]))
            if distance.distance(spotloc, (spot['latitude'], spot['longitude'])).km <= float(requ["radius"]):
                matching.append(spot)
    return matching


#def get_intensity(lat, lng):


class GetParkingSpot(Resource):
    def get(self):
        requ = request.args.to_dict()
        print(requ)
        if all(key in requ for key in ["lat", "lon", "radius" ,"length"]):
            print("test")
            return get_parkingsspots(requ)
        else:
            return "Error Missing Arguments lat, lon, radius, length " , 400

class AddParkingSpot(Resource):
    def post(self):
        spot = json.loads(request.form['data'])
        spot["timestamp"] = dt.now().isoformat(timespec="seconds")
        parkingsspots.append(spot)
        print(str(parkingsspots))
        return

class DelParkingSpot(Resource):
    def get(self):
        rand = random.randrange(0,len(parkingsspots)-1,1)
        parkingsspots.pop(rand)
        return

class GetLocation(Resource):
    def post(self):
        loc = request.form['location']
        if 'all' in request.form.keys() :
            if request.form['all'] == "True":
                return gmaps.geocode(loc)
        return gmaps.geocode(loc)[0]['geometry']['location']
        

api.add_resource(AddParkingSpot, '/addParkingSpot')
api.add_resource(DelParkingSpot, '/delParkingSpot')
api.add_resource(GetParkingSpot, '/getParkingSpot')
api.add_resource(GetLocation, '/getLocation')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)