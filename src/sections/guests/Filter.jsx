import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const FilterRadio = ({ onChange }) => {
    const handleRadioChange = event => {
        onChange(event.target.value);
    };

    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
                Estado
            </FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleRadioChange}
                defaultValue=""
            >
                <FormControlLabel value="" control={<Radio />} label="Todos" />
                <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Confirmado"
                />
                <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Rechazado"
                />
                <FormControlLabel
                    value="null"
                    control={<Radio />}
                    label="Por Confirmar"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default FilterRadio;
