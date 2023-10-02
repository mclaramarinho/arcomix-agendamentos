import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Container';
import { AccountCircle } from "@mui/icons-material";

import navLogo from './logo-navbar.png'

function Navbar(props){
    const handleProfile = () => props.handleProfile;
    return (
        <div>
            <AppBar className="sky-blue-bg position-relative">
                <Toolbar disableGutters={true} sx={{minWidth: "100%", paddingBottom:"1vh", display: "flex"}}>
                    <img style={{maxWidth: "20vh", marginLeft: "5vw", marginTop:"1vh"}} src={navLogo} alt=""/>
                    <button className="entrar-btn acessar-perfil bold btn btn-lg position-absolute end-0 top-50 translate-middle px-5 py-1 dark-blue-bg hide-sm"
                            onMouseUp={handleProfile()}
                    >
                            Acessar Perfil
                    </button>
                    <AccountCircle className="hide-lg  position-absolute end-0 top-50 translate-middle me-5 avatar-icon"
                                    onMouseUp={handleProfile()}
                    /> 
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;