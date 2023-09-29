import React from "react";

function MenuTabs(props){
    const handleTabClick = () => props.onTabClick;

    return(
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a type="button" value="AGENDAR" class="nav-link active tab" aria-current="page" href="" onClick={handleTabClick()}>
                    <i class="fa-regular fa-pen-to-square"/> AGENDAR
                </a>
            </li>
            <li class="nav-item">
                <a type="button" value="AGENDAMENTOS" class="nav-link tab " aria-current="page" href="" onClick={handleTabClick()}>
                    <i class="fa-regular fa-calendar-days"/> AGENDAMENTOS
                </a> 
            </li>
            <li class="nav-item">
                <a type="button" class="nav-link tab" aria-current="page" href="" onClick={handleTabClick()}>
                    <i class="fa-solid fa-clock-rotate-left"/> FINALIZADOS
                </a>
            </li>
        </ul>
    )
}

export default MenuTabs;