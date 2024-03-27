import NoteContext from "./noteContext";
import { useState,useEffect } from "react";

const baseUrl="https://website-test-jkzw.onrender.com"
// const baseUrl="http://localhost:3001"

const NoteState = (props)=>{
    // let val;
    const [notes, setState] = useState([]);
    const getAllNotes = async () => {
        const response = await fetch(`${baseUrl}/api/notes/fetchAllNotes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({token:localStorage.getItem("token")})
        });
        const json=await response.json();
        console.log(json)
        if(json!=undefined && json.length>0){
            if(json[0].email==="admin@gmail.com"){
                setState(json);
            }
            else{
                for(let i=0;i<json.length;i++){
                        const s1=[];
                        s1.push(json[i]);
                        setState(s1);
                        break;
                }
            }
        }
    }
    return (
        <NoteContext.Provider value={{notes,setState,getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;