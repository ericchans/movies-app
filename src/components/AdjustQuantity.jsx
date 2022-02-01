

const AdjustQuantity = ({cart,movie,editCart}) =>{
    
    const amount = cart.find(a => a.id === movie.id).amount

    const handleSubtract = () =>{
        editCart(movie.id,-1)
    }
    const handleAdd= () =>{
        editCart(movie.id,1)
    }
    
    return(
        <div>
            <button onClick={handleSubtract}> - </button>
             {amount} 
            <button onClick={handleAdd}> + </button>
        </div>
    )
}

export default AdjustQuantity