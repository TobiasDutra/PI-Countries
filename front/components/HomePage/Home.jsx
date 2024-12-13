import React from "react"
import { useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { filterContinentsByContinent, filterCreated, getActivities, getContinents, orderByName, orderByPopulation,} from "../../redux/actions"
import {Link} from "react-router-dom"
import Card from "../Card/Card"
import Paginado from "../Paginado/Paginado"
import SearchBar from "../SearchBar/SearchBar"
import style from './Home.module.css'

export default function Home () {

    const dispatch = useDispatch() // le doy a dispatch la funcion useDispatch
    const allContinents  = useSelector((state) => state.continents) // allContinents contiene Continents del estado global
    const [order,setOrder] = useState("")
    const [currentPage,setCurrentPage] = useState(1) // cantidad de paginas que voy a tener y por cual voy a comenzar (1)
    const [continentsPerPage,setContinentsPerPage] = useState(10) // limite de countries por pagina (10)
    const indexOfLastContinent = currentPage * continentsPerPage // 5,11,17,23,29,35
    const indexOfFirstContinent = indexOfLastContinent - continentsPerPage // 0, 6, 12, 18, 24, 30
    const currentContinents = allContinents.slice(indexOfFirstContinent,indexOfLastContinent) // toma los cont segun la pagina
    

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    } // ayuda al renderizado cambiando el numero de pagina actual permitiendo la navegacion entre paginas
    
    const allActivities = useSelector(state => state.activities)
    const onlyValues = [...new Set(allActivities)]
    console.log(onlyValues);
    console.log(allActivities);

    useEffect(() => {
        dispatch(getContinents())
        dispatch(getActivities())
        console.log(allContinents);
        console.log();
    },[dispatch])
    // cambia el estado haciedo dispatch con getContinents

    function handleClick(e){
        e.preventDefault()
        dispatch(getContinents())
    } // Function para boton que carga los cont
    
    function handleFilterCreated (e) {
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    } // ???

    function handleFilterContinent(e) {
        dispatch(filterContinentsByContinent(e.target.value))
    } // handler de filtrado de continentes bien

    function handleSort (e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1) // cambio la pagina a la primera
        setOrder(`Ordenado ${e.target.value}`)
    } 
    
    function handleOrderByPopulation(e){
        e.preventDefault()
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <div className={style.contTop}>
                <SearchBar setCurrentPage={setCurrentPage} />
                <Link to="/activity">
                    <button className={style.createActividad}>
                        Crear actividad 
                    </button>
                </Link>  
                <Link to= "/"><button className={style.createActividad}>Volver al inicio</button></Link>
            </div>
            <div>
                <div className={style.contSelect}>

                    <select defaultValue={"none"} onChange={e => {handleSort(e)}} className={style.select}>
                        <option disabled value="none">Alfabeticamente</option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                    <select onChange={e => {handleFilterContinent(e)}} className={style.select}> 
                        <option value="All">Todos los continentes</option>
                        <option value="Africa">Africa</option>
                        <option value="North America">Norteamerica</option>
                        <option value="South America">Sudamerica</option>
                        <option value="Europe">Europa</option>
                        <option value="Asia">Asia</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctica">Antartida</option>
                    </select>
                    <select defaultValue={"none"} onChange={e => {handleOrderByPopulation(e)}} className={style.select}>
                        <option disabled value="none">Poblacion</option>
                        <option value="mayor">Mayor poblacion</option>
                        <option value="menor">Menor poblacion</option>
                    </select>
                    <select onChange={e => handleFilterCreated(e)} className={style.select}>
                        <option value="All">Todas las actividades</option>
                        {/* <option value="Created">Actividades creadas</option> */}
                        {onlyValues?.map((activity,index) => {
                        return(
                            <option className={style.option} value={activity.name} key={index}>
                                {activity.name}
                            </option>
                        )
                    })}
                    </select>
                    <button onClick={e=>{handleClick(e)}} className={style.reset}>
                        Volver a cargar todos los continentes
                    </button>
                </div>

                {/* <p onClick={() => console.log(currentContinents)}>CLICK</p> 
                 <p onClick={() => console.log(allContinents)}>CLICK</p> */}
            
            <div className={style.container}>
                {
                    currentContinents.map((c, index) => {
                        return(
                            <div key={index} className={style.card}>
                                <Link to={"/home/" + c.id}>
                                    <Card name={c.name} flagImage={c.flagImage ? c.flagImage : "https://www.worldatlas.com/r/w1200/upload/82/62/53/shutterstock-339881672.jpg"} continent={c.continent} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
                <Paginado continentsPerPage={continentsPerPage} allContinents={allContinents.length} paginado={paginado} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}