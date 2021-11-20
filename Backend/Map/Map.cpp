//
// Created by Sebastian on 20/11/2021.
//

#include <iostream>
#include "Map.h"

void Map::addParking(Parking parking) {
    std::cout << parking.lat << " " << parking.lon << " " << parking.length << std::endl;
}

MapOutput Map::getAvailableParking(double lat1, double lon1, double lat2, double lon2) {
    return MapOutput();
}
