import './FilterShownMovies.css'
import { useSearchParams } from 'react-router-dom'


const FilterShownMovies = () =>{
    const [searchParams,setSearchParams] = useSearchParams()
    const order = searchParams.get('order')
    const page = searchParams.get('page')

    const callThis = (event) =>{
        setSearchParams({order:event.target.value,page:page})
    }

    return(
        <div >
            <label>Filter: </label>
            <select value={order} onChange={callThis}>
                <option value="popular">Popular</option>
                <option value="top_rated">Top Rated</option>
            </select>
        </div>
    )
}

export default FilterShownMovies