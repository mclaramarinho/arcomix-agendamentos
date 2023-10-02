import React from "react";

function AgendamentoDetails(props){
    return(
        <div className='row details-container position-relative m-auto' >
            <div className="row">
                <h1>{props.empresa} #{props.idAgendamento}</h1>
                <hr className="w-50 m-auto" />
                <h3>{props.status}</h3>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="row"><strong className="col-6">DATA - </strong>{props.data}</div>
                    <div className="row"><strong className="col-6">HORA - </strong>{props.hora}</div>
                    
                </div>
                <div className="col-lg-6">
                    <div className="row"><strong className="col-6">TIPO DE CARGA - </strong>{props.tipoCarga}</div>
                    <div className="row"><strong className="col-6">DESCARGA - </strong>{props.tipoDescarga}</div>
                </div>
                
            </div>
            <div className="row"><strong>RECORRÊNCIA - </strong>{props.recorrencia}</div>
            
         </div>
    )
}

export default AgendamentoDetails;