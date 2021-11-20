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




function ShortTermMap () {

    const longitude = 11.5318421
    const latitude = 48.1123884

    const [location, setLocation] = useState([latitude, longitude]);

    const zoom = 16;

    const exroute = exampleRoute.legDTOs.map(leg => leg.nodes.map(node => [node.longitude, node.latitude]))

    const deliveryZone = [[48.152329, 11.582429],
                        [48.152329, 11.59],
                        [48.136, 11.594],
                [48.13, 11.582429]]
    
    // useEffect(())

    const [emptySpots, setEmptySpots] = useState([]);
    useEffect(() => {
        axios.get('getParkingSpot?lat=47.7&lon=11.5&radius=200&length=3.0')
        .then((res) => {
            console.log(res.data);
            setEmptySpots(res.data);
        }).catch(err => {
            console.log(err)
        });
        }, []);

    return(
        <div class="h-full w-full">
            <p class="h-auto">Shortterm Map</p>
            
            <div class="h-full">
                <MapContainer 
                    center={location} 
                    zoom={zoom}
                    
                    style={{ height: '460px', width: '100%' }}
                >
                    <GetBounds/>
                    <TileLayer
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}"
                        attribution='<a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>'
                        subdomains= 'abcd'
                        minZoom= {10}
                        maxZoom= {18}
                        ext= 'png'
                    />

                    <Polygon 
                        positions={deliveryZone}
                    />
                    
                    <Marker position={location}/>

                    <Polyline positions={exroute}/>
                    {/* {coffee.elements.map(shop => (
                        <Marker
                            key={shop.id}
                            position={[
                                0,0
                            ]}
                            onClick={() => {
                                setActiveShop(shop);
                        }}
                        />
                    ))}

                    {activeShop && (
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