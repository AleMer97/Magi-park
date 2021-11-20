import React, {useState, Component} from "react";
import Slider from '@mui/material/Slider';
import { render } from "react-dom";

export default function CarLengthSlider({setCarLength}) {
    const marks = [
        {
          value: 3,
          label: '3m',
        },
        {
          value: 4,
          label: '4m',
        },
        {
            value: 5,
            label: '5m',
        },
        {
            value: 6,
            label: '6m',
        },
        {
            value: 7,
            label: '7m',
        },
        {
            value: 8,
            label: '8m',
        },
        {
            value: 9,
            label: '9m',
        },
        {
            value: 10,
            label: '10m',
        },

      ];

    return(
        // Set car length
        <Slider
            aria-label="Length"
            defaultValue={6}
            getAriaValueText={setCarLength}
            step={0.5}
            marks={marks}
            min={3}
            max={10}
            valueLabelDisplay="off"
            
        />
    )
}
