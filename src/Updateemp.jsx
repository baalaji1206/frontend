import { useState, useEffect } from 'react';
import React from 'react'
import { useLocation , useNavigate } from 'react-router-dom';
import axios from 'axios';

function Updateemp() {

    const location = useLocation();
    const { employee } = location.state || {};
    const navigate = useNavigate()
    const id = location.state?.id;
  const [formData, setFormData] = useState({
    name: employee.name || '',
    email: employee.email || '',
    phoneno: employee.mobile || '',
    desig: employee.desig || '',
    gender: employee.gender || '',
    course: employee.course || [],
    profileimg: ''
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        mobile: employee.mobile,
        desig: employee.desig,
        gender: employee.gender,
        course: Array.isArray(employee.course) ? employee.course : employee.course.split(','),
        profileimg: employee.profileimg
      });
    }
  }, [employee]);

  const updateemp = async (e)=>{
    e.preventDefault()
    try{
        axios.put(`http://localhost:3000/updateemp/${employee.id}`,formData);
        navigate('/Employeelist')
    }catch(err){
        console.log(err)
    }
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
                  <li><a href='#'>Home</a></li>
                  <li><a href='#'>Employee list</a></li>
              </ul> 
              <h1 className='username'>{id} </h1>
          <button type='button' className='log' onClick={logout}>Logout</button>
      </nav>
      <body>
      <div className='createcontainer'>
          <h1>Update Employee</h1>
          <form className='formlayout' onSubmit={updateemp}>
              <div className='textbox'>
                  <label className='la'>Name: </label>
                  <input type='text' name='name' placeholder='Enter your name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}/>
              </div>
              <div className='textbox'>
                  <label className='la'>Email Id: </label>
                  <input type='email' name='email' placeholder='Enter your mail id' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
              </div>
              <div className='textbox'>
                  <label className='la'>Phone number: </label>
                  <input type='text' name='phoneno' placeholder='Enter your phone no'  value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}/>
              </div>
              <div className='desig'>
                  <label className='la'>Designation: </label>
                  <select id='desg' name='desg' value={formData.desig} onChange={(e) => setFormData({ ...formData, desig: e.target.value })}>
                      <option value=''>Select</option>
                      <option value='HR'>HR</option>
                      <option value='Manager'>Manager</option>
                      <option value='Sales'>Sales</option>
                  </select>
              </div>
              <div className='radio'>
                  <label className='la'>Gender: </label>
                  <input type='radio' name='gender' value='male' checked={formData.gender === 'male'} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}/>Male
                  <input type='radio' name='gender' value='female' checked={formData.gender === 'female'} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}/>Female
              </div>
              <div className='check'>
                  <label className='la'>Course :</label>
                  <input type='checkbox' id='MCA' name='MCA' value='MCA' checked={formData.course.includes('MCA')}
                onChange={(e) => {
                  const updatedCourses = e.target.checked
                    ? [...formData.course, 'MCA']
                    : formData.course.filter(course => course !== 'MCA');
                  setFormData({ ...formData, course: updatedCourses });
                }}></input>
                  <label for='MCA'>MCA</label>
                  <input type='checkbox' id='BCA' name='BCA' value='BCA' checked={formData.course.includes('BCA')}
                onChange={(e) => {
                  const updatedCourses = e.target.checked
                    ? [...formData.course, 'BCA']
                    : formData.course.filter(course => course !== 'BCA');
                  setFormData({ ...formData, course: updatedCourses });
                }}></input>
                  <label for='BCA'>BCA</label>
                  <input type='checkbox' id='BSC' name='BSC' value='BSC' checked={formData.course.includes('BSC')}
                onChange={(e) => {
                  const updatedCourses = e.target.checked
                    ? [...formData.course, 'BSC']
                    : formData.course.filter(course => course !== 'BSC');
                  setFormData({ ...formData, course: updatedCourses });
                }}></input>
                  <label for='BSC'>BSC</label>
              </div>
              <div className='profile'>
                  <label className='la'>Profile Image :</label>
                  <input type='file' name='image' ></input>
              </div>
              <button className='sub' type='submit' name='submit' >Update</button>
          </form>
      </div>
      </body>
  </div>
)
}

export default Updateemp