import React from "react";

function AgendamentoDetails(props){
    return(
        <div className='row details-container position-relative m-auto large-container-shadow ms-0 border-box p-5' >
            <div className="row text-center">
                <h2 className="bold">{props.empresa} #{props.idAgendamento}</h2>
                <hr className="w-50 m-auto" />
                <h3>{props.status}</h3>
            </div>
            <div className="row mt-5">
                <div className="col-lg-6 details-info">
                    <div className="row mb-3"><b className="col-md-7 col-sm-4 col-5 text-start">DATA</b>{props.data}</div>
                    <div className="row mb-3"><b className="col-md-7 col-sm-4 col-5 text-start">HORA</b>{props.hora}</div>
                    
                </div>
                <div className="col-lg-6 details-info">
                    <div className="row mb-3"><b className="col-md-7 col-sm-4 col-5">TIPO DE CARGA</b>{props.tipoCarga}</div>
                    <div className="row mb-3"><b className="col-md-7 col-sm-4 col-5">DESCARGA</b>{props.tipoDescarga}</div>
                </div>
                
            </div>
            <div className="row mt-3"><b className="width-fit text-end">RECORRÊNCIA</b>{props.recorrencia}</div>
            <div className="row mt-5"><b className="width-fit text-end">OBSERVAÇÕES</b><textarea rows={5} value={props.observacoes} className="col reset-format no-outline no-resizer" readOnly /> </div>
            <div className="row btn-row">
            <div className="row w-75 m-auto">
                <button value="accept" id={props.idAgendamento} onMouseUp={(e) => props.handleAlterar(e)} className="btn col-5 solic-btn bold red-bg mt-2 m-auto">DESMARCAR</button>
                <button value="accept" id={props.idAgendamento} onMouseUp={(e) => props.handleAlterar(e)} className="btn col-5 solic-btn bold green-bg ms-3 mt-2 m-auto">ALTERAR</button>

             </div>
            </div>
         </div>
    )
}

export default AgendamentoDetails;