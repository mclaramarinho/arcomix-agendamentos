import React, { useEffect, useState } from "react";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import AgendamentoCard from "./AgendamentoCard";

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
        if(localStorage.getItem("agendamentos")!==null){ //if this local storage exists
            setAgendamentos(JSON.parse(localStorage.getItem("agendamentos"))) //agendamentos will receive the items of this storage
        }
    }, [])
    //every time agendamentos changes
    useEffect(()=>{
        let agend;
        if( agendamentos !== undefined && agendamentos !== null && agendamentos.length > 0 ){
            agend = agendamentos.map(item => {
                if(item.status !== "pendente" && item.status !== "recusado" && item.status !== "finalizado" && item !== undefined){
                    return item;
                }
            }) 
            setLocalAgendamentos(() => {
                return [agend.map(item=>{
                    if(item !== undefined){
                        return item
                    }
                })]
            }) 
            
        }
    }, [agendamentos]) 


   

    
    function showLista(localAgendamentos){ 
        if(localAgendamentos.length === 0 ){
            return (
            <div className="row text-center mt-5 m-auto gutter-x-0">
                <h2 className="bold">Não há agendamentos no momento.</h2>
                <i class="fa-solid fa-inbox" style={{fontSize: "15vh", marginBottom: "5vh", color: "#A09F9F"}}></i>
            </div>
            )
        }else{
            return localAgendamentos.map((item) => {
                return item.map(subitem => {
                    return subitem!==undefined && (
                        
                        <AgendamentoCard 
                            empresa={subitem.id_fornecedor}
                            idAgendamento={subitem.id_agendamento}
                            dataAgendamento={subitem.data}
                            horaAgendamento={subitem.hora}
                            tipoCarga={subitem.tipo_carga}
                            tipoDescarga={subitem.tipo_descarga}
                            recorrencia={subitem.recorrencia}
                            handleCardClick={props.handleDetails}
                        />
                    )
                })
                
            })
        }
    
        
    }

    return(
        
        <div className='container  agendamentos-container overflow-y-scroll position-relative m-auto hide-scrollbar mt-5 large-container-shadow' >
            <div className="row h-25  text-center mt-5 mb-5">
                <h2 className="bolder">TODOS OS AGENDAMENTOS</h2>
                <hr className="w-50 m-auto" />
            </div>
            <div className="row h-25 text-center mb-5">
                <Paper className="m-auto" component="form" sx={{ borderRadius:"100vh",  p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%" }}>
                    
                    <InputBase
                        sx={{ ml: 1, flex: 1}}
                        placeholder="Nome da empresa..."
                        value={filtro}
                        onChange={(e) => handleFiltro(e)}
                    />
                    <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>       
                    
                </Paper>
            </div>
            <div className="row h-25 mb-5">
                {/* ### FILTRO DE PERIODO + IMPRIMIR RELATORIO ### */}
            </div>

            <div className="row h-25 mt-5 solicitacoes-container">
                {showLista(localAgendamentos)}
                
            </div>
         </div>
    )
}

export default AgendamentosLista;