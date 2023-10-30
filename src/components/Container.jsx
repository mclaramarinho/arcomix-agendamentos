import React from "react";
import SolicitacaoCard from "./SolicitacaoCard";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import dayjs from "dayjs";

function Container(props){
    const tipoContainer = props.tipoContainer;
    const isEmpty = props.isEmpty;
    const handleCardClick = props.handleCardClick;
    const lista = props.lista;
    const handleFiltro = props.handleFiltro;
    const filtro = props.filtro;
    const title = tipoContainer === "solicitacoes" ? "SOLICITAÇÕES DE AGENDAMENTO" : tipoContainer === "agendamentos" ? "ENTREGAS PENDENTES" : "ENTREGAS FINALIZADAS";

    function contentToDisplay(){
        if(isEmpty===true){
            return(
                <div className="row h-25 p-0 text-center mt-5 mb-5 gutter-x-0">
                    <h2 className="bold">Não há {tipoContainer==="solicitacoes" ? "solicitações" : tipoContainer === "agendamentos" ? "agendamentos" : "entregas finalizadas"} no momento.</h2>
                    <i class="fa-solid fa-inbox" style={{fontSize: "15vh", marginBottom: "5vh", color: "#A09F9F"}}></i>
                </div>
            )
        }else{
            if(lista !== undefined && lista.length >  0){
                
                if(tipoContainer === "solicitacoes"){
                    return lista.map(item => {
                        if(item !== undefined){
                            return (
                                <SolicitacaoCard
                                    key={item.id_agendamento}
                                    tipoCard="solicitacao"
                                    empresa={item.id_fornecedor} 
                                    idAgendamento={item.id_agendamento} 
                                    dataAgendamento={dayjs(item.data).format("DD/MM/YYYY")} 
                                    horaAgendamento={dayjs(item.data).format("HH:mm")} 
                                    tipoCarga={item.tipo_carga} 
                                    tipoDescarga={item.tipo_descarga} 
                                    recorrencia={item.recorrencia}
                                    handleCardClick={handleCardClick}
                                />
                            )}
                    })
                }else if(tipoContainer === "agendamentos"){
                    return lista.map(item => {
                        if(item !== undefined){
                            return (
                                <SolicitacaoCard
                                    key={item.id_agendamento}
                                    tipoCard="agendamento"
                                    empresa={item.id_fornecedor} 
                                    idAgendamento={item.id_agendamento} 
                                    dataAgendamento={dayjs(item.data).format("DD/MM/YYYY")} 
                                    horaAgendamento={dayjs(item.data).format("HH:mm")} 
                                    tipoCarga={item.tipo_carga} 
                                    tipoDescarga={item.tipo_descarga} 
                                    recorrencia={item.recorrencia}
                                    handleCardClick={handleCardClick}
                                />
                            )}
                            
                    })
                }else if(tipoContainer === "finalizados"){
                    return lista.map(item => {
                        if(item !== undefined){
                            return (
                                <SolicitacaoCard
                                    key={item.id_agendamento}
                                    tipoCard="finalizado"
                                    empresa={item.id_fornecedor} 
                                    idAgendamento={item.id_agendamento} 
                                    status = {item.status}
                                    isEntregue = {item.isEntregue}
                                    dataAgendamento={dayjs(item.data).format("DD/MM/YYYY")} 
                                    horaAgendamento={dayjs(item.data).format("HH:mm")} 
                                    tipoCarga={item.tipo_carga} 
                                    tipoDescarga={item.tipo_descarga} 
                                    recorrencia={item.recorrencia}
                                />
                            )}
                            
                    })
                }
            }
        }
    }
    


    return (
        <div className='container lista-container large-container-shadow overflow-y-scroll hide-scrollbar position-relative m-auto' >
            <div className="row h-25 p-0 text-center mt-5 mb-5 ">
                <h2 className="bolder">{title}</h2>
                <hr className="w-50 m-auto" />
            </div>
            <div className="row h-25 text-center mb-5">
                <Paper className="m-auto" component="form" sx={{ borderRadius:"100vh",  p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%" }}>
                    
                    <InputBase
                        sx={{ ml: 1, flex: 1}}
                        placeholder="Nome da empresa..."
                        value={filtro}
                        onChange={(e) => handleFiltro(e)}
                        className={'font-13'}
                    />
                    <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    
                </Paper>
            </div>
            <div className="row h-25 solicitacoes-container m-auto">
                {contentToDisplay()}
            </div>
         </div>
    )
}

export default Container;