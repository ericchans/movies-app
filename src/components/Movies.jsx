import Grid from '@mui/material/Grid'
import Movie from './Movie'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Movies.css'
import FilterShownMovies from './FilterShownMovies';
import { useSearchParams} from 'react-router-dom';
import axios from 'axios'
import {useEffect,useState} from 'react'

const Movies = ({addtoCartHandler}) =>{
    const [db,setDB] = useState([])
    const [searchParams,setSearchParams] = useSearchParams()
    const order = searchParams.get('order')
    const page = searchParams.get('page')
	let fullURL = 'https://api.themoviedb.org/3/movie/'+order+'?api_key=3eb95cbe1f9cab5f12e92c73d02b04db&language=en-US&page='+page
	

    const hook = () =>{
        axios.get(fullURL).then(response=>{
            setDB(response.data.results)
        })
    }
    useEffect(hook,[fullURL])
    
    const handlePageChange = (event,value) =>{
        console.log(value)
        setSearchParams({order: order,page: value})
    }

    return(
        <div>
            <FilterShownMovies  />
            <Grid container rowSpacing={3} columnSpacing={1}  justify="center" className="grid_layout">
                {db.map(movie =>{
                    return(
                        <Movie movie={movie} addtoCartHandler={addtoCartHandler} key = {movie.id}/>
                    )
                })}
            </Grid>
            <Stack className = "page_layout" spacing={3}>
                <Pagination count={100} page={parseInt(page,10)} color="primary"  onChange={handlePageChange}/>
            </Stack>  
        </div>
    )
}

export default Movies

/*
<Pagination count={100} page={1} color="primary" onChange={passPage} />
renderItem={(item)=>(
                    <PaginationItem component={Link} to={`/listofmovies?order=${order}&page=${item.page}`} {...item} />
                )}/>
*/