import React, {useState,useEffect} from "react"
import {Link, useNavigate, } from "react-router-dom"
import {postActivity,getContinents} from "../../redux/actions/index"
import { useDispatch, useSelector } from "react-redux"
import style from './ActivityCreate.module.css'

export default function ActivityCreate () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const countries = useSelector((state) => state.continents)

    const [errors,setErrors] = useState({
        // name:"Missing name",
        // countries:[]
    })

    const [input,setInput] = useState({
        name: "",
        difficulty:"",
        duration:"",
        season:"",
        countries:[]
    })

    useEffect(() => {
        dispatch(getContinents())
    }, [])


    function validate(input){
        let errors = {}
            if(!input.name){
                errors.name = "Missing name"
            }
            if(input.name.search("[0-9]") !== -1){
                errors.name = "The name must not contain numbers"
            }
            if(countries.find(c => c.name.toLowerCase() === input.name.toLowerCase())){
                errors.name = ("Name cannot be repeated")
            }
            if(!input.difficulty){
                errors.difficulty = "Required Field"
            }
            if(input.difficulty < 1 || input.difficulty > 5 )
                errors.difficulty = "La dificultad debe ser del 1 al 5"
            
            if(!input.duration){
                errors.duration = "Required Field"
            }
            if(!input.season){
                errors.season = "Required Field"
            }
            if(input.countries.length === 0){
                errors.countries = "Required Field"
            }
            console.log('errors',errors);
            return errors
        }


    function isAvailable() {
        if(errors.name || errors.difficulty || errors.duration || errors.season || errors.countries){
            return true
        }
        if(input.name.length < 1){
            return true
        }
        console.log('input.name',input.name);
        console.log('input.name.length ',input.name.length );
        return false 
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value 
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input);
        console.log(countries);
        console.log("ERRORESSSSS",errors);
    }

    function handleSelect(e){
        setInput({
            ...input,
            countries : [...input.countries, e.target.value ]
        })
        console.log(input);
        setErrors(validate({
            ...input,
            countries: [...input.countries, e.target.value],
        }))
    }

    function handleSubmit(e){
        e.preventDefault(e)
        console.log(input);
        dispatch(postActivity(input))
        alert("Activity creada")
        setInput({
        name: "",
        difficulty:"",
        duration:"",
        season:"",
        countries:[],
        })
        navigate("/home")
    }

    function handleDelete(el){
        setInput({
            ...input,
            countries : input.countries.filter( c => c !== el)
        })
        console.log(input);
    }

    console.log(input.countries);
    
    return(
        <section className={style.section}>
            <div className={style.cont}>
                <Link to= "/home"><button className={style.back}>Volver</button></Link>
                <h1>Crea tu actividad</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label >Nombre: </label>
                        <input type="text" value={input.name} name="name" onChange={(e) =>handleChange(e)}/>
                        {/* {errors.length > 0 && errors.map(
                            <p className="error" > {errors.name}</p>
                            )} */}
                            {errors.name && (
                                <p className={style.error}>{errors.name}</p>
                            )}
                    </div>
                    <div>
                        <label >Dificultad: </label>
                        <input type="text" value={input.difficulty} name="difficulty" onChange={(e) =>handleChange(e)}/>
                        {errors.difficulty && (
                                <p className={style.error}>{errors.difficulty}</p>
                            )}
                    </div>
                    <div>
                        <label >Duracion: </label>
                        <input type="text" value={input.duration} name="duration" onChange={(e) =>handleChange(e)}/>
                        {errors.duration && (
                                <p className={style.error}>{errors.duration}</p>
                            )}
                    </div>
                    <div>
                        <label >Temporada: </label>
                        <input type="text" value={input.season} name="season" onChange={(e) =>handleChange(e)}/>
                        {errors.season && (
                                <p className={style.error}>{errors.season}</p>
                            )}
                    </div>
                    <div>
                        <label >Paises: </label>
                        <select defaultValue={"none"} onChange={(e) =>handleSelect(e)}>
                        <option value="none" disabled>Seleccionar pais...</option>
                        { countries && countries.map((c, index) => (
                            <option value={c.name} key={index}>{c.name}</option>
                            ))}
                        </select> 
                            {errors.countries && (
                                <p className={style.error}>{errors.countries}</p>
                            )}
                    </div>
                    <br />
                    <button disabled={isAvailable()} type="submit" className={style.create}>Crear actividad</button>
                </form>
                <div className={style.contCountries}>
                    {input.countries.length > 0 ? input.countries.map((el, btn) =>
                        <div className={style.divCoun} key={btn}>
                            <p>{el}</p>
                            <button className="botonX" onClick={()=> handleDelete(el)}> X</button>
                        </div>
                        ) : null
                    }
                </div>
            </div>
        </section>
    )
}