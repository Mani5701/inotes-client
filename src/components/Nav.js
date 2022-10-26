import React from 'react';
import {Link , useLocation,useNavigate} from 'react-router-dom'

function Nav({data}) {
  let location = useLocation();
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authtoken");
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className = {`nav-link ${location.pathname === '/' ? "active" : "" }`}  aria-current="page" to="/"></Link>
        </li>
        </ul>

        
          {!localStorage.getItem('authtoken')?<div className="nav-btn">
            <Link to="/login" type='btn' className='btn btn-success btn-sm '>Login</Link>
            <Link to="/signup" type='btn' className='btn btn- btn-warning btn-sm text-light mx-2'>Signup</Link>
            </div> 
              : 
            <div className='signbtn'>
            <button className='btn btn-outline-primary btn-sm mx-2'>{data ? data.name : ""}</button>
            <button className='btn btn-danger btn-sm mx-2'  onClick={handleLogout}>Logout</button>
            </div>
          }
        
    </div>
  </div>
</nav>
    </div>
  )
}

export default Nav
