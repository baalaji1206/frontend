import React from 'react'
import {useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setusername] = useState()
    const [password, setpassword] = useState()
    const navigate = useNavigate()
    const handlesubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3000/register',{username,password})
        .then(result=> {console.log(result)
            if(result.data==="go"){
                navigate("/")
            }})
        .catch(err=>console.log(err));
    }
  return (
    <div className='container'>
            <div className='form-box login'>
                <form onSubmit={handlesubmit}>
                    <h1>Register</h1>
                    
                    <div className='inputbox'>
                        <input type="text" placeholder="User name" required onChange={(e)=> setusername(e.target.value)}/>
                        <box-icon type='solid' name='user-circle'></box-icon>
                    </div>
                    <div className='inputbox'>
                        <input type="password" placeholder="Password" required onChange={(e)=> setpassword(e.target.value)}/>
                        <box-icon type='solid' name='lock-alt'></box-icon>
                    </div>
                    <button type="submit" className='btn' >Register</button><br></br>                    
                </form>
                <p>Already having an account? <a href="/">Login</a></p>
            </div>
            </div>
  )
}

export default Register