import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function NewPassword() {
  const [credentials, setCredentials] = useState({ password: "" })
  const navigate=useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response=await fetch('https://website-test-jkzw.onrender.com/api/auth/updatePassword',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({updatedpasswordN:credentials.password,email:localStorage.getItem("email"),OTP:localStorage.getItem("OTP")})
    })
    
    const json=await response.json();
    if(json!="ok"){
      console.log("Password Not Updated");
    }
    else{
      localStorage.clear();
      navigate("/");
    }
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='form-1'>
        <div className="containerEmail">
          <input type="password" className="" id="password" placeholder="Enter New Password" value={credentials.password} onChange={onChange} name="password" />
        </div>
        <div className='btn-submit-Area'>
          <button type="submit" className="btn-submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default NewPassword