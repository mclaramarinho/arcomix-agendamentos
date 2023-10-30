function generateReport (list){
    sessionStorage.setItem("report", JSON.stringify(list))
    window.location=`${window.location.pathname}/relatorio`
}

export {generateReport}