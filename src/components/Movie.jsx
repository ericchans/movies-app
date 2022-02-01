import { Card } from "@mui/material" 
import { Grid } from "@mui/material"
import { CardMedia } from "@mui/material"
import CardContent from "@mui/material/CardContent"
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import './Movie.css'
import { AddShoppingCart } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"
import {
    Link
  } from "react-router-dom"
import { useContext } from "react"
import { LoginContext } from "../context/LoginContext"

const imageURL = 'http://image.tmdb.org/t/p/w500'

const styles = makeStyles({
       root:{
           padding:3,
           "&:last-child": {
            paddingBottom:0
       }
    }
})

const Movie = ({movie,addtoCartHandler}) =>{
    const [isLoggedIn] = useContext(LoginContext)
    const d = new Date(movie.release_date)
    const year = d.getFullYear()
    const classes=styles()
    
    const passMovieData = () =>{
        addtoCartHandler(movie)
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={2} >
            <Card className='movie-card'  sx={{height:'100%'}}>
                <Link to={`/movie/${movie.id}`}>
                    <CardMedia  component="img" image={imageURL+movie.poster_path} title={movie.title}/>
                    <CardContent className={classes.root} align='center' >
                        <Typography variant="caption">
                            {year}
                            <p className="paragraph">{movie.title} </p>
                        </Typography>
                    </CardContent>
                </Link>
                {isLoggedIn &&
                    <CardActions>
                        <IconButton aria-label="Add to Cart" onClick ={passMovieData}>
                            <AddShoppingCart />
                        </IconButton>
                    </CardActions>
                }
            </Card>
        </Grid>
    )
}



export default Movie