import React from "react";

function Alert({alert}) {
  const changeshape = (word)=>{
    if(word === "danger"){
      return word = "error";
    }else{
      return word;
    }
  }
  return (
    <>
    {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show text-capitalize`} role="alert">
        <strong>{changeshape(alert.type)}:</strong> {alert.message}
      </div>
    }
    </>
  );
}

export default Alert;
