import React from "react";
import { Document, Image, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import dayjs from "dayjs";
import logoNav from "../assets/logo-navbar.png";
import { getTempLoginInfo } from "../utils/tempLoginInfo";
import colaboradores from "../users/colaboradores";
import fornecedores from "../users/fornecedores";

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
    const tipoRelatorio = props.tipoRelatorio === "agendamentos" ? "Agendamentos" : props.tipoRelatorio === "solicitacoes" ? "Solicitações de Agendamento" : "Entregas Finalizadas";
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
            margin: 20,
        },
        image:{
            width: '25%',
            margin: '20 auto',
        },
        date:{
            fontSize: 16
        },
        details:{
            fontSize: 12
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
        <Document style={{fontFamily: "Helvetica"}}>
            <Page style={styles.page}>
                <Image src={logoNav} style={styles.image}/>
                <Text  style={[styles.header, {color: "#323234", fontFamily:"Helvetica-Bold"}]}>{tipoRelatorio}</Text>
                <View style={[styles.section, {color: "#323234"}]}>
                    {
                        list.map(item => {
                            return (
                                <View style={[styles.section, {border: '1px solid black', padding: 20}]} wrap={false}>
                                    <Text style={[styles.date, {color: "#323234", fontFamily:"Helvetica-Bold"}]}>
                                        {dayjs(item.data).format("DD/MM/YYYY")} - {dayjs(item.data).format("HH:mm")} | {item.id_fornecedor.toUpperCase()}
                                    </Text>
                                    <Text style={[styles.details, {paddingBottom: 12, paddingTop: 12}]}>
                                        <Text style={{fontFamily: "Helvetica-Bold"}}>ID AGENDAMENTO:   </Text>#{item.id_agendamento}
                                    </Text>
                                    <Text style={[styles.details, {paddingBottom: 12}]}>
                                        <Text style={{fontFamily: "Helvetica-Bold"}}>TIPO DE CARGA:   </Text>{item.tipo_carga}  |   <Text style={{fontFamily: "Helvetica-Bold"}}>DESCARGA:   </Text>{item.tipo_descarga}</Text>
                                    <Text style={styles.details}>
                                        <Text style={{fontFamily: "Helvetica-Bold"}}>Observações:   </Text> {item.observacoes}
                                    </Text>                               
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