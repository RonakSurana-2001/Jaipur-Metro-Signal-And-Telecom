import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import AttendenceTable from './AttendenceTable';
import '../AttendencePage.css'

const baseUrl="https://website-test-jkzw.onrender.com"
// const baseUrl="http://localhost:3001"

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
    const res = await fetch(`${baseUrl}/api/attendence/getAttendence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          token:localStorage.getItem("token")
      })
    });
    const json1 = await res.json();
    setUsers([json1]);
  }
  const MarkPresent = async () => {
    const currTime=(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()).toString();
    const response = await fetch(`${baseUrl}/api/attendence/markPresent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locationN: mapLink, InTime:currTime,token:localStorage.getItem("token")
      })
    });
    const json = await response.json();
    await getAllAttendence();
  }
  const clearAttendence = async () => {
    await fetch(`${baseUrl}/api/attendence/clearAttendence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        token:localStorage.getItem("token")
      })
    });
    getAllAttendence();
  }

  let [loginEmail,setloginEmail]=useState('')

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
      setloginEmail(json.email);
    };

    getEmailId();
  }, []); 


  return (
    <>
      <Navbar />
      <div className='containerLayout1 my-3' style={{ textAlign: 'center' }}>
        <button onClick={() => { MarkPresent() }}>Mark Present</button>
      </div>
      {loginEmail=="admin@gmail.com" && <div className='containerLayout1 my-3' style={{ textAlign: 'center' }}>
        <button onClick={() => { clearAttendence() }}>Clear Attendence</button>
      </div>}
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