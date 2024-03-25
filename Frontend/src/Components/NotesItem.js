import React, { useContext, useState, useEffect } from 'react'
import noteContext from '../context/noteContext';
import moment from 'moment';

const baseUrl="https://service-3.onrender.com"
// const baseUrl="http://localhost:3001"

function NotesItem(props) {


  const { note } = props;

  const approveRequest = async (email) => {
    await fetch(`${baseUrl}/api/notes/approveLeave`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, Status: "Approved" })
    });
    await getAllNotes();
  };


  const rejectRequest = async (email) => {
    await fetch(`${baseUrl}/api/notes/rejectRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({email:email})
    });
    await getAllNotes();
  }

  const a = useContext(noteContext);
  const { getAllNotes, setState, notes } = a;

  const [email,setEmail]=useState('')

  useEffect(() => {
    const getEmailId = async () => {
      const response = await fetch(`${baseUrl}/api/notes/getEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: localStorage.getItem('token') })
      });
      const json = await response.json();
      setEmail(json.email);
    };

    getEmailId();
  }, []); 


  return (
    <>
      <form onSubmit={() => approveRequest(note.email)} className='conti-1'>
        <div className="col-md-3 ">
          <div className="card my-3 conti-1">
            <div className="card-body">
              <h5 className="card-title">{note.name.toUpperCase()}</h5>
              <h5 className="card-text">{note.Reason}</h5>
              <h5 className="card-text">{note.Status}</h5>
              <h6 className="card-text">{"Date"+"="+new Date(note.date).getDate()+'-'+new Date(note.date).getMonth()+'-'+new Date(note.date).getFullYear()+'   Time='+new Date(note.date).getHours()+':'+new Date(note.date).getMinutes()+':'+new Date(note.date).getSeconds()}</h6>
            </div>
            <div className='seti contin-2'>
              {email === "admin@gmail.com" ? <button type="submit" className="my-2 mx-2 seti-2" >Approve</button> : ""}
              <button onClick={() => { rejectRequest(note.email) }} className="my-2 mx-2 seti-2">Remove Request</button>
            </div>
          </div>
        </div>
      </form >
    </>
  )
}

export default NotesItem