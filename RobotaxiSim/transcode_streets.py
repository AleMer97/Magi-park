import re
import json


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
        print(street['street'] + " | " + street['PLZ'])
        streets.append(street)


with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(streets, f, ensure_ascii=False, indent=4)
    
