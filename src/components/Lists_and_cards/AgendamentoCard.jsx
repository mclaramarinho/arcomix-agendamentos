import React from "react";

function AgendamentoCard(props){
    
    return(
        <div className="row mt-5 mb-5 p-4 solicitacao-card m-auto">
                <div className="row m-auto">
                    <h3 className="info-row">{props.empresa} - #{props.idAgendamento}</h3>
                </div>
                <div className="row m-auto">
                    <div className="col col-12 col-md-8 info-row">
                        <h5><b>Data - </b>{props.dataAgendamento}</h5>
                        <h5><b>Hora - </b>{props.horaAgendamento}</h5>
                        <h5><b>Tipo de carga - </b>{props.tipoCarga}</h5>
                        <h5><b>Descarga - </b>{props.tipoDescarga}</h5>
                        <h5><b>Recorrência - </b>{props.recorrencia}</h5>
                    </div>
                    <div className="col col-12 col-md-4 solic-btn-container info-row d-flex align-items-end">
                        <button value="details" id={props.idAgendamento} style={{color:"#343232", border: "1px solid #343232"}} onMouseUp={(e) => props.handleCardClick(e)} className="btn solic-btn w-100">Detalhes</button>
                    </div>
                </div>
            </div>
    )
}

export default AgendamentoCard;