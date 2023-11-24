  import React, { useEffect } from "react";
  import { Badge, Stack, Typography } from "@mui/material";
  import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
  import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
  import { PickersDay } from "@mui/x-date-pickers/PickersDay";
  import { LocalizationProvider } from "@mui/x-date-pickers";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import dayjs from "dayjs";
  import { useState } from "react";
  function CalendarView(props) {
    let agendamentos = props.lista;
    agendamentos = agendamentos.filter((item) => item.status === "agendado");
    const initialValue = dayjs(dayjs().format("YYYY-MM-DD"));

    const [isLoading, setIsLoading] = useState(true);
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      fakeFetch(initialValue).then((response) => {
        setHighlightedDays(response.daysToHighlight);
        setIsLoading(false);
      });
    }, []);

    let agendamentosDoMes = [];

    function fakeFetch(date) {
      agendamentosDoMes = agendamentos
        .map((item) => {
          if (dayjs(item.data).month() === date.month()) {
            return item.data;
          }
        })
        .filter((item) => item !== undefined);

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const daysToHighlight = agendamentosDoMes.map((item) =>
            dayjs(item).date()
          );
          setHighlightedDays(daysToHighlight);
          resolve({ daysToHighlight });
        }, 500);
      });
    }

    function handleMonthChange(date) {
      setIsLoading(true);
      setHighlightedDays([]);
      fakeFetch(date).then((response) => {
        setIsLoading(false);
      });
    }

    function ServerDay(props) {
      const { day, outsideCurrentMonth, ...other } = props;

      const isSelected =
        !props.outsideCurrentMonth &&
        highlightedDays.indexOf(props.day.date()) >= 0;

      return (
        <Badge
          key={props.day.toString()}
          overlap="circular"
          badgeContent={
            isSelected ? (
              <i
                style={{ color: "#8AD3ED", fontSize: 14}}
                class="fa-solid fa-circle"
              ></i>
            ) : undefined
          }
        >
          <PickersDay
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
          />
        </Badge>
      );
    }

    function disabledDays(date, view) {
      const dayOfWeek = date.day();
      return dayOfWeek === 0 || dayOfWeek === 6 ? true : false;
    }

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          className="h-100"
          value={value}
          loading={isLoading}
          renderLoading={() => <DayCalendarSkeleton />}
          onMonthChange={handleMonthChange}
          slots={{ day: ServerDay }}
          shouldDisableDate={disabledDays}
          onChange={(newValue) => {
            props.setDate(newValue);
            setValue(newValue);
          }}
          sx={{
            margin: "0 !important",
            width: "100% !important",
            position: "relative !important",
            "& .MuiPickersDay-root": {
              position: "relative !important",
              maxWidth: "12vw !important",
            },
            "& .MuiDayCalendar-weekContainer, .MuiDayCalendar-header": {
              width: "100% !important",
              boxSizing: "border-box !important",
              justifyContent: "space-evenly !important",
            },
            
          }}      
        />
      </LocalizationProvider>
    );
  }

  export default CalendarView;
