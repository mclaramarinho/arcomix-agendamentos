import React from "react";

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
                        <button value="accept" id={props.idAgendamento} onMouseUp={(e) => props.handleCardClick(e)} className="btn solic-btn bold green-bg w-100 mt-2">Aceitar</button>
                        <button value="reject" id={props.idAgendamento} onMouseUp={(e) => props.handleCardClick(e)} className="btn solic-btn bold red-bg w-100">Recusar</button>
                    </div>
                </div>
            </div>
    )
}

export default SolicitacaoCard;