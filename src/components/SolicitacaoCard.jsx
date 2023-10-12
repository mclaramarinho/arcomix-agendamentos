import React from "react";
import ActionBtn from './ActionBtn'
function SolicitacaoCard(props){
    
    return(
        <div className="row mt-5 mb-5 p-4 solicitacao-card m-auto ">
                <div className="row m-auto">
                    <h3 className="info-row bold">{props.empresa} - #{props.idAgendamento}</h3>
                </div>
                <div className="row m-auto">
                    <div className="col col-12 col-md-8 info-row">
                        <h5><b>Data - </b>{props.dataAgendamento}</h5>
                        <h5><b>Hora - </b>{props.horaAgendamento}</h5>
                        <h5><b>Tipo de carga - </b>{props.tipoCarga}</h5>
                        <h5><b>Descarga - </b>{props.tipoDescarga}</h5>
                        <h5><b>Recorrência - </b>{props.recorrencia}</h5>
                    </div>
                    <div className="col col-12 col-md-4 solic-btn-container info-row">
                        <ActionBtn value={"accept"} label={"Aceitar"} id={props.idAgendamento} handler={props.handleCardClick} color={'green'} classes={"btn solic-btn bold green-bg w-100 mt-2"}/>
                        <ActionBtn value={"reject"} label={"Recusar"} id={props.idAgendamento} handler={props.handleCardClick} color={'green'} classes={"btn solic-btn bold green-bg w-100"}/>
                    </div>
                </div>
            </div>
    )
}

export default SolicitacaoCard;