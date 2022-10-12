import React from 'react';
import Login from './Component/Login';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Component/Home';

function App() {
    return(
      <div>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </div>
    )
  }

export default App
