import React, { useContext, useState, useEffect } from 'react'
import noteContext from '../context/noteContext';
function NotesItem(props) {
  const { note } = props;
  const a = useContext(noteContext);
  const { getAllNotes, setState, notes } = a;
  const approveRequest = async (email) => {
    const response = await fetch("https://service-3.onrender.com/api/notes/approveLeave", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, Status: "Approved" })
    });
    await getAllNotes();
  };
  const rejectRequest = async (email) => {
    const response = await fetch("https://service-3.onrender.com/api/notes/rejectRequest", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({email:email})
    });
    await getAllNotes();
  }
  return (
    <>
      <form onSubmit={() => approveRequest(note.email)} className='conti-1'>
        <div className="col-md-3 ">
          <div className="card my-3 conti-1">
            <div className="card-body">
              <h5 className="card-title">{note.name.toUpperCase()}</h5>
              <h5 className="card-text">{note.Reason}</h5>
              <h5 className="card-text">{note.Status}</h5>
              <h6 className="card-text">{note.date}</h6>
            </div>
            <div className='seti contin-2'>
              {localStorage.getItem("email") === "admin@gmail.com" ? <button type="submit" className="my-2 mx-2 seti-2" >Approve</button> : ""}
              <button onClick={() => { rejectRequest(note.email) }} className="my-2 mx-2 seti-2">Remove Request</button>
            </div>
          </div>
        </div>
      </form >
    </>
  )
}

export default NotesItem