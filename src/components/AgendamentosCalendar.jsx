import React, { useState } from "react";
import CalendarView from "./CalendarView";
import dayjs from "dayjs";

function AgendamentosCalendar(props) {
  const setLista = props.setLista;
  const lista = props.lista;

  function handleDateChange(date) {
    let newLista = lista
      .map((item) => {
        if (
          dayjs(item.data).format("DD/MM/YYY") ===
          dayjs(date).format("DD/MM/YYY")
        ) {
          return item;
        }
      })
      .filter((item) => item !== undefined);
    return setLista(newLista);
  }

  return (
    <div className="position-absolute top-50 start-50 translate-middle w-100">
      <CalendarView lista={lista} setDate={handleDateChange} />
    </div>
  );
}

export default AgendamentosCalendar;
