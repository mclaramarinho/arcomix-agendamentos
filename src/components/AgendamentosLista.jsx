import React from "react";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import { generateReport } from "../utils/generateReport";

function AgendamentosLista(props){
   
    const localAgendamentos = props.lista;
    const buttonName = props.buttonName || "Detalhes"
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
                buttonName={buttonName}
                dateFilterValue={props.dateFilterValue} setDateFilterValue={props.setDateFilterValue} handleDateFilter={props.handleDateFilter}
                isEmpty={showLista()} handleCardClick={props.handleDetails} filtro={props.filtro} handleFiltro={props.handleFiltro} lista={localAgendamentos}
                generateReport={()=>generateReport(localAgendamentos, "agendamentos")}
            />
}

export default AgendamentosLista;