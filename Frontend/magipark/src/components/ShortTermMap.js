import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polygon, Polyline, useMap, useMapEvents } from "react-leaflet";

import axios from "axios";
import apiHandler from "../utils/ApiHandler";

import exampleRoute from "../data/ExampleRouteDTO.json"

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

    return(
        <div class="h-full w-full">
            <p class="h-auto">Shortterm Map</p>
            
            <div class="h-full">
                <MapContainer 
                    center={location} 
                    zoom={zoom}
                    
                    style={{ height: '460px', width: '100%' }}
                >
                    {/* <GetBounds/> */}
                    <TileLayer
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}"
                        attribution='<a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>'
                        subdomains= 'abcd'
                        minZoom= {0}
                        maxZoom= {18}
                        ext= 'png'
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
                        
                            //     onClick={() => {
                            //         setActiveShop(shop);
                            // }}
                            />
                        ):(null)
                        
                    ))};

                    {/* {activeShop && (
                        <Popup
                        position={[
                            0,0
                        ]}
                        onClose={() => {
                            setActiveShop(null);
                        }}
                        >
                        <div>
                            <h2>{activeShop.tags.name}</h2>
                            <p>{activeShop.tags.opening_hours}</p>
                            <p>{activeShop.lat}</p>
                            <p>{activeShop.lon}</p>
                        </div>
                        </Popup>
                    )} */}
                </MapContainer>
            </div>
        </div>
    )
}

export default ShortTermMap