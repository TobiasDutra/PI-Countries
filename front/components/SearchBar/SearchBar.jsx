import React from "react"
import {useState} from "react"
import { useDispatch } from "react-redux"
import { getNameContinents } from "../../redux/actions"
import style from './SearchBar.module.css'
import { useNavigate } from "react-router-dom"

export default function SearchBar ({setCurrentPage}) {
    const dispatch = useDispatch()
    const [name,setName] = useState("")
    const navigate = useNavigate()

    
    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name);
    } 

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameContinents(name))
        setName("")
        navigate("/home")
        setCurrentPage(1)
    } 

    return (
        <div className={style.content}>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" placeholder ="Buscar..." onChange={(e)=> handleInputChange(e)} value={name} className={style.input}/>
            </form>
            
        </div>
    )
}