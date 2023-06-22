import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import About from "./About"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AttendenceTable from './AttendenceTable';
import '../AttendencePage.css'
export default function Layout() {
  const [users, setUsers] = useState([]);
  const [mapLink, setMapLink] = useState("");
  // let dateQ = new Date("2023-10-06 01:00 AM");
  useEffect(() => {
    getAllAttendence();
    generateMapLink();
    // if (dateQ > new Date()) {
    //   clearAttendence();
    //   dateQ = new Date();
    // }
    getAllAttendence();
  }, [])
  async function generateMapLink() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const generatedMapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setMapLink(generatedMapLink);
          // console.log(generatedMapLink);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
  const getAllAttendence = async () => {
    const res = await fetch("http://localhost:3001/api/attendence/getAttendence", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json1 = await res.json();
    setUsers([json1]);
  }
  const MarkPresent = async () => {
    const currTime=(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()).toString();
    const response = await fetch("http://localhost:3001/api/attendence/markPresent", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"), locationN: mapLink, InTime:currTime
      })
    });
    const json = await response.json();
    // console.log(mapLink);
    await getAllAttendence();
  }
  const clearAttendence = async () => {
    const response = await fetch("http://localhost:3001/api/attendence/clearAttendence", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    getAllAttendence();
  }
  return (
    <>
      <Navbar />
      <div className='containerLayout1 my-3' style={{ textAlign: 'center' }}>
        <button onClick={() => { MarkPresent() }}>Mark Present</button>
      </div>
      <div className='containerLayout1 my-3' style={{ textAlign: 'center' }}>
        <button onClick={() => { clearAttendence() }}>Clear Attendence</button>
      </div>
      <div className='containerLayout2'>
        <table style={{ border: "2px solid black" }}>
          <thead>
            <tr style={{ border: "2px solid black" }}>
              <td style={{ border: "2px solid black", textAlign: "center" }}>Name</td>
              <td style={{ border: "2px solid black", textAlign: "center" }}>Email</td>
              <td style={{ border: "2px solid black", textAlign: "center" }}>InTime</td>
              <td style={{ border: "2px solid black", textAlign: "center" }}>Location</td>
            </tr>
          </thead>
          <tbody>
            {!users.length == 0 ? users[0].map((user, index) => {
              return <AttendenceTable key={index} user={user} />
            }) : ""}
          </tbody>
        </table>
      </div>
    </>
  )
}