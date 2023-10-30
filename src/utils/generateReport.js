function generateReport (list, type){
    sessionStorage.setItem("report", JSON.stringify(list))
    window.location=`${window.location.pathname}/relatorio/${type}`
}

export {generateReport}