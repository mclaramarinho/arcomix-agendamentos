import React, { useEffect, useState } from "react";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import SolicitacaoCard from "./SolicitacaoCard";

function SolicitacoesLista(){
    const [filtro, setFiltro] = useState("");
    function handleFiltro(e){
        return setFiltro(e.target.value)
    }
    let [localSolicitacoes, setLocalSolicitacoes] = useState([]);
    
    useEffect(()=>{
        
        (localStorage.getItem("solicitacoes", JSON.stringify(localSolicitacoes)));
    }, [localSolicitacoes])


    function handleCardClick(e){
        const value = e.target.value;
        const id = e.target.getAttribute("id");
        if(value==="accept"){
            setLocalSolicitacoes(prev => {
                return [...prev.filter(item => item.idSolicitacao !== id)]
            })
        }else{
            setLocalSolicitacoes(prev => {
                return [...prev.map(item => {
                    item.idSolicitacao === id && (
                        item.status="rejeitada"
                    )
                })]
            })
        }
    }
    //i need another array to show only the pending requests
    function showLista(localSolicitacoes){
        if(localSolicitacoes.length > 1){
            return localSolicitacoes.map((item) => {
                return (
                    <SolicitacaoCard 
                        key={item.idSolicitacao}
                        empresa={item.id_fornecedor} 
                        idAgendamento={item.idSolicitacao} 
                        dataAgendamento={item.data} 
                        horaAgendamento={item.hora} 
                        tipoCarga={item.tipo_carga} 
                        tipoDescarga={item.tipo_descarga} 
                        recorrencia={item.recorrencia}
                        handleCardClick={handleCardClick}
                    />
                )
            })
        }else{
            return(
                    <div className="row text-center mt-5">
                        <h2 className="subheader">Não há solicitações no momento.</h2>
                        <i class="fa-solid fa-inbox" style={{fontSize: "15vh", marginBottom: "5vh", color: "#A09F9F"}}></i>
                    </div>
            );
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