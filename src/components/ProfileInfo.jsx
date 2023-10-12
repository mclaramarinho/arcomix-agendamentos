import React from "react";

function ProfileInfo(props){
    return(
        <div className="row m-auto w-75">
            <h3 className="row m-auto mt-5 width-fit bold color-black">
                {props.label}
            </h3>
            <input type="text" readOnly
                    className="form-control text-center py-2 pt-3 font-12 color-gray bold"
                    value={props.value}
                    style={{borderRadius:"100vw"}}
            />
        </div>
    )
}

export default ProfileInfo;