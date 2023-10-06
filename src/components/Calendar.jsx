import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Badge, Stack, Typography } from "@mui/material";
import dayjs from 'dayjs';

function Calendar(props){
    const initialValue = dayjs(dayjs().format('YYYY-MM-DD'));
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [firstRender, setFirstRender] = useState(false);

    let agendamentos = props.agendamentos;
    agendamentos = agendamentos.map(item => {
      if(item.status === 'agendado'){
        return item
      }
    })
    
    useEffect(() => {
        setFirstRender(true)
        fetchHighlightedDays(initialValue);
    }, []);
    useEffect(() =>{
      fetchHighlightedDays(initialValue);
    }, [firstRender])

    let agendamentosDoMes = [];
    
    function fakeFetch(date) {
        
        agendamentosDoMes = agendamentos.map(item => {
          if(dayjs(item.data).month() === date.month()){
            return item.data;
          }
        }).filter(item => item!==undefined)
        
        let diasLotados = [];

        for(let i = 0; i < agendamentosDoMes.length; i++){
          let count = 1;
          for(let j = 0; j < agendamentosDoMes.length; j++){
            if(j !== i){
              if(dayjs(agendamentosDoMes[i]).date() === dayjs(agendamentosDoMes[j]).date()){
                count++;
              }
            }
          }
          if(count===11){
            if(!diasLotados.includes(dayjs(agendamentosDoMes[i]).date())){
              diasLotados.push(dayjs(agendamentosDoMes[i]).date());
            }
          }
        }
        return new Promise((resolve, reject) => {

          setTimeout(() => {
            const daysToHighlight = diasLotados;
      
            resolve({ daysToHighlight });
          }, 500);
      
        });
    }
    
    function ServerDay(props) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

        const isSelected =
          !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
      
        return (
          <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? <i style={{color:"#990000", fontSize:14}} class="fa-solid fa-x"></i> : undefined}
          >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
          </Badge>
        );
      }

    async function fetchHighlightedDays (date){
        await fakeFetch(date).then(({ daysToHighlight }) => {
            setHighlightedDays(daysToHighlight);
            setIsLoading(false);
        })
    };

    async function handleMonthChange (date){
        setIsLoading(true);
        setHighlightedDays([]);
        fetchHighlightedDays(date);
    };

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Stack>
                <DateCalendar
                    loading={isLoading}
                    onMonthChange={handleMonthChange}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDays,
                        },
                    }}
                    disablePast
                    onChange={(value, selectionState)=>{
                      props.setDateObject(dayjs(value))
                      props.setSelectedDay(dayjs(value).format('MM/DD/YYYY'));
                    }}
                />
                <Typography fontWeight={"400"} color={"GrayText"} fontSize={16} variant="h5" className="m-auto">
                    <i style={{color:"#990000", fontSize:18}} class="fa-solid fa-x"></i> Dias indisponíveis
                </Typography>
            </Stack>
        </LocalizationProvider>
    )
}

export default Calendar;