import React from "react";
import { DigitalClock, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack, Typography } from "@mui/material";
import dayjs from 'dayjs';

function DigitalTimePicker(props){
    const minTime = props.minTime;
    
    function shouldDisableTime(value, view){
        if(view==="hours"){
            let control = false;
            props.disabledTimes.map(item => {
                if(value.hour()===item){
                    control = true;
                    return;
                }
            })
            return control;
        }
    }
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Stack>
                <Typography fontWeight={"400"} color={"GrayText"} fontSize={16} variant="h5" className="digitalClockText" >
                    Horários disponíveis
                </Typography>
                <DigitalClock sx={{width:"40%"}} className="digitalClock"
                    minTime={dayjs().set('hour', minTime).startOf('hour')} maxTime={dayjs().set('hour', 19).startOf('hour')}
                    ampm={false} 
                    skipDisabled
                    value={props.value}
                    timeStep={60}
                    shouldDisableTime={shouldDisableTime}
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