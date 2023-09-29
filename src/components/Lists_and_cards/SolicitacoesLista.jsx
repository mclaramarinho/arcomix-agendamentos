import React, { useEffect, useState } from "react";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import SolicitacaoCard from "./SolicitacaoCard";

function SolicitacoesLista(){
    //controls the value of what's typed in the filter field
    const [filtro, setFiltro] = useState("");
    function handleFiltro(e){
        return setFiltro(e.target.value)
    }

    //array to store only the requests
    const [localSolicitacoes, setLocalSolicitacoes] = useState([]);

    //array to store all the appointments
    const [agendamentos, setAgendamentos]=  useState([]);


    //runs everytime the page is loaded
    useEffect(() => {
        if(localStorage.getItem("agendamentos")!==null){ //if this local storage exists
            setAgendamentos(JSON.parse(localStorage.getItem("agendamentos"))) //agendamentos will receive the items of this storage
            
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

    //every time locaSolicitacoes changes
    useEffect(() =>{
    }, [localSolicitacoes])



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
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos))
    }


    function showLista(localSolicitacoes){ 
        let control;
        //checks if the localSolicitacoes array contains only undefined items
        localSolicitacoes.map(item =>{
            if(item === undefined){
                return control = true;
            }else{
                return control = false;
            }
        })


        if((localSolicitacoes === undefined || localSolicitacoes.length === 0) || !control){
            return(
                <div className="row text-center mt-5">
                    <h2 className="subheader">Não há solicitações no momento.</h2>
                    <i class="fa-solid fa-inbox" style={{fontSize: "15vh", marginBottom: "5vh", color: "#A09F9F"}}></i>
                </div>
            )
        }else{
            return localSolicitacoes.map((item) => {
                return item.map(subItem => {
                    if(subItem !== undefined){
                        return (
                            <SolicitacaoCard 
                                key={subItem.id_agendamento}
                                empresa={subItem.id_fornecedor} 
                                idAgendamento={subItem.id_agendamento} 
                                dataAgendamento={subItem.data} 
                                horaAgendamento={subItem.hora} 
                                tipoCarga={subItem.tipo_carga} 
                                tipoDescarga={subItem.tipo_descarga} 
                                recorrencia={subItem.recorrencia}
                                handleCardClick={handleCardClick}
                            />
                        )}
                })
                
            })
        }
        
    }

    return(
        
        <div className='row lista-container position-relative m-auto' >
            <div className="col-12  text-center mt-5 ">
                <h2 className="header">SOLICITAÇÕES DE AGENDAMENTO</h2>
                <hr className="w-50 m-auto" />
            </div>
            <div className="col-12 text-center">
                <Paper className="m-auto mt-5" component="form" sx={{ borderRadius:"100vh",  p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%" }}>
                    
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
            <div className="col-12 solicitacoes-container">
                {showLista(localSolicitacoes)}
                
            </div>
         </div>
    )
}

export default SolicitacoesLista;