import React from 'react'
import { useState } from 'react'
import './Login.css'
import 'boxicons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [username,setusername] = useState();
    const [password,setpassword] = useState();
    const navigate = useNavigate()

    const submit = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:3000/login",{username,password})
        .then(res=>{console.log(res)
            if(res.data=="login"){
                navigate("/Home",{state:{id:username}})
            }
        })
        .catch(err=>{console.log(err)})
    }

  return (
<div className="container">
            <div className="form-box login">
                <form onSubmit={submit}>
                    <h1>Login</h1>
                    
                    <div className="inputbox">
                        <input type="text" id="username" placeholder="User name" required onChange={(e)=>setusername(e.target.value)}/>
                        <box-icon type='solid' name='user-circle'></box-icon>
                    </div>
                    <div className="inputbox">
                        <input type="password" placeholder="Password" required onChange={(e)=>setpassword(e.target.value)}/>
                        <box-icon type='solid' name='lock-alt'></box-icon>
                    </div>
                    <button type="submit" className="btn" >Login</button><br></br>
                   
                </form> 
                <p>Did't have an account? <a href="/Register">Register here</a></p>
            </div>
            </div>
  )
}

export default Login