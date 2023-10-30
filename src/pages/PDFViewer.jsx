import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import ReportTemplate from "../components/ReportTemplate";
import { useParams } from "react-router-dom";

function Relatorio(){
    let { tipoRelatorio } = useParams()
    const list = JSON.parse(sessionStorage.getItem("report"))
    return (
        <PDFViewer width={"100%"} height={window.innerHeight}>
            <ReportTemplate list={list} tipoRelatorio={tipoRelatorio}/>
        </PDFViewer>
    )
}

export default Relatorio