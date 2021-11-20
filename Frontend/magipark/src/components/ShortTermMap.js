import React from "react";
import { MapContainer, Marker, Popup, TileLayer, Polygon, Polyline } from "react-leaflet";


import exampleRoute from "../data/ExampleRouteDTO.json"

const LongTermMap = () => {

    const longitude = 11.5748
    const latitude = 48.1373

    const user_location = [latitude, longitude];

    const zoom = 12.5;

    const exroute = exampleRoute.legDTOs.map(leg => leg.nodes.map(node => [node.longitude, node.latitude]))

    const deliveryZone = [[48.152329, 11.582429],
                        [48.152329, 11.59],
                        [48.136, 11.594],
                [48.13, 11.582429]]

    return(
        <div class="w-full h-1/2">
            <p>Shortterm Map</p>
            <MapContainer 
                center={user_location} 
                zoom={zoom}
                style={{ height: '50vh', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                <Polygon 
                    positions={deliveryZone}
                />
                
                <Marker position={user_location}/>

                {/* <Polyline positions={exroute}/> */}
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
    )
}

export default LongTermMap