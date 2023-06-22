import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Components/About';
import Layout from './Components/Layout';
import Login from './Components/login'
import SignUp from './Components/signup'
import Faults from './Components/faults';
import NoteState from "./context/NoteState"
function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/admin" element={<Navbar/>}/>
          <Route path="/admin/faults" element={<Faults/>}/>
          <Route path="/admin/attendence" element={<Layout/>}/>
          <Route path="/admin/leave" element={<About/>}/>
        </Routes>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
