import React, { useEffect, useState } from "react";
import { DigitalClock, LocalizationProvider, TimeIcon, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MenuItem, Stack, Typography } from "@mui/material";
import dayjs from 'dayjs';

function DigitalTimePicker(props){
    const [timePickerItems, setTimePickerItems] = useState([]);
    
    useEffect(() => {
       setTimePickerItems([document.getElementsByClassName('MuiDigitalClock-item')].map(item => item))
    }, [])
    
    function shouldDisableTime(value, view){
        let control = false;
        const items = timePickerItems[0]
        if(items !== undefined){
            const currentElement = items[value.hour()];
            currentElement.classList.contains("disabled-time") &&  currentElement.classList.remove("disabled-time") 
            if(props.disabledTimes !== undefined && props.disabledTimes.length > 0){
                if((value.hour()<9 || value.hour() > 19)){
                    currentElement.classList.add("hide")
                }else if((value.hour()>=9 && value.hour() <= 19)){
                    props.disabledTimes.map(item => {
                        if(value.hour()===item){
                            currentElement.classList.add('disabled-time')
                            return;
                        }
                    })
                }
            }else{
                if((value.hour()<9 || value.hour() > 19)){
                    currentElement.classList.add("hide")
                }
            }
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