import './index.css';
import React, {useState, useEffect} from "react";
import apiHandler from './utils/ApiHandler';

import CarLengthSlider from "./components/lengthSlider";
import ChooseMapButton from "./components/ChooseMapButton";

import ShortTermMap from "./components/ShortTermMap";
import LongTermMap from './components/LongTermMap';

// import GeoLocation from './utils/Geolocation';

import ScrollLock, { TouchScrollable } from 'react-scrolllock';
import axios from 'axios';


function App() {
  const AH = new apiHandler();

  const [carLength, setCarLength] = useState(6);

  const [showLongTerm, setShowLongTerm] = useState(false);
  const handleLongTerm = (event) => {
    setShowLongTerm(event.target.checked)
  }

  const longitude = 11.5318421
  const latitude = 48.1123884
  const [location, setLocation] = useState([latitude, longitude]);

  const [emptySpots, setEmptySpots] = useState([]);
    useEffect(() => {
        axios.get('getParkingSpot?lat='+location[0]+'&lon='+location[1]+'&radius=20&length='+carLength)
        .then((res) => {
            console.log(res.data);
            setEmptySpots(res.data);
        }).catch(err => {
          console.log(err.message)
      });
    }, [carLength]);

  return (
    <ScrollLock>
      <div  class="flex flex-col place-items-center min-h-screen ">
        
        <div class="flex-grow-0 top-0 w-full">
          <h2 class="bg-gray-800 text-white text-center font-bold text-2xl md:text-2xl py-4">
            MagiPark
            <p class="text-gray-300 font-normal text-base pb-2">
              Find a parking spot. The easy way.
            </p>
          </h2>
        </div>

        <div class="w-full md:w-1/2">
          <p class="pt-4 text-center font-semibold w-full">Set the length of your car:</p>
          <CarLengthSlider setCarLength={setCarLength} class="w-full"/>
          {/* <p>The length is: {carLength}</p> */}
          
          <ChooseMapButton showLongTerm={showLongTerm} handleLongTerm={handleLongTerm}/>
          {/* <p>Which map: {showLongTerm?"Long term":"Short term"}</p> */}
        
          {/* <p>{geolocated.isGeolocationAvailable}</p> */}
          {/* <GeoLocation/> */}
        </div>

        {console.log('time passed', Date())}

        <div class="flex-grow w-full">{showLongTerm? <LongTermMap/> : <ShortTermMap location={location} emptySpots={emptySpots} carLength={carLength}/>}</div>

        
        {/* {getParkingSpot(47.7,11.5,20,3.0)} */}
      </div>
    </ScrollLock>
  );
}

export default App;
