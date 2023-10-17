import React, { useEffect, useState } from "react";
import {getAgendamentosLS, setAgendamentosLS} from '../utils/agendamentosLS'
import Container from "./Container";

function SolicitacoesLista(){
    const [filtro, setFiltro] = useState("");

    //array to store only the requests
    const [localSolicitacoes, setLocalSolicitacoes] = useState([]);

    //array to store all the appointments
    const [agendamentos, setAgendamentos]=  useState([]);

    //runs everytime the page is loaded
    useEffect(() => {
        if(getAgendamentosLS()!==null){ //if this local storage exists
            setAgendamentos(getAgendamentosLS()) //agendamentos will receive the items of this storage
            
        }else{
            setAgendamentosLS([])
        }
        
    }, [])

    //every time agendamentos changes
    useEffect(()=>{
        let solicit;
        if( agendamentos !== undefined && agendamentos !== null && agendamentos.length > 0 ){
            solicit = agendamentos.map(item => {
                if(item.status === "pendente"){
                    return item
                }
            }) 
            setLocalSolicitacoes(() => {
                return [solicit.map(item=>{
                    if(item !== undefined){
                        return item
                    }
                })]
            }) 
            
        }
    }, [agendamentos]) 


    // ### NEEDS TO SHOW CONFIRMATION MSG ###
    function handleCardClick(e){
        const value = e.target.value;
        const id = e.target.getAttribute('id');

        if(value==="accept"){
            agendamentos.map(item => {
                if(item.id_agendamento === id){
                    item.status="aceito"
                }
            })
            
        }else{
            agendamentos.map(item => {
                if(item.id_agendamento === id){
                    item.status="recusado"
                }
            })
        }

        setLocalSolicitacoes(localSolicitacoes.filter(item => {
            if(item!==undefined){
                return item
            }
        }))
        setAgendamentosLS(agendamentos)

    }
    function handleFiltro(e){
        return setFiltro(e.target.value)
    }
    function showLista(){ 
        let control;
        //checks if the localSolicitacoes array contains only undefined items
        if(localSolicitacoes.length===0){
            control = true;
        }
        localSolicitacoes.map(item =>{
            return item.map(subItem => {
                if(subItem === undefined){
                    return control = true;
                }else{
                    return control = false;
                }
            })
        })
        return control;
    }

    return <Container tipoContainer={'solicitacoes'} handleCardClick={handleCardClick} lista={localSolicitacoes} handleFiltro={handleFiltro} filtro={filtro} isEmpty={showLista()} />
}

export default SolicitacoesLista;