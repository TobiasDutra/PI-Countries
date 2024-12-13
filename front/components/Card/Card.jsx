import React from "react"
import style from "./Card.module.css"

export default function Card ({name, flagImage, continent}) {
    console.log("flagImage", flagImage);
    console.log("continent", continent);
    console.log("name", name)
    return (
        <div className={style.cont}> 
            <h3 className={style.name}>{name}</h3> 
            <h5 className={style.continent}>{continent}</h5>
            <img className={style.imagen} src={flagImage} alt="img not found"/>
        </div>
    )
}