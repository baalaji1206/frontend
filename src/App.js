// import {useState} from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Employeelist from './Employeelist'
import Createemp from './Createemp'
import Updateemp from './Updateemp'

function App() {
// const [count, setcount]= useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} ></Route>
          <Route path="/Home" element={<Home/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Employeelist" element={<Employeelist/>}/>
          <Route path="/Createemp" element={<Createemp/>}/>
          <Route path="/Updateemp" element={<Updateemp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
