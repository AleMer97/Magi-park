import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polygon, Polyline, useMap, useMapEvents } from "react-leaflet";

import axios from "axios";
import apiHandler from "../utils/ApiHandler";

import exampleRoute from "../data/ExampleRouteDTO.json"

import parkingDark from "../data/parking-sign.svg"
import parkingGreen from "../data/parkingGreen.svg"


function GetBounds() {  
    let map = useMap();
    console.log('map bounds:', map.getBounds());
    return null
}




function ShortTermMap (props) {

    const zoom = 16;

    // const exroute = exampleRoute.legDTOs.map(leg => leg.nodes.map(node => [node.longitude, node.latitude]))

    // const deliveryZone = [[48.152329, 11.582429],
    //                     [48.152329, 11.59],
    //                     [48.136, 11.594],
    //             [48.13, 11.582429]]
    
    // useEffect(())
    const location = props.location
    const emptySpots = props.emptySpots
    const carLength = props.carLength

    const [activeSpot, setActiveSpot] = useState(null);

    const L = require('leaflet');

    const darkParkingIcon = L.icon({
        iconUrl: parkingDark,
        iconRetinaUrl: parkingDark,
        iconSize: [45,48],
        iconAnchor: [24, 48],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    const greenParkingIcon = L.icon({
        iconUrl: parkingGreen,
        iconRetinaUrl: parkingGreen,
        iconSize: [64,64],
        iconAnchor: [32, 64],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    return(
        <div class="h-full w-full">
            
            <div class="h-full">
                <MapContainer 
                    center={location} 
                    zoom={zoom}
                    
                    style={{ height: '460px', width: '100%' }}
                >
                    {/* <GetBounds/> */}
                    {/*
                    <TileLayer
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}"
                        attribution='<a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>'
                        subdomains= 'abcd'
                        minZoom= {0}
                        maxZoom= {18}
                        ext= 'png'
                    />*/}

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                    {/* <Polygon 
                        positions={deliveryZone}
                    /> */}
                    
                    <Marker position={location}/>

                    {/* <Polyline positions={exroute}/> */}
                    {emptySpots.map(spot => (
                        (spot.length > carLength)?(
                            <Marker
                                position={[
                                    spot.latitude,spot.longitude
                                ]}
                                icon={darkParkingIcon}
                        
                                onClick={() => {
                                    setActiveSpot(spot);
                            }}
                            />
                        ):(null)
                        
                    ))};

                    {activeSpot && (
                        <Popup
                        position={[
                            0,0
                        ]}
                        onClose={() => {
                            setActiveSpot(null);
                        }}
                        >
                        <div>
                            <h2>{activeSpot.timestamp}</h2>
                            <p>{activeSpot.length}</p>
                            <p>{activeSpot.latitude}</p>
                            <p>{activeSpot.longitude}</p>
                            <p>{activeSpot.restriction}</p>
                        </div>
                        </Popup>
                    )}
                </MapContainer>
            </div>
        </div>
    )
}

export default ShortTermMap