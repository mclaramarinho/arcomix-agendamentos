import React, { useEffect, useState } from "react";
import { getAgendamentosLS } from "../utils/agendamentosLS";
import Container from "./Container";
import dayjs from "dayjs";
import { getList } from "../utils/listContent";

function AgendamentosLista(props){
    //controls the value of what's typed in the filter field
    const [filtro, setFiltro] = useState("");
    function handleFiltro(e){
        return setFiltro(e.target.value)
    }

    
    //array to store only the confirmed agendamentos
    const [localAgendamentos, setLocalAgendamentos] = useState([]);
  

    //runs everytime the page is loaded
    useEffect(() => {
        getList('agendamentos').then((value) => setLocalAgendamentos(value))
    }, [])


    function showLista(){ 
        let control=false;;
        if(localAgendamentos === undefined || localAgendamentos.length === 0 ){
            control = true;
        }else{
            control = false
        }
        return control;
    }
    const periodo = ['Todos', 'Hoje', 'Essa Semana', 'Esse Mês']
   
   
    return <Container tipoContainer="agendamentos" isEmpty={showLista()} handleCardClick={props.handleDetails} filtro={filtro} handleFiltro={handleFiltro} lista={localAgendamentos} />
}

export default AgendamentosLista;