import re
import json
import googlemaps
from configparser import SafeConfigParser

parser = SafeConfigParser()
parser.read('settings.ini')

print('Key: ' + parser.get('google_maps', 'key'))


gmaps = googlemaps.Client(key=parser.get('google_maps', 'key'))

f = open("munichlist", "r")
streets = []
for line in f:
    line = line.rstrip('\n')
    street = {'street': '', 'PLZ': ''}
    strcount = 0
    words = line.split(" ")
    for word in words:
        if re.match(r"\b\d{5}\b", word):
            street['PLZ'] = word
            continue
        if word != '':
            if strcount == 0:
                street['street'] = word
                strcount = 1
            else:
                street['street'] += ' ' + word
    if strcount == 1:
        try:
            geocode_result = gmaps.geocode(street['street'] + ' ,' + street['PLZ'] + ', Munich, Germany')
            street['geobounds'] = geocode_result[0]['geometry']['bounds']
            street['center'] = geocode_result[0]['geometry']['location']
            print(street['street'] + " | " + street['PLZ'] + " | " + str(street['geobounds']) + " | " + str(street['center']) )
            streets.append(street)
        except: 
            print("Straße nicht gefunden")


with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(streets, f, ensure_ascii=False, indent=4)
    


# Geocoding an address


