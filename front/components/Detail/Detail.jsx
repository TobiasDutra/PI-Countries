import React from "react"
import { Link, useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetail } from "../../redux/actions"
import { useEffect } from "react"
import style from './Detail.module.css'

export default function Detail() {
    const { id } = useParams()
    console.log('id',id);
    const dispatch = useDispatch()
    const myCountry = useSelector((state) => state.detail)

    useEffect(()=>{
        dispatch(getDetail(id))
    },[dispatch])

    return (
    <section className={style.section}>
        {/* <p onClick={() => console.log(myCountry)}>CLICK</p> */}
        {
            myCountry ? (
            <div className={style.cont}>
                <h2>ID: {myCountry.id}</h2>
                <h3 className={style.name}> {myCountry.name}</h3>
                <img src={myCountry.flagImage? myCountry.flagImage : myCountry.image} alt="https://img.freepik.com/free-vector/flag-icon-collection_1368-2669.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711065600&semt=ais" />
                <h2>Continente: {myCountry.continent}</h2>
                <p>Capital: {myCountry.capital}</p>
                <p>Subregion: {myCountry.subregion? myCountry.subregion : "No tengo subregion"}</p>
                <p>Area: {myCountry.area}</p>
                <p>Poblacion: {myCountry.population}</p>
                <h3>Actividades:
                        { myCountry.Activities && myCountry.Activities.length > 0 ? 
                            (
                            <div className={style.contActivities}>
                                { myCountry.Activities?.map((el) => (
                                    <div className={style.activity} key={el.id}>
                                        <h3>{el.name}</h3>
                                    </div>))}
                            </div>
                            ) : ' No tiene actividades'}
                    
                </h3>
                <Link to="/home">
                    <button>Volver</button>
                </Link> 
            </div>) : (
                <p>Loading...</p>
            )
        }
    </section> 
)
}