// import { useState } from 'react'
import './App.css'
import { Home } from './pages/Home'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Modal } from './pages/Sell';
import { Record } from './pages/Record';


function App() {

  return (
    <div className="w-full max-h-full justify-center items-center flex flex-col  ">

      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sell" element={<Modal />}></Route>
          <Route path="/record" element={<Record />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
