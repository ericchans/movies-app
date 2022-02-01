import { Typography } from '@mui/material'
import { AppBar,Toolbar } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge';
import { Menu } from '@mui/material'
import ShowMenuItems from './ShowMenuItems'
import { useContext, useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import SignOut from './SignOut'

const NavBar = ({cart,clearCart,editCart}) =>{
    const [anchorEl,setAnchorEl] = useState(null)
    const [isLoggedIn] = useContext(LoginContext)
    
    const hook = () =>{
        if (isLoggedIn){
            clearCart()
        }
    }
    useEffect(hook,[isLoggedIn])


    const handleMenu = (event) =>{
		setAnchorEl(event.currentTarget)
	}

	const handleClose = ()=>{
		setAnchorEl(null)
	}

    return (
        <div>
            <AppBar position="static" className="navbar" >
                <Toolbar>
                    <Typography>
                        <Link to="/" className="homepage">
                            21 Movies 
                        </Link>
                    </Typography>
                    {!isLoggedIn && 
                    (
                        <div>
                            <Link to="/signin">Log in</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    )}
                    {isLoggedIn &&
                        <div>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-haspopup="true"
                                onClick={handleMenu}
                            >
                                <Badge badgeContent={cart.length} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                            <Menu 
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                            >
                                <ShowMenuItems cart={cart} callClearCart={clearCart} editCart={editCart}/>
                            </Menu>
                        </div>
                    }
                    {isLoggedIn &&
                        <SignOut/>
                    }
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </div>
    )
}

export default NavBar