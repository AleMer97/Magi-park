import React, {useState} from "react";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function ChooseMapButton({showLongTerm, handleLongTerm}) {
    
    return(
        // Choose map
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={showLongTerm} onChange={handleLongTerm} name="longtermswitch" />
            }
            label="Show Long-term map"
            labelPlacement="start"
            sx={{display: 'flex',
                width: '75%',
                alignItems: 'center',
                }}
          />
        </FormGroup>
    )
}