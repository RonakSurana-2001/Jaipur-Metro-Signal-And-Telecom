import React, { useContext, useEffect } from 'react'
import Navbar from "./Navbar"
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import "../ApplyLeave.css"
import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';
import NotesItem from './NotesItem'
import noteContext from '../context/noteContext';

const baseUrl="https://website-test-jkzw.onrender.com"
// const baseUrl="http://localhost:3001"

export default function Layout() {

  const a = useContext(noteContext);
  const { notes, getAllNotes } = a;

  useEffect(() => {
    getAllNotes();
  }, [])


  const [credentials, setCredentials] = useState({ email: "", name: "", reason: "" })
  // const [page,setPage]=useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/api/notes/createleave`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: localStorage.getItem("token"), name: credentials.name, Reason: credentials.reason })
    });
    const json = await response.json();
    await getAllNotes();
  }
  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <>
      <Navbar />
      <div className='container-afl'>
        <h1>Apply for Leave</h1>
        <form onSubmit={handleSubmit} className='form-2 my-3'>
          <div className="mb-3 tb">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-label-size form-label-size-name" id="name" placeholder="Your Name" onChange={onChange} value={credentials.name} name="name" />
          </div>
          <div className="mb-3 tb">
            <label htmlFor="reason" className="form-label">Reason For Leave</label>
            <textarea className="form-label-size form-label-size-reason" id="reason" rows="3" onChange={onChange} value={credentials.reason} name="reason" placeholder="Write Your Reason Here"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className='value'>
        <h1>Check Your Leave Status</h1>
        <div className="card-sample">
          {notes.map((note, index) => {
            return <NotesItem key={index} note={note} />
          })}
        </div>
      </div>
    </>
  )
}