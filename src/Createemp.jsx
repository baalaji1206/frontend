import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'  

function Createemp() {
    const location = useLocation();
    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [mobile,setphoneno] = useState('')
    const [desig,setdesig] = useState('')
    const [gender,setgender] = useState('')
    const [course,setcourse] = useState([])
    const [img,setimg] = useState(null)
    const navigate = useNavigate()
    const id = location.state?.id;

    const handleCourseChange = (e) => {
        const value = e.target.value;
        setcourse((prev) =>
            prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
        );
    };

    const submit = (e)=>{
        e.preventDefault();
        const newemp = new FormData();
        newemp.append('name',name);
        newemp.append('email',email);
        newemp.append('mobile',mobile);
        newemp.append('desig',desig);
        newemp.append('gender',gender);
        newemp.append('course',course.join(','));
        newemp.append('img',img);

        axios.post('http://localhost:3000/addemployee', newemp)
        .then(response => {
            navigate("/Employeelist")
            console.log(response)
            alert("Sucessfully added")})
           

        .catch(err =>{
            console.log(err);
        })
    }

    function logout(){
        localStorage.removeItem('authToken');
        window.history.replaceState(null, '', '/');
        navigate('/');
    }
  return (
<div className='containers'>
        <nav className='navbar'>
            <div className='head'>
                <h1>Employee</h1>
            </div>
                <ul className='optionnav'>
                    <li><a href='/Home'>Home</a></li>
                    <li><a href='/Employeelist'>Employee list</a></li>
                </ul> 
                <h1 className='username'>{id} </h1>
            <button type='button' className='log' onClick={logout}>Logout</button>
        </nav>
        <body>
        <div className='createcontainer'>
            <h1>Create Employee</h1>
            <form className='formlayout' onSubmit={submit}>
                <div className='textbox'>
                    <label className='la'>Name: </label>
                    <input type='text' name='name' placeholder='Enter your name' onChange={(e)=>setname(e.target.value)}/>
                </div>
                <div className='textbox'>
                    <label className='la'>Email Id: </label>
                    <input type='email' name='email' placeholder='Enter your mail id' onChange={(e)=>setemail(e.target.value)}/>
                </div>
                <div className='textbox'>
                    <label className='la'>Phone number: </label>
                    <input type='number' name='phoneno' placeholder='Enter your phone no' onChange={(e)=>setphoneno(e.target.value)}/>
                </div>
                <div className='desig'>
                    <label className='la'>Designation: </label>
                    <select id='desg' name='desg' onChange={(e)=>setdesig(e.target.value)}>
                        <option value=''>Select</option>
                        <option value='HR' >HR</option>
                        <option value='Manager' >Manager</option>
                        <option value='Sales' >Sales</option>
                    </select>
                </div>
                <div className='radio'>
                    <label className='la'>Gender: </label>
                    <input type='radio' name='gender' value='male' onChange={(e)=>setgender(e.target.value)}/>Male
                    <input type='radio' name='gender' value='female' onChange={(e)=>setgender(e.target.value)}/>Female
                </div>
                <div className='check'>
                    <label className='la'>Course :</label>
                    <input type='checkbox' id='MCA' name='MCA' value='MCA' onChange={handleCourseChange}></input>
                    <label for='MCA'>MCA</label>
                    <input type='checkbox' id='BCA' name='BCA' value='BCA' onChange={handleCourseChange}></input>
                    <label for='BCA'>BCA</label>
                    <input type='checkbox' id='BSC' name='BSC' value='BSC' onChange={handleCourseChange}></input>
                    <label for='BSC'>BSC</label>
                </div>
                <div className='profile'>
                    <label className='la'>Profile Image :</label>
                    <input type='file' name='image' onChange={(e)=>setimg(e.target.files[0])} ></input>
                </div>
                <button className='sub' type='submit' name='submit'>Submit</button>
            </form>
        </div>
        </body>
    </div>
  )
}

export default Createemp