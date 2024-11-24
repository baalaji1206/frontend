import React, { useState , useEffect} from 'react';
import './Home.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Employeelist() {

    const location = useLocation();
    const navigate = useNavigate();
    const [emp,setemp] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const id = location.state && location.state?.id;

    function emplist(){
        navigate('/Employeelist',{state:{id:id}})
    }
    function home(){
        navigate('/Home',{state:{id:id}})
    }
    useEffect(()=>{
        const fetchdata = async()=>{
            try{
                const response = await axios.get("http://localhost:3000/fetchdata");
                setemp(response.data)
            }catch(error){
                console.log(error);
            }
        };
        fetchdata()
    },[])

    function create(){
        window.location.href = "/Createemp";
    }

    function handleedit(employee){
        navigate("/Updateemp",{state:{employee}});
    }

    const deleteemp = async(id)=>{
        try{
            const res = await fetch(`http://localhost:3000/deleteemp/${id}`,{method:'DELETE',});
            const data = await res.json();
            if(res.ok){
                alert(data.message);
                setemp(emp.filter(employee => employee.id !== id));
            }else{
                alert(`Error:${data.message}`);
            }
        }catch(err){
            console.log(err);
            alert('failed to delete employee')
        }
    };
    const filteredEmployees = emp.filter(employee => {
        const searchLower = searchQuery.toLowerCase(); 
        return (
            employee.name.toLowerCase().includes(searchLower) ||
            employee.email.toLowerCase().includes(searchLower) ||
            employee.createdate.toLowerCase().includes(searchLower)
        );
    });
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
                    <li><a href='#' onClick={home}>Home</a></li>
                    <li><a href='#' onClick={emplist}>Employee list</a></li>
                </ul> 
                <h1 className='username'>{id} -</h1>
            <button type='button' className='log' onClick={logout}>Logout</button>
        </nav>
        <div className='search-create'>
            <input type='text' placeholder='Search employee' value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
            <box-icon name='search-alt-2'></box-icon>
            <button className='addemp' onClick={create} >Create Employee</button>
        </div>
        <table className='table'>
            <thead>
                <tr className='tableheading'>
                    <th className='col'>Id</th>
                    <th className='col'>Image</th>
                    <th className='col'>Name</th>
                    <th className='col'>Email</th>
                    <th className='col'>Mobile no</th>
                    <th className='col'>Designation</th>
                    <th className='col'>Gender</th>
                    <th className='col'>Join date</th>
                    <th className='col'>Action</th>
                </tr>
            </thead>
            <tbody>
                {filteredEmployees.map((employee,index)=>{
                    return(
                        <tr className='details'>
                            <td>{employee.id}</td>
                            <td><img src={`http://localhost:3000/profileimf/${employee.profileimg}`}
                                     alt='not available'
                                     style={{width:"50px",height:"50px"}}/></td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.desig}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.createdate}</td>
                            <td>
                                <button className='editbtn' onClick={()=>handleedit(employee)} >Edit</button>
                                <button className='deletebtn' onClick={() => deleteemp(employee.id)} >Delete</button>
                            </td>

                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Employeelist