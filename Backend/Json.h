//
// Created by Sebastian on 20/11/2021.
//

#ifndef MAGIPARK_JSON_H
#define MAGIPARK_JSON_H
#include <vector>
#include "Map/KD-Tree.h"

struct Parking : Element{
    double lat = 0, lon = 0;
    double length = 0;

    double getX() override{
        return lat;
    }

    double getY() override{
        return lon;
    }

    bool operator==(Element * other) override{
        if(auto o = dynamic_cast<Parking*>(other)){
            return o->lat == lat && o->lon == lon && o->length == length;
        }
        return false;
    }
};

struct MapOutput{
    std::vector<Parking> availableParkings;
    std::vector<Parking> parkingProbability;
};

#endif //MAGIPARK_JSON_H
