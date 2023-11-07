import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import ReportTemplate from "../components/ReportTemplate";
import { useParams } from "react-router-dom";
import RelatorioFinal from "../components/RelatorioFinal";

function Relatorio(){
    const path = window.location.pathname;
    let { tipoRelatorio } = useParams()
    if(!path.includes('relatorio-geral')){
        
        let list = JSON.parse(sessionStorage.getItem("report"))
        return (
            <PDFViewer width={"100%"} height={window.innerHeight}>
                <ReportTemplate list={list} tipoRelatorio={tipoRelatorio}/>
            </PDFViewer>
        )
    }else{
        return (
            <PDFViewer width={"100%"} height={window.innerHeight}>
                <RelatorioFinal />
            </PDFViewer>
        )
    }
    
    
    
    
}

export default Relatorio