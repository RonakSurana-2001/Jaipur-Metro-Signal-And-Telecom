import { useState } from 'react';
import React from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import '../loginPage.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

const baseUrl="https://service-3.onrender.com"
// const baseUrl="http://localhost:3001"

function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const signUp = () => {
        navigate("/signup");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.data == "username or password incorrect") {
            console.log("No users exits");
            alert("Either Username or Password is Incorrect")
        }
        else {
            // console.log(json);
            localStorage.setItem("token", json.data);
            navigate("/admin");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            {/* <div>
       <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onChange} name="email"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" value={credentials.password} onChange={onChange} name="password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <button type="submit" className="btn btn-primary my-2" onClick={signUp}>SignUp</button>
    </div> */}
            <div className='container'>
                <form onSubmit={handleSubmit} className='form-1'>
                    <div className='LoginHeader'>
                        <p>Login</p>
                    </div>
                    <div className="containerEmail">
                        {/* <label htmlFor="email">Email address</label> */}
                        <input type="email" className="" id="email" placeholder="Enter email" value={credentials.email} onChange={onChange} name="email" />
                    </div>
                    <div className="containerPassword">
                        <input type="password" className="" id="password" placeholder="Password" value={credentials.password} onChange={onChange} name="password" />
                    </div>
                    <div className='btn-submit-Area'>
                        <button type="submit" className="btn-submit">Submit</button>
                        <button type="submit" className="btn-new" onClick={signUp}>SignUp</button>
                    </div>
                    {/* <div className="g-signin2" onClick={onSignIn}></div> */}
                    <div className='googleauth-login'>
                        <GoogleOAuthProvider clientId="900255065857-kfnfa6vi6u99u8lnedee9kv6es7eov7f.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    const details = jwt_decode(credentialResponse.credential);
                                    localStorage.setItem("email",details.email);
                                    localStorage.setItem("name",details.name);
                                    // console.log(credentialResponse);
                                    if(!localStorage.clear())
                                    {
                                        localStorage.setItem("email",details.email);
                                        localStorage.setItem("name",details.name);
                                        navigate("/admin");
                                    }
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }} theme="filled_black"
                                text="signin_with"
                                shape="rectangular"
                                size="large"
                                width="200px"
                            />
                        </GoogleOAuthProvider>
                    </div>
                    <div style={{textAlign:"center",padding:"8px"}}>
                        <a href="/resetPassword">Forgot Password</a>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login