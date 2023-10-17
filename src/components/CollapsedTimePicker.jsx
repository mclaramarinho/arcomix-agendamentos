import React, { useEffect, useState } from "react";
import { DigitalClock, LocalizationProvider, TimeIcon, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MenuItem, Stack, Typography } from "@mui/material";
import dayjs from 'dayjs';

function CollapsedTimePicker(props){
    const [timePickerItems, setTimePickerItems] = useState([]);
    const [open, setOpen] = useState()
    const [pickerValue, setPickerValue] = useState(dayjs(props.initialValue).format('HH:mm'));
    useEffect(() => {
        (props.pickerType !== "standard" && open) ? setTimePickerItems([document.getElementsByClassName('MuiMenuItem-root')]) : setTimePickerItems([])
    }, [])
    useEffect(() => {
        props.pickerType !== 'standard' && open === true ? setTimePickerItems([document.getElementsByClassName('MuiMenuItem-root')]): setTimePickerItems([])
    }, [open])
    
    
    function shouldDisableTime(value, view){
        props.disabledTimes.map(item => {
            if(dayjs(pickerValue).hour() === item){
                setPickerValue('')
                return
            }
        })
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

    
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    skipDisabled
                    ampm={false}
                    closeOnSelect

                    format="HH:mm"
                    views={["hours"]}
                    minutesStep={60}
                    
                    onOpen={() => setOpen(true)}
                    onClose={() => {setOpen(false)}}
                    shouldDisableTime={shouldDisableTime}
                    onChange={(value) => {
                        props.setDateObject(dayjs(props.dateObject).set('h', value.$H))
                    }}
                    
                    slotProps={
                        { textField: { disabled: true, size: 'small', placeholder: dayjs(props.initialValue).format("HH:mm")} }
                    }
                />
            </LocalizationProvider>
        )
    
}

export default CollapsedTimePicker;