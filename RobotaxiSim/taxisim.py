import re
import time
import json
import googlemaps
import random
import requests
from configparser import ConfigParser

def load_json(filepath):
    f = open(filepath)
    return json.load(f)

def get_point_on_road(boundery): 
    lat = get_rand_in_range(boundery['southwest']['lat'], boundery['northeast']['lat'])
    lng = get_rand_in_range(boundery['southwest']['lng'], boundery['northeast']['lng'])
    return gmaps.nearest_roads(str(lat) + ", " + str(lng))


def get_rand_in_range(lower, greater):
    range = greater - lower
    rand = (random.random() * range)
    return  rand + lower

def get_spotlen():
    return get_rand_in_range(2, 10)

def get_parkingspot():
    randstreet = streets[random.randrange(0,len(streets)-1,1)]
    print("Origional: " + randstreet['street'])
    try:
        result = get_point_on_road(randstreet['geobounds'])[0]['location']
        #print(gmaps.place(get_point_on_road(randstreet['geobounds'])[0]['placeId']))
        result['length'] = get_spotlen()
        result['restrictions'] = ""
        print(str(result))
        return result
    except:
        return None

#Init
parser = ConfigParser()
parser.read('settings.ini')

print('Key: ' + parser.get('google_maps', 'key'))
gmaps = googlemaps.Client(key=parser.get('google_maps', 'key'))
streets = load_json('data.json')

while True:
    body = get_parkingspot()
    print(body)
    if body != None:
        response = requests.post("http://10.0.0.20:8080/addParkingSpot" ,data={'data': json.dumps(body)} ,timeout=2)
    time.sleep(0.5)