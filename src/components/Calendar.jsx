import React from "react";
import { DigitalClock, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Badge, Stack, Typography } from "@mui/material";
import dayjs from 'dayjs';

function Calendar(props){
    const initialValue = dayjs(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate());
    const requestAbortController = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = React.useState([]);
    let agendamentos = props.agendamentos;
    agendamentos = agendamentos.map(item => {
      if(item.status === 'agendado'){
        return item
      }
    })

    
    function fakeFetch(date, { signal }) {
      
        return new Promise((resolve, reject) => {

          const timeout = setTimeout(() => {
            const daysToHighlight = [1, 2, 3];
      
            resolve({ daysToHighlight });
          }, 500);
      
          signal.onabort = () => {
            clearTimeout(timeout);
            reject(new DOMException('aborted', 'AbortError'));
          };
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

    const fetchHighlightedDays = (date) => {
        const controller = new AbortController();
        fakeFetch(date, {
        signal: controller.signal,
        })
        .then(({ daysToHighlight }) => {
            setHighlightedDays(daysToHighlight);
            setIsLoading(false);
        })
        .catch((error) => {
            if (error.name !== 'AbortError') {
            throw error;
            }
        });

        requestAbortController.current = controller;
    };

    React.useEffect(() => {
        fetchHighlightedDays(initialValue);
        return () => requestAbortController.current?.abort();
    }, []);

    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
        requestAbortController.current.abort();
        }
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
                    onChange={(value, selectionState)=>{props.setSelectedDay(value.$y + "-" + (value.$M < 9 ? "0"+(value.$M+1) : value.$M+1) + "-" + value.$D)}}
                />
                <Typography fontWeight={"400"} color={"GrayText"} fontSize={16} variant="h5" className="m-auto">
                    <i style={{color:"#990000", fontSize:18}} class="fa-solid fa-x"></i> Dias indisponíveis
                </Typography>
            </Stack>
        </LocalizationProvider>
    )
}

export default Calendar;