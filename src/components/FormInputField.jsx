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
                <label htmlFor={id} className="bold font-14 p-0">{label}</label>
                <TextField 
                    disabled={disabled}
                    id={id}
                    defaultValue={props.value} 
                    variant="outlined"
                    size="small"
                />
            </div>
        )
    }else if(type === "paragraph"){
        return(
            <div className="row mb-4 gutter-x-0">
                <label htmlFor={id} className="bold font-14 p-0">{label}</label>
                <TextField
                    id={id}
                    placeholder="Escreva aqui"
                    multiline
                    maxRows={3}
                    value={props.value}
                    onChange={(e) => props.setValue(e.target.value)}
                />
            </div>
        )
    }else if(type === "autocomplete"){
        return(
            <div className="row mb-4 gutter-x-0">
                <label htmlFor={id} className="bold font-14 p-0 text-start">{label}</label>
                <Autocomplete 
                    id={id}
                    value={props.value}
                    onChange={(e, newValue) => {
                        props.setValue(newValue);
                    }}
                    options={props.options}
                    renderInput={(params) => <TextField {...params} />}

                    inputValue={props.value}
                    onInputChange={(e, newValue) => {
                        props.setValue(newValue);
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