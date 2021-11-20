import React, {useState, Component} from "react";
import Slider from '@mui/material/Slider';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff44ff',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

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
            sx={{display: 'flex',
                width: '75%',
                alignItems: 'center',
                marginLeft: '12.5%'}}
        />
    )
}
