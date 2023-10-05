import React, { useEffect, useState } from "react";
import fornecedores from "../users/fornecedores";
import FormInputField from "./FormInputField";
import dayjs from 'dayjs';
import Calendar from "./Calendar";
import DigitalTimePicker from "./DigitalTimePicker";
import {createAgendamento, generateId} from "../utils/createAgendamento";
import {Button} from '@mui/material';
import {Dialog} from '@mui/material';
import {DialogActions} from '@mui/material';
import {DialogContent} from '@mui/material';
import {DialogContentText} from '@mui/material';
import {DialogTitle} from '@mui/material';
import { getAgendamentosLS, setAgendamentosLS } from "../utils/agendamentosLS";


function CriarForm(){
    const tiposDeCarga = ["Frios", "Granel", "Carnes", "Descartáveis", "Conservas", "Materiais de limpeza"];
    const tiposDeDescarga = ["Manual", "Paletizada"];
    const recorrencias = ["Única", "Diária", "Semanal", "Mensal", "Trimestral", "Semestral", "Anual"];

    const [idAgendamento, setIdAgendamento] = useState(generateId())
    const [fornecedorV, setFornecedorV] = useState("");
    const [cargaV, setCargaV] = useState("")
    const [descargaV, setDescargaV] = useState("")
    const [recorrenciaV, setRecorrenciaV] = useState("")
    const [obsV, setObsV] = useState("")

    const [minTime, setMinTime] = useState();
    const [maxTime, setMaxTime] = useState('19:00');
    const today = new Date().getMonth() < 9 ? (new Date().getFullYear() + '-0' + (new Date().getMonth()+1) + '-' + new Date().getDate()) : new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();
    const [diff, setDiff] = useState();
    
    const [selectedDay, setSelectedDay] = useState();
    const [selectedTime, setSelectedTime] = useState();

    const [agendamentos, setAgendamentos] = useState([]);

    const [isSubmitted, setIsSubmitted] = useState();
    const [openDialog, setOpenDialog] = useState(false);

    // when the subtab is loaded
    useEffect(() => {
        if(getAgendamentosLS() === null || getAgendamentosLS() === undefined ){ //check if there's a local storage for these items
            setAgendamentosLS(agendamentos) //sets the local storage if it doesn't already exist
        }else{ //if it already exists
            setAgendamentos(getAgendamentosLS()) //adds to the local usestate variable the local storage content
        }
    }, [])

    //when the selected day is altered
    useEffect(() => {
        setDiff(dayjs(today).diff(selectedDay, 'hour')) //the difference in hours between today and the selected day

        diff < 24 ? setMinTime('09:00') : setMinTime(dayjs().format("HH:mm")) // if in the future, the min time is 9am, otherwise it's the nearest future time 
    }, [selectedDay])   

    //when agendamentos is altered
    useEffect(() => {
        setAgendamentosLS(agendamentos) //adds the new values to the local storage
    }, [agendamentos])


    function handleSubmit(){ // when form is submitted
        setOpenDialog(false)
        //checks if all the fields are filled
        if(fornecedorV.length > 0 && cargaV.length > 0 && descargaV.length > 0 && recorrenciaV.length > 0 && selectedDay !== undefined && selectedTime !== undefined){
            //adds the new item to local agendamentos usestate variable
            setAgendamentos(prev => {
                return [...prev, createAgendamento(idAgendamento, fornecedorV, "agendado", dayjs(selectedDay).format("MM/DD/YYYY"), 
                    selectedTime, cargaV, descargaV, recorrenciaV, obsV, false
                )]
            })
            // indicates the form was submitted
            setIsSubmitted(true)
        }
    }
    
    return(
        //if the form wasn't submitted yet => show the form
        !isSubmitted ? (
            <div className="container h-auto m-auto mt-5 criar-form-container hide-scrollbar large-container-shadow">
                 <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle style={{fontSize: 18}} id="alert-dialog-title" className="text-center bolder">CONFIRMAR AGENDAMENTO</DialogTitle>
                    <hr className="w-50 m-auto" />
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" className="text-center" style={{fontSize: 14}}>
                            Verifique as informações do agendamento para prosseguir.
                        </DialogContentText>
                        <div className="container p-0 m-auto mt-5" style={{fontSize: 12}}>
                            <div className="row m-auto">
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-5 text-start bold">DATA: </div>
                                        <div className="col-7">{dayjs(selectedDay).format("DD/MM/YYYY")}</div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-5 text-end bold">HORA: </div>
                                        <div className="col-7">{selectedTime}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row m-auto mt-3">
                                    <div className="col-4 text-start bold">FORNECEDOR: </div>
                                    <div className="col-8">{fornecedorV}</div>
                            </div>
                            <div className="row m-auto mt-3">
                                    <div className="col-4 text-start bold">TIPO DE CARGA: </div>
                                    <div className="col-8">{cargaV}</div>
                            </div>
                            <div className="row m-auto mt-3">
                                    <div className="col-4 text-start bold">DESCARGA: </div>
                                    <div className="col-8">{descargaV}</div>
                            </div>
                            <div className="row m-auto mt-3">
                                    <div className="col-4 text-start bold">RECORRÊNCIA: </div>
                                    <div className="col-8">{recorrenciaV}</div>
                            </div>
                        </div>
                    </DialogContent>
                    <div className="row w-75 m-auto text-center">
                        <div className="col-6">
                            <button  onMouseUp={() => {setOpenDialog(false)}} className="btn solic-btn bold w-75 red-bg mt-2">Alterar</button>
                        </div>
                        <div className="col-6">
                            <button  onMouseUp={() =>  {setOpenDialog(false); handleSubmit()}} className="btn solic-btn bold w-75 green-bg mt-2">Agendar</button>
                        </div>
                    </div>
                </Dialog>  
                
                <div className="row my-5 bolder h2 form-header">CRIAR NOVO AGENDAMENTO</div>
                <div className="row m-auto">
                    <div className="col-lg-3 me-lg-5">
                        <FormInputField type={"text"} label={"CÓDIGO DO AGENDAMENTO"} disabled={true} id={"codAgenda"} value={idAgendamento}  />
                        <FormInputField type={"autocomplete"} label={"FORNECEDOR"} disabled={false} id={"fornecedores"} value={fornecedorV} options={fornecedores.map(item => item.informacoesLegais[0])} setValue={setFornecedorV} />
                        <FormInputField type={"autocomplete"} label={"TIPO DE CARGA"} disabled={false} id={"carga"} options={tiposDeCarga} value={cargaV} setValue={setCargaV}/>
                        <FormInputField type={"autocomplete"} label={"TIPO DE DESCARGA"} disabled={false} id={"descarga"} value={descargaV} options={tiposDeDescarga} setValue={setDescargaV}/>
                        <FormInputField type={"autocomplete"} label={"RECORRÊNCIA"} disabled={false} id={"recorrencia"} value={recorrenciaV} options={recorrencias} setValue={setRecorrenciaV}/>
                        <FormInputField type={"paragraph"} id={"observacoes"} value={obsV} setValue={setObsV} label={"OBSERVAÇÕES"}/>
                    </div>
                    
                    <div className="col-lg-8 ms-lg-5" >
                        <div className="row">
                            <div className="col-lg-8">
                                <Calendar agendamentos={agendamentos} setSelectedDay={setSelectedDay} />
                            </div>

                            <div className="col-lg-4">
                                {selectedDay !== undefined ? (
                                    diff < 0 ? <DigitalTimePicker setValue={setSelectedTime} selectedDay={selectedDay} minTime={minTime} maxTime={maxTime} /> 
                                    : <h3 className="text-center" style={{color: "#A09F9F"}}>Nenhum horário disponível. Selecione outra data!</h3>
                                ) : <h3 className="text-center" style={{color: "#A09F9F"}}>Selecione uma data para ver os horários disponíveis!</h3>}
                            </div>
                            
                            <div className="col text-end">
                                <button
                                    onClick={() => {
                                        if(fornecedorV.length > 0 && cargaV.length > 0 && descargaV.length > 0 && recorrenciaV.length > 0 && selectedDay !== undefined && selectedTime !== undefined){
                                            setOpenDialog(true)
                                        }
                                        
                                    }} 
                                    className="entrar-btn btn btn-lg px-5 py-1 dark-blue-bg bold" >
                                    AGENDAR
                                </button>
                            </div>
                        </div>
                    </div>
            </div>  
        </div>) : ( //if the form was submitted => show submission message                              
            <div className="container criar-form-container position-relative" >
                <div className="row agendamento-criado">
                    <div className="col-12 mb-5 bolder h2 text-center ">AGENDAMENTO CRIADO COM SUCESSO!</div>
                    <div className="col-12 text-center">
                        <button onClick={() => {setIdAgendamento(generateId());setIsSubmitted(false)}} className="entrar-btn btn btn-lg px-5 py-1 pt-2 dark-blue-bg bold" >
                            CRIAR OUTRO
                        </button>
                    </div>
                </div>
                
            </div>
        ))
    
}

export default CriarForm;