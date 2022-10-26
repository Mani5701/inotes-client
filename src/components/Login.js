import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Login({showAlert}) {
    const navigate = useNavigate();
    const[credential , setCredential] = useState({email : "",password : ""})
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method : "POST",
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify({email : credential.email , password : credential.password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem("authtoken",json.authToken);
            showAlert("Login Successflly","success")
            navigate("/")
          }else{
            showAlert("Enter Valid Credentials","danger")
        }
        // fetchdecodeData();
    }
    const onChange = (e)=>{
        setCredential({...credential , [e.target.name] : e.target.value})
    }
  return (
    <div className='container my-5'>
      <h3>Login To Access Your Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            name="email"
            onChange={onChange}
            value={credential.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            name="password"
            onChange={onChange}
            value={credential.password}
          />
        </div>
        <button  type="submit" className="btn btn-success">
          Login
        </button>
      </form>
      <p className='my-3 text-capitalize'>
      <strong><small>Doesnot have a account click on signup button above to create one.</small></strong>
      </p>
    </div>
  )
}

export default Login
