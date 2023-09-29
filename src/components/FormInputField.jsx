import React from "react";
import { TextField, Autocomplete } from "@mui/material";
function FormInputField(props){
    const type = props.type;
    const id = props.id;
    const label = props.label;
    const disabled = props.disabled;
    if(type === "text"){
        return(
            <div className="row mb-4">
                <label htmlFor={id} style={{fontSize: 14, padding: 0}} className="subheader">{label}</label>
                <TextField 
                    disabled={disabled}
                    id={id}
                    defaultValue={`#${props.defaultValue}`} 
                    variant="outlined"
                    size="small"
                />
            </div>
        )
    }else if(type === "paragraph"){
        return(
            <div className="row mb-4">
                <label htmlFor={id} style={{fontSize: 14, padding: 0}} className="subheader">{label}</label>
                <TextField
                    id={id}
                    placeholder="Escreva aqui"
                    multiline
                    maxRows={3}
                />
            </div>
        )
    }else if(type === "autocomplete"){
        return(
            <div className="row mb-4">
                <label htmlFor={id} style={{fontSize: 14, padding: 0}} className="subheader">{label}</label>
                <Autocomplete 
                    id={id}
                    value={props.arrayV}
                    onChange={(e, newValue) => {
                        props.setArrayV(newValue);
                    }}
                    options={props.options}
                    renderInput={(params) => <TextField {...params} />}
                    inputValue={props.array}
                    onInputChange={(e, newValue) => {
                        props.setArray(newValue);
                    }}
                    size="small"
                    sx={{padding: 0}}
                    noOptionsText="Não encontrado"
                />
            </div>
        )
    }
}

export default FormInputField;