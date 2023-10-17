import React, { useEffect, useState } from "react";
import { getAgendamentosLS } from "../utils/agendamentosLS";
import Container from "./Container";
import dayjs from "dayjs";

function AgendamentosLista(props){
    //controls the value of what's typed in the filter field
    const [filtro, setFiltro] = useState("");
    function handleFiltro(e){
        return setFiltro(e.target.value)
    }
    //array to store all the appointments
    const [agendamentos, setAgendamentos]=  useState([]);
    
    //array to store only the confirmed agendamentos
    const [localAgendamentos, setLocalAgendamentos] = useState([]);
  

    //runs everytime the page is loaded
    useEffect(() => {
        if(getAgendamentosLS()!==null){ //if this local storage exists
            const today = dayjs();

            const agend = getAgendamentosLS().map(item => {
                const itemDate = dayjs(item.data);
                if(itemDate.year() === today.year()){
                    if(itemDate.month() > today.month()){
                        return item
                    }else if(itemDate.month() === today.month()){
                        if(itemDate.date() >= today.date()){
                            return item
                        }
                    }
                }else if(itemDate.year() > today.year()){
                    return item
                }
            }).filter(item => item !== undefined && item.status === 'agendado' && item.isEntregue===false)
            console.log(agend)
            if(agend !== undefined && agend.length > 0){
                setLocalAgendamentos(agend)
            }

        }
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