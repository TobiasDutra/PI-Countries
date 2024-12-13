import React from "react"
import { Link } from "react-router-dom"
import style from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={style.greet}>
            <div className={style.greett}>
                <h3>Bienvenidos a mi PI de paises</h3>
                <Link to="/home"><button>Ingresar</button></Link >
                <p>hola</p>
            </div>
        </div>
    )
}