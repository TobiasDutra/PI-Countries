import React from "react"
import { Link } from "react-router-dom"
import style from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={style.greet}>
            <div className={style.greett}>
                <h4>Bienvenidos a mi PI de paises</h4>
                <Link to="/home"><button>Ingresar</button></Link >
            </div>
        </div>
    )
}