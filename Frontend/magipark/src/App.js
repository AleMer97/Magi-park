import './index.css';
import React, {useState} from "react";

import CarLengthSlider from "./components/lengthSlider";
import ChooseMapButton from "./components/MapChooseButton";

import ShortTermMap from "./components/ShortTermMap";
import LongTermMap from './components/LongTermMap';

import { geolocated } from "react-geolocated";

function App() {
  const [carLength, setCarLength] = useState(6);

  const [showLongTerm, setShowLongTerm] = useState(false);
  const handleLongTerm = (event) => {
    setShowLongTerm(event.target.checked)
  }

  return (
    <div  class="grid place-items-center h-1/3">
      
        <h2>
          Magi-park
        </h2>
        <p>
          Find a parking spot. The easy way.
        </p>
        
        <CarLengthSlider setCarLength={setCarLength}/>
        <p>The length is: {carLength}</p>
        
        <ChooseMapButton showLongTerm={showLongTerm} handleLongTerm={handleLongTerm}/>
        <p>Which map: {showLongTerm?"Long term":"Short term"}</p>
      
        <p>{geolocated.isGeolocationAvailable}</p>
        

        {showLongTerm? <LongTermMap/> : <ShortTermMap/>}

        

    </div>
  );
}

export default App;
