import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function OtpSection() {
  const [credentials, setCredentials] = useState({ OTP: "" })
  let navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/auth/resetPasswordEmail", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ OTP: credentials.OTP })
    });
    const json = await response.json();
    if (json != "ok") {
      console.log("No users exits");
    }
    else {
      // console.log(json);
      navigate("/resetPassword/otp");
    }
  }

  const handleOTPRequest=async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/auth/OTPSend", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({emailReciever:localStorage.getItem("email")})
    })
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='form-1'>
        <div className='btn-submit-Area'>
          <button onClick={handleOTPRequest} className="btn-submit">Send OTP</button>
        </div>
        <div className="containerEmail">
          {/* <label htmlFor="email">Email address</label> */}
          <input type="email" className="" id="OTP" placeholder="Enter OTP" value={credentials.OTP} onChange={onChange} name="OTP" />
        </div>
        <div className='btn-submit-Area'>
          <button onSubmit={handleSubmit} className="btn-submit">Verify</button>
        </div>
      </form>
    </div>
  )
}

export default OtpSection