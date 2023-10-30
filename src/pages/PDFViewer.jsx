import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import ReportTemplate from "../components/ReportTemplate";

function Relatorio(){
    const list = JSON.parse(sessionStorage.getItem("report"))
    return (
        <PDFViewer width={"100%"} height={window.innerHeight}>
            <ReportTemplate list={list}/>
        </PDFViewer>
    )
}

export default Relatorio