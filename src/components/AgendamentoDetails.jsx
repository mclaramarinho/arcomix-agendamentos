import dayjs from "dayjs";
import React from "react";
import ActionBtn from "./ActionBtn";
import {getTempLoginInfo} from '../utils/tempLoginInfo'

function AgendamentoDetails(props){
    return(
        <div className='row details-container gutter-x-0 position-relative m-auto large-container-shadow ms-0 border-box p-5' >
            <div className="row text-center">
                <h2 className="bold">{props.empresa} #{props.idAgendamento}</h2>
                <hr className="w-50 m-auto" />
                <h3 className="mt-4 bold">{props.status}</h3>
            </div>
            <div className="row mt-5 details-info-parent">
                <div className="col-sm-6 details-info font-14">
                    <div className="row mb-3"><b className="col-md-7 col-sm-4 col-5 text-start width-fit">DATA</b>{dayjs(props.data).format('DD/MM/YYYY')}</div>
                    <div className="row mb-3"><b className="col-md-7 col-sm-4 col-5 text-start width-fit">HORA</b>{dayjs(props.data).format('HH:mm')}</div>
                    
                </div>
                <div className="col-sm-6 details-info font-14">
                    <div className="row mb-3"><b className="col-md-7 col-sm-4 col-5 width-fit">TIPO DE CARGA</b>{props.tipoCarga}</div>
                    <div className="row mb-3"><b className="col-md-7 col-sm-4 col-5 width-fit">DESCARGA</b>{props.tipoDescarga}</div>
                </div>
                
            </div>
            <div className="row mt-3 font-14"><b className="width-fit text-end width-fit">RECORRÊNCIA</b>{props.recorrencia}</div>
            <div className="row mt-5 font-12"><b className="width-fit text-end width-fit">OBSERVAÇÕES</b><textarea rows={5} value={props.observacoes} className="col reset-format no-outline no-resizer" readOnly /> </div>
            <div className="row btn-row">
            <div className="row w-100 m-auto">
                <ActionBtn value={"desmarcar"} label={"DESMARCAR"} bg={"red"} handler={props.handleAlterar} id={props.idAgendamento}/>
                {getTempLoginInfo().actor === "Colaborador" &&
                    <ActionBtn value={"alterar"} label={"ALTERAR"} handler={props.handleAlterar} id={props.idAgendamento}/>
                }
             </div>
            </div>
         </div>
    )
}

export default AgendamentoDetails;