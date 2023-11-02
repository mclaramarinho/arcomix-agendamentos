function textFilter(query, inputValueSetter, resultListSetter, originalList){
    inputValueSetter(query)
    if(query !== null){
        query = query.toUpperCase();
        return resultListSetter(originalList.filter(item => item.id_fornecedor.toUpperCase().includes(query)))
    }else{
        return resultListSetter(originalList)
    }
}

export {textFilter}