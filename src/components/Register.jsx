import {useState,useEffect} from 'react'
import axios from 'axios';

const Register = () =>{
    const [emailRegister,setEmailRegister] = useState('')
    const [usernameRegister,setUsernameRegister] = useState('')
    const [passwordRegister,setPasswordRegister] = useState('')
    const [users,setUsers] = useState([])
    
    useEffect(()=>{
        axios.get('http://localhost:3001/users').then(response=>{
            setUsers(response.data)
        })
    },[])


    const handleEmailRegister =(event) =>{
        setEmailRegister(event.target.value)
    }

    const handleUsernameRegister =(event) =>{
        setUsernameRegister(event.target.value)
    }

    const handlePasswordRegister =(event) =>{
        setPasswordRegister(event.target.value)
    }
    
    const handleRegisterSubmit = (event) =>{
        event.preventDefault()
        
        if (!emailRegister.includes('@')){
            window.alert('Email is not valid')
            return
        }

        if (users.some(u => u.email === emailRegister) || users.some(u=>u.username===usernameRegister)){
            window.alert('email or username already in use')
            return
        }

        const userObject = {
            id : users.length+1,
            username: usernameRegister,
            password: passwordRegister,
            email: emailRegister
        }

        axios.post('http://localhost:3001/users',userObject).then(response =>{
            setUsers(users.concat(response.data))
            
        })
        setEmailRegister('')
        setPasswordRegister('')
        setUsernameRegister('')
    }
    return (
        <form onSubmit={handleRegisterSubmit}>
            <p>Register</p>
            <p>Email   : <input value={emailRegister} onChange={handleEmailRegister}></input> </p>
            <p>Username: <input value={usernameRegister} onChange={handleUsernameRegister}/> </p>
            <p>Password:    <input value={passwordRegister} onChange={handlePasswordRegister}/> </p>
            <button type="submit">submit</button>
        </form>
)
}


export default Register