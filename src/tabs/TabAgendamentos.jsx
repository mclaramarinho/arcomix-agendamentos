import React, { useEffect, useState } from "react";
import TabBtn from "../components/TabBtn";
import AgendamentosLista from "../components/AgendamentosLista";
import AgendamentoDetails from '../components/AgendamentoDetails'
import { getAgendamentosLS, setAgendamentosLS } from "../utils/agendamentosLS";
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material";
import dayjs from "dayjs";
import FormInputField from "../components/FormInputField";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Calendar from "../components/Calendar";
import DigitalTimePicker from "../components/DigitalTimePicker";
import { getTiposDeCarga, getRecorrencias, getTiposDeDescarga } from "../utils/formFieldOptions";
import CollapsedTimePicker from "../components/CollapsedTimePicker";
import DialogAlterar from "../components/DialogAlterar";

function TabAgendamentos (){
    const [localAgendamentos, setLocalAgendamentos] = useState([]);

    const [observacoesV, setObservacoesV] = useState('');
    const [cargaV, setCargaV] = useState('')
    const [descargaV, setDescargaV] = useState('')
    const [recorrenciaV, setRecorrenciaV] = useState('')
    const [selected, setSelected] = useState();

    const [subTab1, setSubTab1] = useState(true);

    const [openDetails, setOpenDetails] = useState(false);

    const [openAlterar, setOpenAlterar] = useState(false);

    const [disabledTimes, setDisabledTimes] = useState([]);
    const [dateObj, setDateObj] = useState();

    //checks if there's a local storage already
    useEffect(() => {
        if(getAgendamentosLS()!==null){ //if this local storage exists
            setLocalAgendamentos(getAgendamentosLS()) //agendamentos will receive the items of this storage
        }
    }, [])
    useEffect(()=>{
        checkAvailableTime()
    }, [dateObj])


    //everytime the card inside the list container is clicked
    function handleDetails(e){
        const id = e.target.id;
        setOpenDetails(true) //allows the displaying of details
        const solicit = localAgendamentos.filter(item => { //returns all the information of the clicked card
            if(item.id_agendamento===id){
                return item;
            }
        })
        setSelected(solicit)
    }

    function tabContent(){
        if(subTab1){
            return <AgendamentosLista handleDetails={handleDetails}/>
        }else{
            return <h1>Indisponivel no momento...</h1>
        }
    }
    function checkAvailableTime(){ //checks the available times of the selected day
        const localSelectedDay = dayjs(dateObj).format("DD/MM/YYYY");
        if(localSelectedDay === dayjs().format("DD/MM/YYYY")){
            return setDisabledTimes([9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
        }else{
            let agendamentosConfirmados = localAgendamentos.map(item => {
                if(item.status === "agendado" && dayjs(item.data).format("DD/MM/YYYY")===localSelectedDay){
                    return item;
                }
            }).filter(item => item!==undefined) //makes sure to return only the items which are not undefined
            return setDisabledTimes(() =>{
                return agendamentosConfirmados.map(item => dayjs(item.data).hour())
            })
        }

    }
    const [openSnackBar, setOpenSnackBar] = useState(false);
    function handleAlterar (e){
        setCargaV('')
        setDescargaV('')
        setDateObj()
        setObservacoesV('')
        setRecorrenciaV('')
        const action = e.target.value;
        const id = selected[0].id_agendamento;
        if(action === "desmarcar"){
            setLocalAgendamentos(localAgendamentos.map(item => {
                if(item.id_agendamento === id){
                    return item.status="cancelado"
                }
            }))
            setOpenSnackBar(true)
            return setAgendamentosLS(localAgendamentos)
        }else{
            setOpenAlterar(true)
        }
    }
    const [isAltered, setIsAltered] = useState(false);
    function onAlterarSubmit(){
        if(dateObj !== undefined){
            (localAgendamentos.map(item => {
                if(item.id_agendamento === selected[0].id_agendamento){
                    item.data = dayjs(dateObj).toISOString();
                }
            }))
            setIsAltered(true);
        }
        if(cargaV.length > 0){
            (localAgendamentos.map(item => {
                if(item.id_agendamento === selected[0].id_agendamento){
                    item.tipo_carga = cargaV;
                }
            }))
            setIsAltered(true);
        }
        if(descargaV.length > 0){
            (localAgendamentos.map(item => {
                if(item.id_agendamento === selected[0].id_agendamento){
                    item.tipo_descarga = descargaV;
                }
            }))
            setIsAltered(true);
        }
        if(recorrenciaV.length > 0){
            (localAgendamentos.map(item => {
                if(item.id_agendamento === selected[0].id_agendamento){
                    item.recorrencia = recorrenciaV;
                }
            }))
            setIsAltered(true);
        }
        if(observacoesV.length > 0){
            (localAgendamentos.map(item => {
                if(item.id_agendamento === selected[0].id_agendamento){
                    item.observacoes = observacoesV;
                }
            }))
            setIsAltered(true);
        }
        setAgendamentosLS(localAgendamentos)
    }


    return(
        <div className="container-fluid tab-container">
            <Snackbar open={openSnackBar} autoHideDuration={5000} onClose={() => setOpenSnackBar(false)}>
                <Alert onClose={() => setOpenSnackBar(false)} severity="success" sx={{ width: '100%', fontSize: 14 }}>Agendamento desmarcado!</Alert>
            </Snackbar>
            <div className="row">
                <div className="col-lg-2 btn-container">
                    <TabBtn isSelected={subTab1} key="solicitacao" id="lista-agendamentos" label="LISTA" handleClick={() => !subTab1 && setSubTab1(true)} />
                    <TabBtn isSelected={!subTab1} key="criar" id="calend-agendamentos" label="CALENDARIO" handleClick={() => subTab1 && setSubTab1(false)} />
                </div>
                <div className={`col-lg-5 col`} style={{height: "100%"}}>
                    {tabContent()}
                </div>
                <div className="col-lg-5 border-box" style={{height: "100%"}}>
                    {/* if something is clicked, the info of the last card clicked will be displayed */}
                    {openDetails && (
                        <AgendamentoDetails
                            empresa={selected[0].id_fornecedor}
                            idAgendamento={selected[0].id_agendamento}
                            status={selected[0].status.toUpperCase()}
                            data={selected[0].data}
                            tipoCarga={selected[0].tipo_carga}
                            tipoDescarga={selected[0].tipo_descarga}
                            recorrencia={selected[0].recorrencia}
                            observacoes={selected[0].observacoes}
                            handleAlterar={handleAlterar}
                        />)
                    }
                    {(openAlterar===true && isAltered===false) ? ( 
                        <DialogAlterar isAltered={isAltered} open={openAlterar} setOpen={setOpenAlterar}  
                            dateObj={dateObj} setDateObj={setDateObj}
                            initialValue={selected[0].data} disabledTimes={disabledTimes}
                            cargaV={cargaV} setCargaV={setCargaV}
                            descargaV={descargaV} setDescargaV={setDescargaV}
                            recorrenciaV={recorrenciaV} setRecorrenciaV={setRecorrenciaV}
                            observacoesV={observacoesV} setObservacoesV={setObservacoesV}
                            handleAlterar={onAlterarSubmit}
                        />
                    ) : (openAlterar && isAltered===true) && (
                        <DialogAlterar setIsAltered={setIsAltered} open={openAlterar} setOpen={setOpenAlterar} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TabAgendamentos;