import React, { useEffect, useState } from "react";
import fornecedores from "../users/fornecedores";
import FormInputField from "./FormInputField";
import dayjs from 'dayjs';
import Calendar from "./Calendar";
import DigitalTimePicker from "./DigitalTimePicker";
import {createAgendamento, generateId} from "../utils/createAgendamento";
    
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
    
    // when the subtab is loaded
    useEffect(() => {
        if(localStorage.getItem("agendamentos") === null || localStorage.getItem("agendamentos") === undefined ){ //check if there's a local storage for these items
            localStorage.setItem("agendamentos", JSON.stringify(agendamentos)) //sets the local storage if it doesn't already exist
        }else{ //if it already exists
            setAgendamentos(JSON.parse(localStorage.getItem("agendamentos"))) //adds to the local usestate variable the local storage content
        }
    }, [])

    //when the selected day is altered
    useEffect(() => {
        setDiff(dayjs(today).diff(selectedDay, 'hour')) //the difference in hours between today and the selected day

        diff < 24 ? setMinTime('09:00') : setMinTime(dayjs().format("HH:mm")) // if in the future, the min time is 9am, otherwise it's the nearest future time 
    }, [selectedDay])   

    //when agendamentos is altered
    useEffect(() => {
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos)) //adds the new values to the local storage
    }, [agendamentos])

    function handleSubmit(){ // when form is submitted
        
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
                <div className="row my-5 bolder">CRIAR NOVO AGENDAMENTO</div>
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
                                <Calendar setSelectedDay={setSelectedDay} />
                            </div>

                            <div className="col-lg-4">
                                {selectedDay !== undefined ? (
                                    diff < 0 ? <DigitalTimePicker setValue={setSelectedTime} selectedDay={selectedDay} minTime={minTime} maxTime={maxTime} /> 
                                    : <h3 className="text-center" style={{color: "#A09F9F"}}>Nenhum horário disponível. Selecione outra data!</h3>
                                ) : <h3 className="text-center" style={{color: "#A09F9F"}}>Selecione uma data para ver os horários disponíveis!</h3>}
                            </div>
                            
                            <div className="col text-end">
                                <button onClick={() => handleSubmit()} className="entrar-btn btn btn-lg px-5 py-1 dark-blue-bg bold" >
                                    AGENDAR
                                </button>
                            </div>
                        </div>
                    </div>
            
            </div>
        </div>) : ( //if the form was submitted => show submission message                              ### CHANGE TO A DIALOG AS IN THE FIGMA PROTOTYPE!!! ###
            <div className="container w-50 criar-form-container position-relative" style={{marginTop: "25vh"}}>
                <div className="row my-5 header justify-content-center text-center">AGENDAMENTO CRIADO COM SUCESSO!</div>
                <div className="col text-center">
                    <button onClick={() => {setIdAgendamento(generateId());setIsSubmitted(false)}} className="entrar-btn btn btn-lg px-5 py-1 dark-blue-bg" >
                        CRIAR OUTRO
                    </button>
                </div>
            </div>
        ))
    
}

export default CriarForm;