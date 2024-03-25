import { useState } from 'react';
import React from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import '../SignUpPage.css'

const baseUrl="https://service-3.onrender.com"
// const baseUrl="http://localhost:3001"

function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${baseUrl}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        // console.log(json);
        if (json.length == 0) {
            console.log("User Already Exits");
        }
        else {
            navigate("/");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container-sign'>
            <h1 className="heading-page">Sign-In</h1>
            <form onSubmit={handleSubmit}>
                <div className="container-box">
                    {/* <label htmlFor="name">Name</label> */}
                    <input type="text" className="container-input" id="name" placeholder="Enter Name" value={credentials.name} onChange={onChange} name="name" />
                </div>
                <div className="container-box">
                    {/* <label htmlFor="email">Email address</label> */}
                    <input type="email" className="container-input" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onChange} name="email" />
                </div>
                <div className="container-box">
                    {/* <label htmlFor="password">Password</label> */}
                    <input type="password" className="container-input" id="password" placeholder="Password" value={credentials.password} onChange={onChange} name="password" />
                </div>
                <div className="container-box">
                    <button type="submit" className="">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp