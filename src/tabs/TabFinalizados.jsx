import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import ActionBtn from "../components/ActionBtn";
import Container from '../components/Container'
import {getAgendamentosLS, setAgendamentosLS} from '../utils/agendamentosLS'
import dayjs from "dayjs";
import { getList } from "../utils/listContent";
function TabFinalizados(){
    const [startDate, setStartDate] = useState();
    const [finalDate, setFinalDate] = useState();
    const [isEmpty, setIsEmpty] = useState(true);
    const [resultado, setResultado] = useState([]);
    const [all, setAll] = useState([]);
    const [displayError, setDisplayError] = useState(false)
    
    useEffect(() =>{
        getList("finalizados").then((value) => setAll(value))
    }, [])

    function handlePesquisa(e){
        const action = e.target.value;
        
        if(action === "pesquisar"){
            const start = dayjs(startDate)
            const end = dayjs(finalDate)
            const diffYear = end.year() - start.year() 
            if(diffYear < 0){ //end year is lower than start year (e.g. start 2023 - end 2020)
                setDisplayError(true)
                return;
            }else{
                if(end.month() - start.month() < 0){
                    setDisplayError(true)
                    return
                }else{
                    if(end.date() - start.date() < 0){
                        setDisplayError(true)
                        return 
                    }else{
                        setDisplayError(false)
                    }
                }
            }
            const res = all.map(item => {
                const date = dayjs(item.data)

                if(date.year() === start.year() || date.year() === end.year()){
                    if(date.month() === start.month() || date.month() === end.month()){ //if the current item is in the same month as the start or end date
                        if(date.date() >= start.date() && date.date() <= end.date()){ //if the current item date is within the start and end dates
                            return item;
                        }
                    }else if(date.month() > start.month() && date.month() < end.month()){ //if the current item date is not in the same month as the start or end date
                        return item;
                    }
                }else if(date.year() > start.year() && date.year() < end.year()){ //if the current item date is withing the start and end year range
                    return item;
                }
            }).filter(item => item !== undefined)
            return setResultado(res), setIsEmpty(false)
        }
    }

    return(
        <div className="container-fluid p-md-5">
            <div className="row">
                <div className="col-lg-5 col-12 mb-lg-0 mb-5">
                    <div className="row width-fit gutter-x-0">
                        <div className="row font-25 bolder justify-content-center gutter-x-0 mt-5 text-center">SELECIONE O PERÍODO PARA VISUALIZAR</div>
                        <div className="row gutter-x-0 text-center mt-5 mb-5">
                            <div className="col-md-6 col-12">
                                <label htmlFor="" className="font-14 bolder row gutter-x-0 justify-content-center">INÍCIO</label> <br />
                                <Calendar disablePast={false} disableFuture={true} agendamentos={[]} setDateObject={setStartDate} />
                                {displayError===true && <p>The start date cannot be greater than the end date</p>}
                            </div>
                            <div className="col-md-6 col-12 me-auto">
                                <label htmlFor="" className="font-14 bolder row gutter-x-0 justify-content-center mt-md-0 mt-5">FIM</label> <br />
                                <Calendar disablePast={false} disableFuture={true} agendamentos={[]} setDateObject={setFinalDate} />
                            </div>
                        </div>
                        <div className="row gutter-x-0 mt-5">
                            <ActionBtn handler={handlePesquisa} value='pesquisar' label='PESQUISAR' addClass='w-25'/>
                        </div>
                        <div className="row gutter-x-0 mt-5">
                            <ActionBtn handler={handlePesquisa} value='limpar' label='LIMPAR SELEÇÃO' bg={'gray'} addClass='w-25 color-red'/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-12 mt-lg-0 mt-5 ms-lg-auto me-lg-0">
                    <Container tipoContainer="finalizados" lista={resultado} isEmpty={isEmpty}/>
                </div>

            </div>
        </div>
    )
}

export default TabFinalizados;