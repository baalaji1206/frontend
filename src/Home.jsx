import React, { useState } from 'react'
 import './Home.css'
 import { useNavigate } from 'react-router-dom';
 import { useLocation } from 'react-router-dom';

function Home() {
    const location=useLocation();
    const navigate = useNavigate();
    const [id] = useState( location.state?.id);

    function emplist(){
        navigate('/Employeelist',{state:{id:id}})
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
                    <li><a href="#" onClick={emplist}>Employee list</a></li>
                </ul> 
                <h1 className='username'>{id} -</h1>
            <button type='button' className='log' onClick={logout}>Logout</button>
        </nav>
        <div className='welcome'>
            <p>Welcome Admin Panel</p>
        </div>
    </div>
  )
}

export default Home