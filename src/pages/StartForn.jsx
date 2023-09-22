import React, { useState } from "react";
import { useParams } from "react-router-dom";

function StartForn (){
    let {id} = useParams();
    return(
        <h1>{id}</h1>
    )
}

export default StartForn;