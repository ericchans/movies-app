
import { MenuItem } from '@mui/material'
import MenuMovie from './MenuMovie'
import { Link } from 'react-router-dom'
import AdjustQuantity from './AdjustQuantity'
const ShowMenuItems = ({cart,callClearCart,editCart}) =>{
    const clearCart = ()=>{
        callClearCart()
    }
    
    return (
        <div>
            {cart.map( cartObject => {
                return (
                    <MenuItem key={cartObject.id}>
                        <Link to={`/movie/${cartObject.id}`}>
                            <MenuMovie movie={cartObject.movie} amount={cartObject.amount}/>
                        </Link>
                        <AdjustQuantity cart = {cart} movie={cartObject.movie} editCart={editCart}/>
                    </MenuItem>
                )
            })}  
            <button onClick={clearCart}>clear cart</button>   
        </div>
    )
}

export default ShowMenuItems