//
// Created by Sebastian on 20/11/2021.
//

#ifndef MAGIPARK_MAP_H
#define MAGIPARK_MAP_H

#include "../Json.h"
#include "KD-Tree.h"

class Map{
private:
    TwoDTree kdTree;

public:
    void addParking(Parking parking);

    MapOutput getAvailableParking(double lat1, double lon1, double lat2, double lon2);
};

#endif //MAGIPARK_MAP_H
