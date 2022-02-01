import {useState,useEffect,useContext} from 'react'
import { LoginContext } from '../context/LoginContext';
import axios from 'axios';

const SignInPage = () =>{
    const [users,setUsers] = useState([])
    const [usernameLogin,setUsernameLogin] = useState('')
    const [passwordLogin,setPasswordLogin] = useState('')
    const [isLoggedIn,setIsLoggedIn] = useContext(LoginContext)
    
    useEffect(()=>{
        axios.get('http://localhost:3001/users').then(response=>{
            setUsers(response.data)
        })
    },[])

    console.log(users)
    const handleUsernameLogin = (event) =>{
        setUsernameLogin(event.target.value)
    }

    const handlePasswordLogin = (event) =>{
        setPasswordLogin(event.target.value)
    }

    const handleLoginSubmit = (event) =>{
        event.preventDefault()
        const person = users.filter(p=> p.username === usernameLogin)
        if (person.length === 0){
            window.alert("username or password is invalid")
            return
        }

        if (person[0].password !== passwordLogin){
            window.alert("username or password is invalid")
            return
        }

        setUsernameLogin('')
        setPasswordLogin('')

        setIsLoggedIn(true)
    }
    
    return (
        <div>
            <form onSubmit={handleLoginSubmit}>
                <p>Log in</p>
                <p>Username: <input value={usernameLogin} onChange={handleUsernameLogin}/> </p>
                <p>Password:    <input value={passwordLogin} onChange={handlePasswordLogin}/> </p>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default SignInPage