import React, { useEffect, useState } from "react";
import fornecedores from "../users/fornecedores";
import FormInputField from "./FormInputField";
import dayjs, { Dayjs } from 'dayjs';
import Calendar from "./Calendar";
import DigitalTimePicker from "./DigitalTimePicker";
import {createAgendamento, generateId} from "../utils/createAgendamento";
import { getAgendamentosLS, setAgendamentosLS } from "../utils/agendamentosLS";
import DialogCriar from "./DialogCriar";
import ActionBtn from "./ActionBtn";
import { Action } from "@remix-run/router";


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
    const today = new Date().getMonth() < 9 ? (new Date().getFullYear() + '-0' + (new Date().getMonth()+1) + '-' + new Date().getDate()) : new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();
    const [diff, setDiff] = useState();
    
    const [selectedDay, setSelectedDay] = useState();
    const [selectedTime, setSelectedTime] = useState();

    const [agendamentos, setAgendamentos] = useState([]);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    
    let [dateObj, setDateObj] = useState();
    const [disabledTimes, setDisabledTimes] = useState([]);

    
    
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
        diff < 24 ? setMinTime(9) : setMinTime(dayjs().format("HH")) // if in the future, the min time is 9am, otherwise it's the nearest future time 
        checkAvailableTime() 
    }, [selectedDay])   

    //when agendamentos is altered
    useEffect(() => {
        setAgendamentosLS(agendamentos) //adds the new values to the local storage
    }, [agendamentos])

    useEffect(() => {
        console.log(disabledTimes)
    }, [disabledTimes])
    function setHour(h,m){ //sets the time of the dateObj
        return new Promise((resolve, reject) => {
            resolve(setDateObj(dateObj.set('hour', h).set('minute', m)))
        }) 
    }
    
    function checkAvailableTime(){ //checks the available times of the selected day
        const localSelectedDay = dayjs(selectedDay).format("DD/MM/YYYY");
        let agendamentosConfirmados = agendamentos.map(item => {
            if(item.status === "agendado" && dayjs(item.data).format("DD/MM/YYYY")===localSelectedDay){
                return item;
            }
        }).filter(item => item!==undefined) //makes sure to return only the items which are not undefined
        agendamentosConfirmados.length > 0 ? setDisabledTimes(agendamentosConfirmados.map(item => dayjs(item.data).hour())) : setDisabledTimes([])
    }
  
    function handleSubmit(){ // when form is submitted
        setOpenDialog(false)
        //checks if all the fields are filled
        if(fornecedorV.length > 0 && cargaV.length > 0 && descargaV.length > 0 && recorrenciaV.length > 0 && selectedDay !== undefined && selectedTime !== undefined){
            //adds the new item to local agendamentos usestate variable
            setAgendamentos(prev => {
                return [...prev, createAgendamento(idAgendamento, fornecedorV, "agendado", dateObj, cargaV, descargaV, recorrenciaV, obsV, false)]
            })
            // indicates the form was submitted
            setIsSubmitted(true);setFornecedorV("");setCargaV("");setDescargaV("");setRecorrenciaV("");setObsV("");setSelectedDay();setSelectedTime();
        }
    }
    
    //checks some conditions to display a digital clock or a message
    function displayClock(){
        
        return (selectedDay !== undefined ? (
                    (diff < 0 && disabledTimes.length < 11) ? <DigitalTimePicker disabledTimes={disabledTimes} setDateHour={setHour} setValue={setSelectedTime} selectedDay={selectedDay} minTime={minTime} /> 
                
                        : <h3 className="text-center" style={{color: "#A09F9F"}}>Nenhum horário disponível. Selecione outra data!</h3>
                ) : <h3 className="text-center" style={{color: "#A09F9F"}}>Selecione uma data para ver os horários disponíveis!</h3>
        )
    }
    return(
        //if the form wasn't submitted yet => show the form
        !isSubmitted ? (
            <div className="container h-auto m-auto mt-5 criar-form-container hide-scrollbar large-container-shadow">
                <DialogCriar handleSubmit={handleSubmit} handleControl={setOpenDialog} control={openDialog} data={dayjs(dateObj).format("DD/MM/YYYY")} hora={dayjs(dateObj).format("HH:mm")} fornecedor={fornecedorV} carga={cargaV} descarga={descargaV} recorrencia={recorrenciaV} />
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
                                <Calendar pickerType="standard" dateObject={dateObj} setDateObject={setDateObj} agendamentos={agendamentos} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
                            </div>

                            <div className="col-lg-4">
                                {displayClock()}
                            </div>
                            
                            <div className="col text-end">
                                <ActionBtn label={'AGENDAR'}
                                    handler={() => {
                                        if(fornecedorV.length > 0 && cargaV.length > 0 && descargaV.length > 0 && recorrenciaV.length > 0 && selectedDay !== undefined && selectedTime !== undefined){
                                            setOpenDialog(true)
                                        }
                                    }} 
                                />
                            </div>
                        </div>
                    </div>
            </div>  
        </div>) : ( //if the form was submitted => show submission message                              
            <div className="container criar-form-container position-relative" >
                <div className="row agendamento-criado">
                    <div className="col-12 mb-5 bolder h2 text-center ">AGENDAMENTO CRIADO COM SUCESSO!</div>
                    <div className="col-12 text-center">
                        <ActionBtn label={"CRIAR OUTRO"} handler={() => {setIdAgendamento(generateId());setIsSubmitted(false)}}  />
                    </div>
                </div>
                
            </div>
        ))
    
}

export default CriarForm;