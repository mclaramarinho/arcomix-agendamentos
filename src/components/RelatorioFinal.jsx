import React from "react";
import dayjs from "dayjs";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import logoNav from "../assets/logo-navbar.png";
import { StyleSheet } from "@react-pdf/renderer";
import ChartJSImage from 'chart.js-image';
import { barChartConfig } from "../utils/chartBuilders";
import { all, empresas, qtdEmpresas, finalizados, entregues, naoEntregues, cancelados, empresasFinalizadas, percentEntregues, qtdDays} from "../utils/chartData";

function RelatorioFinal(){
                           
    // CHART -> Appointments per supplier
    const chartOne = ChartJSImage().chart(barChartConfig(empresas, qtdEmpresas, "Agendamentos por Fornecedor", true, "FORNCEDORES", "Qtd. Agendamentos"))
    const chartOneSrc = chartOne.toURL()
        
    // CHART -> Finalized appointments, cancelled appointments, delivered appointments, non-delivered appointments
    const chartTwo = ChartJSImage().chart(
        barChartConfig(["FINALIZADOS", "ENTREGUES", "NÃO ENTREGUES", "CANCELADOS"],[finalizados.length, entregues.length, naoEntregues.length, cancelados.length],"AGENDAMENTOS POR STATUS",true, "Qtd. Agendamentos")
    )
    const chartTwoSrc = chartTwo.toURL()
    
    // CHART -> Suppliers' delivery rate
    const chartThree = ChartJSImage().chart(
        barChartConfig(empresasFinalizadas, percentEntregues, "TAXA DE ENTREGA POR FORNECEDOR", true, "FORNECEDORES", "TAXA DE ENTREGA (%)")
    )
    const chartThreeSrc = chartThree.toURL()

    // CHART -> Appointments per day
    const chartFour = ChartJSImage().chart(
        barChartConfig(["Segunda", "Terça", "Quarta", "Quinta", "Sexta"], qtdDays.slice(1, 6), "AGENDAMENTOS POR DIA DA SEMANA", false, "DIAS DA SEMANA", "Qtd. Agendamentos")
    )
    const chartFourSrc = chartFour.toURL()


    const styles = StyleSheet.create({
        page: {
            padding: "5%",
            fontFamily: 'Helvetica',
        },
        header:{
            fontFamily: "Helvetica-Bold",
            fontSize: 30,
            margin: '0 auto'
        },
        subtitle:{
            fontSize: 12,
            margin: '0 auto'
        },
        section:{
            margin: 20,
            marginBottom: 40
        },
        image:{
            width: '25%',
            margin: '20 auto',
        },
        text:{
            margin: 20,
            fontSize: 14
        },
        chart:{
            width: '80%',
        },
        chartSub:{
            fontSize: 12,
            width: '80%',
        }
    }) 


    return (    
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Image src={logoNav} style={styles.image}/>
                    <Text style={styles.header}>Relatório Final</Text>
                    <Text style={styles.subtitle}>Relatório gerado em {dayjs().format('DD/MM/YYYY')}</Text>
                </View>
                <Text style={styles.text}><Text style={{fontFamily: "Helvetica-Bold"}}>Total de agendamentos:</Text> {all.length}</Text>
                <View style={styles.section}>
                    <Image src={chartOneSrc} style={styles.chart}/>
                    <Text style={styles.chartSub}>Número total de agendamentos realizados por fornecedor. Estão inclusos os agendamentos pendentes, finalizados e cancelados.</Text>
                </View>
                <View style={styles.section}>
                    <Image src={chartTwoSrc} style={styles.chart}/>
                    <Text style={styles.chartSub}>Total de agendamentos finalizados, entregues, não-entregues e cancelados.</Text>
                </View>
                <View style={styles.section}>
                    <Image src={chartThreeSrc} style={styles.chart}/>
                    <Text style={styles.chartSub}>Taxa de entregas concluídas por fornecedor. Calculado a partir da quantidade total de entregas finalizadas por fornecedor.</Text>
                    <Text style={[styles.chartSub,{fontFamily: 'Helvetica-Oblique', marginTop: 10}]}>(Qtd. de entregas concluídas x 100)/Qtd. de finalizadas</Text>
                </View>
                <View style={styles.section}>
                    {/* APPOINTMENTS PER DAY CHART */}
                    <Image src={chartFourSrc} style={styles.chart}/>
                    <Text style={styles.chartSub}>Total de agendamentos por dia da semana. Por não haverem horários disponíveis nos finais de semana, esses dias foram excluídos do gráfico.</Text>
                </View>
            </Page>
        </Document>
    )
}

export default RelatorioFinal;