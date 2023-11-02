import React from "react";
import { getAgendamentosLS } from "../utils/agendamentosLS";
import { getRecorrencias, getTiposDeCarga, getTiposDeDescarga } from "../utils/formFieldOptions";
import FormInputField from "./FormInputField";
import CollapsedTimePicker from "./CollapsedTimePicker";
import Calendar from "./Calendar";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function DialogAlterar(props){
    const isAltered = props.isAltered;

    if(isAltered===false){
        const isOpen = props.open;
        const dateObj = props.dateObj;
        const initialValue = props.initialValue;
        const disabledTimes = props.disabledTimes;
        const cargaV = props.cargaV;
        const descargaV = props.descargaV;
        const recorrenciaV = props.recorrenciaV;
        const observacoesV = props.observacoesV;
        const handleAlterar = props.handleAlterar;

        return (
            <Dialog open={isOpen} onClose={() => props.setOpen(false)} fullWidth PaperProps={{sx: {borderRadius: 10}}}>
                <DialogTitle className="text-center bolder font-18">ALTERAR AGENDAMENTO</DialogTitle>
                <DialogContent>
                    <div className="row details-info-parent m-auto">

                        <div className="col-md-5 details-info font-14">

                            <div className="row mb-4">
                                <label htmlFor="" className="col-md-7 bold col-sm-4 col-5 text-start p-0 width-fit p-0">DATA</label>
                                <Calendar agendamentos={getAgendamentosLS()} setDateObject={props.setDateObj}/>
                                
                            </div>
                            <div className="row">
                                <label htmlFor="" className="col-md-7 bold col-sm-4 col-5 text-start width-fit p-0">HORA</label>
                                <CollapsedTimePicker initialValue={initialValue} setDateObject={props.setDateObj} dateObject={dateObj} disabledTimes={disabledTimes} />
                            </div>
                        </div>

                        <div className="col-md-6 col-12 p-md-auto p-0 ms-md-auto mt-md-0 mt-4 details-info font-14">
                            <FormInputField type={"autocomplete"} label={"TIPO DE CARGA"} disabled={false} id={"carga"} options={getTiposDeCarga()} value={cargaV || ''} setValue={props.setCargaV} />
                            <FormInputField type={"autocomplete"} label={"TIPO DE DESCARGA"} disabled={false} id={"descarga"} options={getTiposDeDescarga()} value={descargaV || ''} setValue={props.setDescargaV} />
                        </div>
                    </div>
                    <div className="row mt-3 font-14 m-auto">
                        <FormInputField type={"autocomplete"} label={"RECORRÊNCIA"} disabled={false} id={"recorrencia"} options={getRecorrencias()} value={recorrenciaV || ''} setValue={props.setRecorrenciaV} />
                    </div>
                    <div className="row mt-3 font-14 m-auto">
                        <FormInputField type={"paragraph"} label={"OBSERVAÇÕES"} disabled={false} id={"observacoes"} value={observacoesV || ''} setValue={props.setObservacoesV} />
                    </div>
                    <div className="row mt-3 font-14 m-auto">
                        <input type="checkbox" name="concluida" id="concluida" className=" width-fit align-self-center col-3 justify-content-start" onChange={(e) => props.setIsEntregue(e.target.checked)} />
                        <label htmlFor="concluida" className=" col bold" >Marcar entrega como concluída</label>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button onClick={() => {handleAlterar()}} className="entrar-btn btn btn-lg px-5 py-1 m-auto dark-blue-bg bold" >ALTERAR</button>
                </DialogActions>
            </Dialog>
        )
    }else{
        const isOpen = props.open;

        return (
            <Dialog open={isOpen} onClose={() => {props.setOpen(false); props.setIsAltered(false)}} fullWidth PaperProps={{sx: {borderRadius: 10}}}>
                <DialogTitle className="text-center bolder font-18">AGENDAMENTO ALTERADO COM SUCESSO</DialogTitle>
                <DialogActions>
                    <button onClick={() => {props.setOpen(false); props.setIsAltered(false)}} className="entrar-btn btn btn-lg px-5 py-1 m-auto dark-blue-bg bold" >FECHAR</button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default DialogAlterar;