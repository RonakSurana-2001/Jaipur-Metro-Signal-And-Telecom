import NoteContext from "./noteContext";
import { useState,useEffect } from "react";

const NoteState = (props)=>{
    // let val;
    const [notes, setState] = useState([]);
    const getAllNotes = async () => {
        const response = await fetch("https://service-3.onrender.com/api/notes/fetchAllNotes", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const json=await response.json();
        if(localStorage.getItem("email")==="admin@gmail.com"){
            setState(json);
        }
        else{
            for(let i=0;i<json.length;i++){
                if(localStorage.getItem("email")===json[i].email){
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