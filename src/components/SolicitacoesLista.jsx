import React, { useEffect, useState } from "react";
import {getAgendamentosLS, setAgendamentosLS, updateAgendamentosLS} from '../utils/agendamentosLS'
import Container from "./Container";
import { getList } from "../utils/listContent";
import { textFilter } from "../utils/textFilter";
import { generateReport } from "../utils/generateReport";

function SolicitacoesLista(){
    const [filtro, setFiltro] = useState("");
    
    //array to store the query' result
    const [resultado, setResultado] = useState([])

    //array to store only the requests
    const [localSolicitacoes, setLocalSolicitacoes] = useState([]);

    //array to store all the appointments
    const [agendamentos, setAgendamentos]=  useState([]);

    //runs everytime the page is loaded
    useEffect(() => {
        updateAgendamentosLS()
        setAgendamentos(getAgendamentosLS() || [])
        getList("solicitacoes").then((value) => {
            setLocalSolicitacoes(value)
        })
    }, [])

    //everytime localSolicitacoes changes
    useEffect(() => {
        setResultado(localSolicitacoes)
    }, [localSolicitacoes])
    
    // ### NEEDS TO SHOW CONFIRMATION MSG ###
    function handleCardClick(e){
        const value = e.target.value;
        const id = e.target.getAttribute('id');

        if(value==="accept"){
            agendamentos.map(item => {
                if(item.id_agendamento === id){
                    item.status="agendado"
                }
            })
            
        }else{
            agendamentos.map(item => {
                if(item.id_agendamento === id){
                    item.status="recusado"
                }
            })
        }
        setAgendamentosLS(agendamentos)
        getList("solicitacoes").then((value) => {
            setLocalSolicitacoes(value)
        })
       

    }
    
    function showLista(){ 
        let control;
        //checks if the localSolicitacoes array contains only undefined items
        if(localSolicitacoes.length===0){
            control = true;
        }
        localSolicitacoes.map(item =>{
                if(item === undefined){
                    return control = true;
                }else{
                    return control = false;
                }
        })
        return control;
    }

    return <Container tipoContainer={'solicitacoes'} handleCardClick={handleCardClick}
                lista={resultado} handleFiltro={(e) => textFilter(e.target.value, setFiltro, setResultado, localSolicitacoes)} 
                filtro={filtro} isEmpty={showLista()}
                generateReport={()=>generateReport(resultado, "solicitacoes")}
            />
}

export default SolicitacoesLista;