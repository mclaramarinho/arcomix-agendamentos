import React, { useState } from "react";
import Container from "./Container";

function AgendamentosLista(props){
   
    const localAgendamentos = props.lista;

    function showLista(){ 
        let control=false;
        if(localAgendamentos === undefined || localAgendamentos.length === 0 ){
            control = true;
        }else{
            control = false
        }
        return control;
    }
   
   
    return <Container tipoContainer="agendamentos"
                dateFilterValue={props.dateFilterValue} setDateFilterValue={props.setDateFilterValue} handleDateFilter={props.handleDateFilter}
                isEmpty={showLista()} handleCardClick={props.handleDetails} filtro={props.filtro} handleFiltro={props.handleFiltro} lista={localAgendamentos}
            />
}

export default AgendamentosLista;