import './App.css'
import React,{useState} from 'react'
import Movies from './components/Movies'
import NavBar from './components/NavBar'
import SingleMoviePage from './components/SingleMoviePage'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { LoginProvider } from './context/LoginContext'
import HomePage from './components/HomePage'
import SignInPage from './components/SignInPage'
import Register from './components/Register'

function App() {
	const [cart,setCart] = useState([])


	const addtoCartHandler = (movie) =>{
		const current = cart.find( (m)=> m.id === movie.id)
		if (current !== undefined){
			const newAmount = current.amount + 1
			const newMovie = {
				id: movie.id,
				amount : newAmount,
				movie : current.movie
			}
			const newArray = cart.map(m => newMovie.id === m.id ? newMovie : m)
			setCart(newArray)
		}
		else{
			const newMovie = {
				id: movie.id,
				amount: 1,
				movie : movie
			}
			setCart(cart.concat(newMovie))
		}
	}

	const deleteFromCart = (id) =>{
		const newCart = cart.filter( cartItem => cartItem.id !== id )
		setCart(newCart)
	}

	const editCart = (id,method)=>{
		const current = cart.find((m => m.id === id))
		const newAmount = current.amount + method
		if (newAmount === 0){
			deleteFromCart(id)
			return
		}
		const newCartItem = {
			id : id,
			amount : newAmount,
			movie : current.movie
		}
		const newArray = cart.map(m=> m.id === newCartItem.id ? newCartItem:m)
		setCart(newArray)
		

	}

	const clearCart = () =>{
		setCart([])
	}
    return (
		<LoginProvider >
			<BrowserRouter>
				<NavBar cart = {cart} clearCart={clearCart} editCart={editCart}/>
				<Routes>
					<Route path="/" element={<HomePage/>}/>
					<Route path="/signin" element={<SignInPage/>}/>
					<Route path="/register" element={<Register/>}/>
					<Route path="/listofmovies" element={<Movies addtoCartHandler={addtoCartHandler} />}/>
					<Route path="/movie/:id" element={<SingleMoviePage cart={cart} editCart={editCart} addtoCartHandler={addtoCartHandler}/>}/>
				</Routes>
			</BrowserRouter>
		</LoginProvider>
    )

}

/*
things to add:
checkout
	-address
	-card
	-confirmation
	-save to db
*/

export default App;
