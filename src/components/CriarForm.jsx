import React, { useEffect, useState } from "react";
import fornecedores from "../users/fornecedores";
import FormInputField from "./FormInputField";
import dayjs from 'dayjs';
import Calendar from "./Calendar";
import DigitalTimePicker from "./DigitalTimePicker";
import {createAgendamento, generateId} from "../utils/createAgendamento";
import { getAgendamentosLS, setAgendamentosLS } from "../utils/agendamentosLS";
import DialogCriar from "./DialogCriar";
import ActionBtn from "./ActionBtn";
import checkAvailableTime from "../utils/checkAvailableTime";
import { getTempLoginInfo } from "../utils/tempLoginInfo";
import { getRecorrencias, getTiposDeCarga, getTiposDeDescarga } from "../utils/formFieldOptions";


function CriarForm(props){
    const authInfo = getTempLoginInfo();
    const fornecedor = fornecedores.map(item => {
        if(item.id_fornecedor === authInfo.id){
            return item.informacoesLegais[1]
        }
    }).filter(item => item !== undefined)

    const [idAgendamento, setIdAgendamento] = useState(generateId())
    const [fornecedorV, setFornecedorV] = useState(fornecedor || "");
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
    
    const [errorMsg, setErrorMsg] = useState(false);

    const formType = props.formType;

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
        checkAvailableTime(selectedDay, agendamentos, "").then((value) => setDisabledTimes(value))
    }, [selectedDay])   

    //when agendamentos is altered
    useEffect(() => {
        setAgendamentosLS(agendamentos) //adds the new values to the local storage
    }, [agendamentos])

    function setHour(h,m){ //sets the time of the dateObj
        return new Promise((resolve, reject) => {
            resolve(setDateObj(dateObj.set('hour', h).set('minute', m)))
        }) 
    }
    
  
    function handleSubmit(){ // when form is submitted
        setOpenDialog(false)

        //checks if all the fields are filled
        if(fornecedorV.length > 0 && cargaV.length > 0 && descargaV.length > 0 && recorrenciaV.length > 0 && selectedDay !== undefined && selectedTime !== undefined){
            //adds the new item to local agendamentos usestate variable
            if(authInfo.actor==="Colaborador"){
                setAgendamentos(prev => {
                    return [...prev, createAgendamento(idAgendamento, fornecedorV, "agendado", dateObj, cargaV, descargaV, recorrenciaV, obsV, false, true)]
                })
            }else{
                setAgendamentos(prev => {
                    return [...prev, createAgendamento(idAgendamento, fornecedorV, "pendente", dateObj, cargaV, descargaV, recorrenciaV, obsV, false, false)]
                })
            }
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
                {formType === "agend" ? <div className="row my-5 bolder h2 form-header">CRIAR NOVO AGENDAMENTO</div> : <div className="row my-5 bolder h2 form-header">SOLICITAR AGENDAMENTO</div>}
                <div className="row m-auto">
                    <div className="col-lg-3 me-lg-5">
                        <FormInputField type={"text"} label={"CÓDIGO DO AGENDAMENTO"} disabled={true} id={"codAgenda"} value={idAgendamento}  />
                        {authInfo.actor==="Colaborador" ? 
                            <FormInputField required type={"autocomplete"} label={"FORNECEDOR"} disabled={false} id={"fornecedores"} value={fornecedorV} options={fornecedores.map(item => item.informacoesLegais[0])} setValue={setFornecedorV} />
                            : <FormInputField type={"text"} disabled={true} label={"FORNECEDOR"} id={"fornecedores"} value={fornecedorV} />
                        }
                        <FormInputField required type={"autocomplete"} label={"TIPO DE CARGA"} disabled={false} id={"carga"} value={cargaV} options={getTiposDeCarga()} setValue={setCargaV}/>
                        <FormInputField required type={"autocomplete"} label={"TIPO DE DESCARGA"} disabled={false} id={"descarga"} value={descargaV} options={getTiposDeDescarga()} setValue={setDescargaV}/>
                        <FormInputField required type={"autocomplete"} label={"RECORRÊNCIA"} disabled={false} id={"recorrencia"} value={recorrenciaV} options={getRecorrencias()} setValue={setRecorrenciaV}/>
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
                            
                            <div className="col text-lg-end text-center">
                                {errorMsg && <p className="auth-error bold">Voce precisa preencher todos os campos obrigatórios.</p>}
                                <ActionBtn label={'AGENDAR'}
                                    handler={() => {
                                        if(fornecedorV.length > 0 && cargaV.length > 0 && descargaV.length > 0 && recorrenciaV.length > 0 && selectedDay !== undefined && selectedTime !== undefined){
                                            errorMsg && setErrorMsg(false)
                                            setOpenDialog(true)
                                        }else{
                                            setErrorMsg(true)
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
                    {formType === "agend" ? <div className="col-12 mb-5 bolder h2 text-center ">AGENDAMENTO CRIADO COM SUCESSO!</div> : <div className="col-12 mb-5 bolder h2 text-center ">SOLICITAÇÃO CRIADA COM SUCESSO!</div> }
                    <div className="col-12 text-center">
                        <ActionBtn label={formType === "agend" ? "CRIAR OUTRO" : "CRIAR OUTRA"} handler={() => {setIdAgendamento(generateId());setIsSubmitted(false)}}  />
                    </div>
                </div>
                
            </div>
        ))
    
}

export default CriarForm;