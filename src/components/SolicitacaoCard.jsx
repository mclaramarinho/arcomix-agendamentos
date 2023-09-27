import React from "react";

function SocilitacaoCard(props){
    return(
        <div className="row mt-5 mb-5 p-4 m-auto" style={{border:"1px solid #343232", boxSizing:"border-box", width: "60%"}}>
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
                    <div className="col col-12 col-md-4 solic-btn-container info-row">
                        <button className="btn solic-btn green-bg w-100 mt-2 mb-3">Aceitar</button>
                        <button className="btn solic-btn red-bg w-100">Recusar</button>
                    </div>
                </div>
            </div>
    )
}

export default SocilitacaoCard;