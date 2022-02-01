import { Link } from "react-router-dom"


const HomePage = () =>{
    return (
        <div>
            <h1>
                Welcome to 21 Movies
            </h1>
            <Link to={'/listofmovies?order=popular&page=1'}>
                <button >
                    See Movies
                </button>
            </Link>
        </div>
    )
}

export default HomePage