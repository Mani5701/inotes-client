import React ,{useState} from 'react';
import {useNavigate} from "react-router-dom"

function Signup({showAlert}) {
  const [credential , setCredential] = useState({name:"",email:"",password:"",cpassword:""});
  const navigate = useNavigate();
  const handleClick = async (e)=>{
    e.preventDefault();
    const {name,email,password} = credential;
    const response = await fetch("https://inotes-server.herokuapp.com/api/auth/createuser",{
            method : "POST",
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem("authtoken",json.authToken);
            showAlert("Account has been created successfully","success")
            navigate("/")
          }else{
            showAlert("enter valid information in the below field","danger")
        }
  }

  const onChange = (e)=>{
    setCredential({...credential, [e.target.name] : e.target.value})
  }
  return (
    <div className='container my-5'>
        <h3>Signup To Access iNotes</h3>
      <form onSubmit={handleClick}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
            name="name"
            onChange={onChange}
            value={credential.name}
          />
        </div>
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
            minLength={5}
            required
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
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
           Confirm Password
          </label>
          <input
            type="text"
            className="form-control"
            id="cpassword"
            placeholder="Confirm Your Password"
            name="cpassword"
            onChange={onChange}
            value={credential.cpassword}
          />
        </div>
        <button  type="submit" className="btn btn-warning text-light">
          Signup
        </button>
      </form>
      
    </div>
  )
}

export default Signup
