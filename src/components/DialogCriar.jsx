import React from "react";
import {getTempLoginInfo} from '../utils/tempLoginInfo'

import {Dialog} from '@mui/material';
import {DialogContent} from '@mui/material';
import {DialogContentText} from '@mui/material';
import {DialogTitle} from '@mui/material';
import ActionBtn from "./ActionBtn";
function DialogCriar(props){
    const handleControl = props.handleControl;
    const control = props.control;
    const handleSubmit = props.handleSubmit;
    return(
        <Dialog open={control} onClose={() => handleControl(false)}>
            <DialogTitle id="alert-dialog-title" className="text-center bolder font-18">CONFIRMAR AGENDAMENTO</DialogTitle>
            <hr className="w-50 m-auto" />
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className="text-center font-14">
                    Verifique as informações do agendamento para prosseguir.
                </DialogContentText>
                <div className="container p-0 m-auto mt-5 font-13">
                    <div className="row m-auto">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-5 text-start bold">DATA: </div>
                                <div className="col-7">{props.data}</div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-5 text-end bold">HORA: </div>
                                <div className="col-7">{props.hora}</div>
                            </div>
                        </div>
                    </div>
                    {getTempLoginInfo().actor === "Colaborador" && 
                        (<div className="row m-auto mt-3">
                                <div className="col-5 col-md-4 text-start bold">FORNECEDOR: </div>
                                <div className="col-7 col-md-8">{props.fornecedor}</div>
                        </div>)
                    }
                    <div className="row m-auto mt-3">
                            <div className="col-5 col-md-4 text-start bold">TIPO DE CARGA: </div>
                            <div className="col-7 col-md-8">{props.carga}</div>
                    </div>
                    <div className="row m-auto mt-3">
                            <div className="col-5 col-md-4 text-start bold">DESCARGA: </div>
                            <div className="col-7 col-md-8">{props.descarga}</div>
                    </div>
                    <div className="row m-auto mt-3">
                            <div className="col-5 col-md-4 text-start bold">RECORRÊNCIA: </div>
                            <div className="col-7 col-md-8"> {props.recorrencia}</div>
                    </div>
                </div>
            </DialogContent>
            <div className="row w-75 m-auto text-center pb-4">
                
                <div className="col-6">
                    <ActionBtn handler={() => {handleControl(false)}} bg={'red'} label={"Alterar"} addClass={`w-100`} />
                </div>
                <div className="col-6">
                    <ActionBtn handler={() => {handleControl(false); handleSubmit()}} bg={'green'} 
                        label={getTempLoginInfo().actor === "Colaborador" ? "Agendar" : "Solicitar"} 
                        addClass={`w-100`}
                    />
                </div>
            </div>
        </Dialog>  
    )
      
}

export default DialogCriar;