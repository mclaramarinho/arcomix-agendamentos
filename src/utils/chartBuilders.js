function barChartConfig (refX, dataY, title="", beginAtZero=true, xAxisLabel="", yAxisLabel="", legendPosition="bottom", legendText = ""){
    return {
        "type":"bar",
        "data": {
            "labels": refX.map(item => typeof(item) === "string" ? item.toUpperCase() : item),
            "datasets": [{
                "label": legendText,
                "data": dataY,
            }]
        },
        "options": {
            "title": {
                "display": true,
                "text": title
            },
            "scales": {
                "yAxes": [{
                    "scaleLabel": {
                        "display": yAxisLabel.length > 0 ? true : false,
                        "labelString": yAxisLabel
                    },
                    "ticks": {
                        "beginAtZero": beginAtZero
                    },
                }],
                "xAxes": [{
                    "scaleLabel": {
                        "display": xAxisLabel.length > 0 ? true : false,
                        "labelString": xAxisLabel
                    }
                }]
            },
            "legend": {
                "display": legendText.length > 0 ? true : false,
                "position": legendPosition,
            }
        }
    }
}

export {barChartConfig}