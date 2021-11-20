from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource
import json

app = Flask(__name__)
api = Api(app)

parkingsspots = []

def get_parkingsspots(requ):

    matching = []
    for spot in parkingsspots:
        if spot['length'] >= float(requ["length"]):
            if ( float(requ["swlat"]) <= spot['latitude'] <= float(requ["nelat"]) ) and ( float(requ["swlon"]) <=  spot['longitude'] <= float(requ["nelon"])):
                matching.append(spot)
    return matching


#def get_intensity(lat, lng):


class GetParkingSpot(Resource):
    def get(self):
        requ = request.args.to_dict()
        print(requ)
        if all(key in requ for key in ["swlat", "swlon", "nelat", "nelon", "length"]):
            print("test")
            return get_parkingsspots(requ)
        else:
            return "Error Missing Arguments", 400

class AddParkingSpot(Resource):
    def post(self):
        parkingsspots.append(json.loads(request.form['data']))
        print(str(parkingsspots))
        return


api.add_resource(AddParkingSpot, '/addParkingSpot')
api.add_resource(GetParkingSpot, '/getParkingSpot')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)