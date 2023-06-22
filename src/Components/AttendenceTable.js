import React from 'react'
import '../AttendencePage.css'
function AttendenceTable(props) {
    const {name,email,locationN,InTime}=props.user;
    // console.log(props.user.InTime);
  return (
    <>
    <tr style={{border:"2px solid black"}}>
        <td style={{border:"2px solid black"}}>{name}</td>
        <td style={{border:"2px solid black"}}>{email}</td>
        <td>{InTime}</td>
        <td style={{ border: "2px solid black" }}>
          <a href={locationN} target="_blank" rel="noopener noreferrer">Go</a>
        </td>
    </tr>
    </>
  )
}

export default AttendenceTable