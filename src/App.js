import './App.css';
import React ,{useEffect, useState} from 'react'

import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Nav from './components/Nav';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/note/NoteState'
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';

function App() {
  const [alert , setAlert] = useState(null);
  const showAlert = (msg,type)=>{
    setAlert({
      message : msg,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  const [data , setData] = useState();

  const fetchdecodeData = async ()=>{
    const response = await fetch("http://localhost:5000/api/auth/fetchUser",{
      method : "POST",
      headers : {
        "auth-token" : localStorage.getItem("authtoken")
      }
    })
    const json = await response.json();
    setData(json);
  }

  return (
    <>
    <NoteState>
      <Router>
        <Nav data={data}/>
        <Alert alert={alert} showAlert={showAlert}/>
      <Routes>
        <Route path="/" element={<Home showAlert={showAlert} codeData={fetchdecodeData}/>}/>
        <Route path="/login" element={<Login showAlert={showAlert}/>}/>
        <Route path="/signup" element={<Signup showAlert={showAlert}/>}/>
      </Routes>
      </Router>    
    </NoteState>
    </>
  );
}

export default App;
