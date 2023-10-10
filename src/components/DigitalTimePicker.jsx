import React from "react";
import { DigitalClock, LocalizationProvider, TimeIcon } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MenuItem, Stack, Typography } from "@mui/material";
import dayjs from 'dayjs';

function DigitalTimePicker(props){
    const minTime = props.minTime;

    function shouldDisableTime(value, view){
        let control = false;
        const currentElement = (document.getElementsByClassName('MuiDigitalClock-item')[value.hour()])
        
        if(value.hour()<9 || value.hour() > 19){
            currentElement.classList.add('hide')
            control = true;
        }else{
            props.disabledTimes.map(item => {
                if(value.hour()===item){
                    currentElement.classList.add('disabled-time')
                    return;
                }
            })
        }
        return control;
    }
    function workingHoursOnly(value, view){
        let control = false;
        if(value.hour()<9 || value.hour() > 19){
            control = true;
        }
        return control;

    }

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Stack>
                <Typography fontWeight={"400"} color={"GrayText"} fontSize={16} variant="h5" className="digitalClockText" >
                    Horários disponíveis
                </Typography>
                <DigitalClock sx={{width:"40%"}} className="digitalClock"
                    ampm={false} 
                    value={props.value}
                    timeStep={60}
                    shouldDisableTime={(props.disabledTimes !== undefined && props.disabledTimes.length > 0) ? shouldDisableTime : workingHoursOnly}
                    onChange={async (value, selectionState)=>{
                        props.setValue(dayjs(value).format("HH:mm"));
                        await props.setDateHour(value.$H, value.$m)
                    }}
                />
            </Stack>
        </LocalizationProvider>
    )
}

export default DigitalTimePicker;