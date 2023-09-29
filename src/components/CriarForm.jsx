import React, { useEffect, useState } from "react";
import fornecedores from "../users/fornecedores";
import FormInputField from "./FormInputField";
import { DigitalClock, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Badge, Stack, Typography } from "@mui/material";
import dayjs from 'dayjs';

function CriarForm(){
    const initialValue = dayjs(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate());
    const requestAbortController = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = React.useState([]);

    function fakeFetch(date, { signal }) {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            const daysToHighlight = [1, 2, 3];
      
            resolve({ daysToHighlight });
          }, 500);
      
          signal.onabort = () => {
            clearTimeout(timeout);
            reject(new DOMException('aborted', 'AbortError'));
          };
        });
    }

    
    function ServerDay(props) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
      
        const isSelected =
          !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
      
        return (
          <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? <i style={{color:"#990000", fontSize:14}} class="fa-solid fa-x"></i> : undefined}
          >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
          </Badge>
        );
      }

    const fetchHighlightedDays = (date) => {
        const controller = new AbortController();
        fakeFetch(date, {
        signal: controller.signal,
        })
        .then(({ daysToHighlight }) => {
            setHighlightedDays(daysToHighlight);
            setIsLoading(false);
        })
        .catch((error) => {
            if (error.name !== 'AbortError') {
            throw error;
            }
        });

        requestAbortController.current = controller;
    };

    React.useEffect(() => {
        fetchHighlightedDays(initialValue);
        return () => requestAbortController.current?.abort();
    }, []);

    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
        requestAbortController.current.abort();
        }
        setIsLoading(true);
        setHighlightedDays([]);
        fetchHighlightedDays(date);
    };

    const [fornecedor, setFornecedor] = useState("");
    const [fornecedorV, setFornecedorV] = useState(fornecedores[0].informacoesLegais[0]);
    
    const tiposDeCarga = ["Frios", "Granel", "Carnes", "Descartáveis", "Conservas", "Materiais de limpeza"];
    const [carga, setCarga] = useState("");
    const [cargaV, setCargaV] = useState(tiposDeCarga[0])

    const tiposDeDescarga = ["Manual", "Paletizada"];
    const [descarga, setDescarga] = useState("");
    const [descargaV, setDescargaV] = useState(tiposDeDescarga[0])

    const recorrencias = ["Única", "Diária", "Semanal", "Mensal", "Trimestral", "Semestral", "Anual"];
    const [recorrencia, setRecorrencia] = useState("");
    const [recorrenciaV, setRecorrenciaV] = useState(recorrencias[0])

    // let minTime, maxTime;
    const [selectedDay, setSelectedDay] = useState();
    useEffect(() => {
        
        console.log(selectedDay)
    }, [selectedDay])
    const [timeValue, setTimeValue] = useState(dayjs());
    return(
        <div className="container h-auto m-auto mt-5 criar-form-container">
            <div className="row my-5 header">
                CRIAR NOVO AGENDAMENTO
            </div>
            <div className="row m-auto">
                
                <div className="col-lg-3 me-lg-5">
                    <FormInputField type={"text"} label={"CÓDIGO DO AGENDAMENTO"} disabled={true} id={"codAgenda"} defaultValue={"124534"}  />
                    <FormInputField type={"autocomplete"} label={"FORNECEDOR"}disabled={false} id={"fornecedores"} value={fornecedorV}
                        setArrayV={setFornecedorV} options={fornecedores.map(item => item.informacoesLegais[0])} array={fornecedor}
                        setArray={setFornecedor}
                    />
                   <FormInputField type={"autocomplete"} label={"TIPO DE CARGA"} disabled={false} id={"carga"} value={cargaV} setArrayV={setCargaV}
                        options={tiposDeCarga} array={carga} setArray={setCarga}
                    />
                   <FormInputField type={"autocomplete"} label={"TIPO DE DESCARGA"} disabled={false} id={"descarga"} value={descargaV}
                        setArrayV={setDescargaV} options={tiposDeDescarga} array={descarga} setArray={setDescarga}
                    />
                    <FormInputField type={"autocomplete"} label={"RECORRÊNCIA"} disabled={false} id={"recorrencia"} value={recorrenciaV}
                        setArrayV={setRecorrenciaV} options={recorrencias} array={recorrencia} setArray={setRecorrencia}
                    />
                    <FormInputField id={"observacoes"} label={"OBSERVAÇÕES"} type={"paragraph"}/>
                </div>
                
                <div className="col-lg-8 ms-lg-5" >
                    <div className="row">
                        <div className="col-lg-9">
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack>
                                    <DateCalendar
                                        loading={isLoading}
                                        onMonthChange={handleMonthChange}
                                        renderLoading={() => <DayCalendarSkeleton />}
                                        slots={{
                                            day: ServerDay,
                                        }}
                                        slotProps={{
                                            day: {
                                                highlightedDays,
                                            },
                                        }}
                                        disablePast /*{setSelectedDay(value.$y + "-" + (value.$M < 9 ? "0"+(value.$M+1) : value.$M+1) + "-" + value.$D)}}*/
                                        onChange={(value, selectionState)=>{setSelectedDay(value)}}
                                    />
                                    <Typography fontWeight={"400"} color={"GrayText"} fontSize={16} variant="h5" className="m-auto">
                                        <i style={{color:"#990000", fontSize:18}} class="fa-solid fa-x"></i> Dias indisponíveis
                                    </Typography>
                                </Stack>
                            </LocalizationProvider>
                        </div>

                        <div className="col-lg-3">
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack>
                                    <Typography fontWeight={"400"} color={"GrayText"} fontSize={16} variant="h5" className="text-end" >
                                        Horários disponíveis
                                    </Typography>
                                    <DigitalClock sx={{width:"70%"}} className="me-0" value={timeValue} onChange={(value, selectionState) => setTimeValue(value)}  skipDisabled />
                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <div className="col text-end">
                            <button className="entrar-btn btn btn-lg px-5 py-1  dark-blue-bg" >
                                AGENDAR
                            </button>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default CriarForm;