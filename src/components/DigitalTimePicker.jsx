import React from "react";
import { DigitalClock, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack, Typography } from "@mui/material";
import dayjs from 'dayjs';

function DigitalTimePicker(props){
    const minTime = props.minTime;
    const maxTime = props.maxTime;
    const selectedDay = props.selectedDay;
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Stack>
                <Typography fontWeight={"400"} color={"GrayText"} fontSize={16} variant="h5" className="digitalClockText" >
                    Horários disponíveis
                </Typography>
                <DigitalClock sx={{width:"40%"}} className="digitalClock"
                    minTime={dayjs(selectedDay+'T'+minTime)} maxTime={dayjs(selectedDay+'T'+maxTime)}
                    ampm={false} skipDisabled
                    value={props.value}
                    onChange={(value, selectionState)=>props.setValue(dayjs(value).format("HH:mm"))}
                />
            </Stack>
        </LocalizationProvider>
    )
}

export default DigitalTimePicker;