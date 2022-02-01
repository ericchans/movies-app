import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

const SignOut = () =>{
    const [isLoggedIn,setIsLoggedIn] = useContext(LoginContext)
    const handleLogOut = () =>{
        setIsLoggedIn(false)
    }
    return (<button onClick={handleLogOut}>Log Out</button>)
}

export default SignOut