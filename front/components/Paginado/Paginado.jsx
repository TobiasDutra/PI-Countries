import React from "react"
import style from "./Paginado.module.css"

export default function Paginado ({continentsPerPage, allContinents, paginado, currentPage, setCurrentPage}){
    console.log('currentPage',currentPage);
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allContinents/continentsPerPage); i++) {
        pageNumbers.push(i) 
    } 

    const handlePrev = () => {
        setCurrentPage(currentPage - 1)
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1)
    }

    return(
        <nav className="container">
            <ul className={style.ul}>

                {currentPage !== 1 ? <button onClick={() => handlePrev()} className={style.flechas}>Prev</button> : null}

                { pageNumbers &&
                pageNumbers.map(number => (
                    <li 
                        key={number} 
                        className={number === currentPage ? `${style.activado}` : `${style.desactivado}`} 
                        onClick={() => paginado(number)}
                    >
                        <a className={style.texto}>{number}</a>
                    </li>
                    ))} 

                {currentPage !== pageNumbers.length ? <button onClick={() => handleNext() } className={style.flechas}>Next</button> : null}

            </ul>
        </nav>  
    ) 
}