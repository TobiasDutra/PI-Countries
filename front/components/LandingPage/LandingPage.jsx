import React from "react"
import { Link } from "react-router-dom"
import style from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={style.greet}>
            <h2>Bienvenidos a mi PI de paises</h2>
            <Link to="/home"><button>Ingresar</button></Link >
        </div>
    )
}