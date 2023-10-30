import React from "react";
import ReactPDF, { Canvas, Document, Font, G, Image, Page, Polygon, StyleSheet, Svg, Text, View} from "@react-pdf/renderer";
import dayjs from "dayjs";
import logoNav from "../assets/logo-navbar.png";
import { getTempLoginInfo } from "../utils/tempLoginInfo";
import colaboradores from "../users/colaboradores";
import fornecedores from "../users/fornecedores";
import { useParams } from "react-router-dom";
function ReportTemplate(props){
    const authInfo = getTempLoginInfo();
    let username = "";
    if(authInfo.actor === "Colaborador"){
        username = colaboradores.filter(item => item.matricula === authInfo.id)[0]
        username = username.informacoes.nome
    }else{
        username = fornecedores.filter(item => item.id_fornecedor === authInfo.id)[0]
        username = username.informacoesLegais[0]
    }

    const list = props.list;

    const styles = StyleSheet.create({
        page: {
            padding: "5% 0" 
        },
        header:{
            fontSize: 30,
            margin: '0 auto'
        },
        subtitle:{
            fontSize: 12,
            margin: '0 auto'
        },
        section:{
            margin: 20
        },
        image:{
            width: '25%',
            margin: '20 auto',
        },
        date:{
            fontSize: 16
        },
        details:{
            fontSize: 14
        },
        checkbox:{
            width: 10,
            height: 10
        },
        footer:{
            fontSize: 12,
            position: "absolute",
            bottom: 0,
            left: '25vw',
            right: '25vw',
            transform: "translateX(25%)"
        }
    })

    
    return (
        <Document>
            <Page style={styles.page}>
                <Image src={logoNav} style={styles.image}/>
                <Text style={styles.header}>Relatório</Text>
                <Text style={styles.subtitle}></Text>
                <View style={styles.section}>
                    {
                        list.map(item => {
                            return (
                                <View style={styles.section} wrap={false}>
                                    <Text style={styles.date}>{dayjs(item.data).format("DD/MM/YYYY")} - {dayjs(item.data).format("HH:mm")} | {item.id_fornecedor.toUpperCase()}</Text>
                                    <Text style={styles.details}>#{item.id_agendamento}</Text>
                                    <Text style={styles.details}>{item.tipo_carga} | {item.tipo_descarga}</Text>
                                    <Text style={styles.details}>Observações: {item.observacoes}</Text>                               
                                </View>
                            )
                        }) 
                    }
                </View>
                
                <Text textAnchor="middle" style={styles.footer} fixed>Gerado por: {username} | {dayjs().format("DD/MM/YYYY")} às {dayjs().format("HH:mm")}</Text>
            </Page>
            
        </Document>
    )
}

export default ReportTemplate