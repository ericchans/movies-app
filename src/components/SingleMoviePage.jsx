import { useParams,Link } from "react-router-dom"
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import './SingleMoviePage.css'
import { LoginContext } from "../context/LoginContext"
import AdjustQuantity from "./AdjustQuantity"


const API_key = '3eb95cbe1f9cab5f12e92c73d02b04db'
const url = 'https://api.themoviedb.org/3/movie'



const SingleMoviePage = ({cart,editCart,addtoCartHandler}) => {
    const [movieData,setMovieData]=useState([])
    const { id } = useParams()
    const entireURL = `${url}/${id}?api_key=${API_key}`
    const [isLoggedIn] = useContext(LoginContext)

    const hook = () =>{
        axios.get(entireURL).then(response=>{
            setMovieData(response.data)
        })
    }
    useEffect(hook,[entireURL])

    const onAddCart = () =>{
        addtoCartHandler(movieData)
    }

    

    if (!id){
        return (
            <div>
                <h2>Nothing to see here!</h2>
                <p>
                    <Link to="/">Go to the home page</Link>
                </p>
            </div>
        )
    }


    const releaseDate = new Date(movieData.release_date)
    const day = releaseDate.getDay()
    const year = releaseDate.getFullYear()
    const monthlyCalendar={
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
        
    }
    const month = monthlyCalendar[releaseDate.getMonth()]
    const movieReleaseDate= `${month} ${day}, ${year}`
    const tempTime = movieData.runtime
    const hours = Math.floor(tempTime/60)
    const minutes = tempTime % 60
    const run_time = `${hours}hr ${minutes}min`
    const imageSource = movieData.poster_path ? `http://image.tmdb.org/t/p/w500${movieData.poster_path}` : null

    
    return(

        <div className="single-movie">
            <img className="image-wrap" src={imageSource} alt={movieData.id} />
            <h1> {movieData.title} </h1>
            <p> {movieData.overview}</p>
            <p> {movieReleaseDate} </p>
            <p> Budget: ${movieData.budget} </p>
            <p> Total Revenue: ${movieData.revenue} </p>
            <p> Rating: {movieData.vote_average}</p>
            <p> Total Runtime: {run_time}</p>
            {isLoggedIn &&
            (cart.some(m => m.id===movieData.id) ? <AdjustQuantity cart={cart} movie={movieData} editCart={editCart}/> : <button onClick={onAddCart}>Add to Cart</button>)}
        </div>
    )
    
    
    
    
    

}

export default SingleMoviePage