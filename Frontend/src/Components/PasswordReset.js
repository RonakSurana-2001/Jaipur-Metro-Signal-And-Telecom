import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

let baseUrl="https://service-3.onrender.com"
// let baseUrl="http://localhost:3001"

function PasswordReset() {
    const [credentials, setCredentials] = useState({ email: ""})
    let navigate = useNavigate();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${baseUrl}/api/auth/resetPasswordEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email})
        });
        const json = await response.json();
        if (json!="ok") {
            console.log("No users exits");
        }
        else {
            // console.log(json);
            localStorage.setItem("email", credentials.email);
            navigate("/resetPassword/otp");
        }
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit} className='form-1'>
                <div className="containerEmail">
                    {/* <label htmlFor="email">Email address</label> */}
                    <input type="email" className="" id="email" placeholder="Enter email" value={credentials.email} onChange={onChange} name="email" />
                </div>
                <div className='btn-submit-Area'>
                    <button onSubmit={handleSubmit} className="btn-submit">Next</button>
                </div>
            </form>
        </div>
    )
}

export default PasswordReset