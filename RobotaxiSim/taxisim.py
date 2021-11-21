import re
import time
import json

from requests.api import request
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


def append_new_line(dictionary):
    """Append given text as a new line at the end of file"""
    with open(cachefilename, "a+") as file_object:
        # Move read cursor to the start of file.
        file_object.seek(0)
        # If file is not empty then append '\n'
        data = file_object.read(100)
        if len(data) > 0:
            file_object.write("\n")
        # Append text at the end of file
        file_object.write(json.dumps(dictionary))

def load_cache():
    f = open(cachefilename, "r")
    for line in f:
        line = line.rstrip('\n')
        response = requests.post(addspoturl, data={'data': line}, timeout=2)


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

cachefilename = parser.get('general', 'cachefilename')
addspoturl = parser.get('general', 'addspoturl')

print('Key: ' + parser.get('google_maps', 'key'))
gmaps = googlemaps.Client(key=parser.get('google_maps', 'key'))
streets = load_json('data.json')

load_cache()

while True:
    body = get_parkingspot()
    print(body)
    if body != None:
        append_new_line(body)
        response = requests.post(addspoturl ,data={'data': json.dumps(body)} ,timeout=2)
    time.sleep(2)