import React from "react";
import ActionBtn from './ActionBtn'
function SolicitacaoCard(props){
    const tipoCard = props.tipoCard;
    return(
        <div className="row mt-5 mb-5 p-4 solicitacao-card m-auto thin-black-border border-box">
                <div className="row m-auto">
                    <h3 className=" bold">{props.empresa} - #{props.idAgendamento}</h3>
                </div>
                <div className="row m-auto">
                    <div className={tipoCard !== "finalizado" ? "col col-12 col-md-8 " : "col col-12 "}>
                        <h5><b>Data - </b>{props.dataAgendamento}</h5>
                        <h5><b>Hora - </b>{props.horaAgendamento}</h5>
                        {tipoCard === "finalizado" && (
                             <h5 className="w-100"><b>Status - </b>{props.status + (props.isEntregue === true ? " (entregue)" : " (não entregue)")}</h5>
                        )}
                        <h5><b>Tipo de carga - </b>{props.tipoCarga}</h5>
                        <h5><b>Descarga - </b>{props.tipoDescarga}</h5>
                        <h5><b>Recorrência - </b>{props.recorrencia}</h5>
                        
                    </div>
                    {tipoCard === "solicitacao" && (
                        <div className="col col-12 col-md-4 solic-btn-container ">
                            <ActionBtn value={"accept"} label={"Aceitar"} id={props.idAgendamento} 
                                handler={props.handleCardClick} bg={'green'}
                                addClass={"w-100 mt-2"}
                            />
                            <ActionBtn value={"reject"} label={"Recusar"} id={props.idAgendamento}
                                handler={props.handleCardClick} bg={'red'} 
                                addClass={"w-100 mt-2"}
                            />
                        </div>
                    )}
                    {tipoCard === "agendamento" && props.buttonName !== "Alterar" && (
                        <div className="col col-12 col-md-4 solic-btn-container  d-flex align-items-end">
                            <ActionBtn value={"details"} label={props.buttonName} id={props.idAgendamento} handler={props.handleCardClick} classes={"btn solic-btn w-100 bold pt-2 color-black thin-black-border"} /> 
                        </div>
                    )}
                </div>
            </div>
    )
}

export default SolicitacaoCard;