import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import ActionBtn from "../components/ActionBtn";
import Container from '../components/Container'
import { getList } from "../utils/listContent";
import {textFilter, textfilter} from "../utils/textFilter"
import dayjs from "dayjs";
import { generateReport } from "../utils/generateReport";
function TabFinalizados(){
    const [startDate, setStartDate] = useState();
    const [finalDate, setFinalDate] = useState();
    const [isEmpty, setIsEmpty] = useState(true);
    const [resultado, setResultado] = useState([]);
    const [all, setAll] = useState([]);
    const [displayError, setDisplayError] = useState(false)
    const [clear, setClear] = useState(false);
    const [emptySearch, setEmptySearch] = useState(false);
    const [filtro, setFiltro] = useState("")
    const [queryResult, setQueryResult] = useState([])

    useEffect(() =>{
        getList("finalizados").then((value) => setAll(value))
    }, [])

    useEffect(() => {
        setQueryResult(resultado)
    }, [resultado])

    function handlePesquisa(e){
        const action = e.target.value;
        
        if(action === "pesquisar"){
            if(startDate===undefined || finalDate === undefined){
                setEmptySearch(true);
                setDisplayError(false);
                return;
            }
            setEmptySearch(false)
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
                    if(date.month() === start.month()){ 
                        if(date.date() >= start.date()){ 
                            return item;
                        }
                    }else if(date.month() === end.month()){
                        if(date.date() <= end.date()){ 
                            return item;
                        }
                    }else if(date.month() > start.month() && date.month() < end.month()){ 
                        return item;
                    }
                }else if(date.year() > start.year() && date.year() < end.year()){
                    return item;
                }
            }).filter(item => item !== undefined)
            return setResultado(res), setIsEmpty(false)
        }else{
            return setClear(true), setStartDate(), setFinalDate(), setEmptySearch(false), setDisplayError(false);
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
                                <Calendar clear={clear} setClear={setClear} disablePast={false} disableFuture={true} agendamentos={[]} setDateObject={setStartDate} placeholder={'none'} />
                            </div>
                            <div className="col-md-6 col-12 me-auto">
                                <label htmlFor="" className="font-14 bolder row gutter-x-0 justify-content-center mt-md-0 mt-5">FIM</label> <br />
                                <Calendar clear={clear} setClear={setClear} disablePast={false} disableFuture={true} agendamentos={[]} setDateObject={setFinalDate} placeholder={'none'}/>
                            </div>
                            {emptySearch===true && <p className="color-red mt-5 font-12 bold">Você precisa preencher ambas as datas para pesquisar.</p>}
                            {displayError===true && <p className="color-red mt-5 font-12 bold">A data inicial não pode ser maior do que a data final.</p>}
                        </div>
                        <div className="row gutter-x-0 mt-5">
                            <ActionBtn handler={handlePesquisa} value='pesquisar' label='PESQUISAR' addClass='w-25'/>
                        </div>
                        <div className="row gutter-x-0 mt-5">
                            <ActionBtn handler={handlePesquisa} value='limpar' label='LIMPAR SELEÇÃO' bg={'gray'} color={"red"} addClass='w-25 color-red'/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-12 mt-lg-0 mt-5 ms-lg-auto me-lg-0">
                    <Container tipoContainer="finalizados" lista={queryResult} isEmpty={isEmpty}
                                filtro={filtro} handleFiltro={(e) => textFilter(e.target.value, setFiltro, setQueryResult, resultado)}
                                generateReport={()=>generateReport(queryResult, "finalizados")}
                    />
                </div>

            </div>
        </div>
    )
}

export default TabFinalizados;