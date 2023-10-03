import React from "react";

function BackBtn (){
    return(
            <div className="btn btn-lg mt-5 ms-5 back-btn bold no-outline" onMouseUp={() => window.history.back()}>
                <i class="fa-solid fa-chevron-left"/> Voltar
            </div>
    )
}

export default BackBtn;