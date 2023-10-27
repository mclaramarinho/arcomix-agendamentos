import React, { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Badge, Stack, Typography } from "@mui/material";
import dayjs from 'dayjs';

function Calendar(props){
    const pickerType = props.pickerType;
    const initialValue = dayjs(dayjs().format('YYYY-MM-DD'));
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [firstRender, setFirstRender] = useState(false);
    const [dinamicDays, setDinamicDays] = useState()
    const [value, setValue] = useState();
  

    let agendamentos = props.agendamentos;
    agendamentos = agendamentos.map(item => {
      if(item.status === 'agendado'){
        return item
      }
    }).filter(item => item!==undefined)
  
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
            setDinamicDays(daysToHighlight)
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
    function shouldDisableDate(date, view){
      const currentDate = date.date();
      const dayOfWeek = date.day();
      let control = false;
      //disables if the day is on the weekend
      if(dayOfWeek===0 || dayOfWeek === 6){
        control = true;
        return control;
      }else{ //if not, checks if the day is already full and unavailable
        dinamicDays.map(item =>{
          if(item === currentDate){
            control=true;
            return;
          }
        })
        return control
      }
    }

    function disableWeekendsOnly(date, view){
      const dayOfWeek = date.day();
      let control = false;
      if(dayOfWeek===0 || dayOfWeek===6){
        control = true;
      }
      return control;
    }

    if(pickerType === "standard"){
      return(
          <LocalizationProvider dateAdapter={AdapterDayjs} >
              <Stack>
                  <DateCalendar
                      loading={isLoading}
                      shouldDisableDate={(agendamentos !== undefined && agendamentos.length > 0 && dinamicDays !== undefined && dinamicDays.length > 0 &&  dinamicDays !== null) ? shouldDisableDate : disableWeekendsOnly}
                      onMonthChange={handleMonthChange}
                      renderLoading={() => <DayCalendarSkeleton />}
                      slots={{
                          day: ServerDay,
                      }}
                      disablePast
                      slotProps={{
                          day: {
                              highlightedDays,
                          },
                      }}
                      onChange={(value, selectionState)=>{
                        
                        props.setDateObject(dayjs(value))
                        props.setSelectedDay(dayjs(value).format('MM/DD/YYYY'));
                      }}
                      sx={{width: 'fit-content', margin:'0 auto'}}
                  />
                  <Typography fontWeight={"400"} color={"GrayText"} fontSize={16} variant="h5" className="m-auto">
                      <i style={{color:"#990000", fontSize:18}} class="fa-solid fa-x"></i> Dias indisponíveis
                  </Typography>
              </Stack>
          </LocalizationProvider>
      )
    }else{
      return(
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                shouldDisableDate={(agendamentos !== undefined && agendamentos.length > 0 && dinamicDays !== undefined && dinamicDays.length > 0 &&  dinamicDays !== null) ? shouldDisableDate : disableWeekendsOnly}
                slots={{
                    day: ServerDay,
                }}
                slotProps={
                  {
                    day: { highlightedDays },
                    textField: { disabled: true, size: "small", placeholder: props.placeholder !== "none" ? dayjs(props.initialValue).format("DD/MM/YYYY") : "DD/MM/YYYY"} 
                  }
                }
                value={props.clear===true ? "" : value}
                
                disableFuture = {props.disableFuture === undefined ? false : props.disableFuture}
                disablePast={props.disablePast === undefined ? true : props.disablePast}
                format="DD/MM/YYYY"
                onChange={(value, context) => {
                  props.setDateObject(dayjs(value))
                  setValue(value)
                  props.setClear !== undefined && props.setClear !== null && props.setClear(false)
                }}
                
                className="row"
              />
          </LocalizationProvider>
      )
    }
}

export default Calendar;