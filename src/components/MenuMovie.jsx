

const imageLink="http://image.tmdb.org/t/p/w500"

const MenuMovie = ({movie,amount}) =>{

    return(
        <div >
            <img src={imageLink + movie.poster_path} width="20%" height="10%" alt={movie.title}/> {movie.title} {amount}
        </div>
    )
}

export default MenuMovie