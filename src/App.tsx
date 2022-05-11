import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoadListContactInfo from './components/LoadListContactInfo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddContactInfo from './components/AddContactInfo';
import ViewDetailContactInfo from './components/ViewDetailContactInfo';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <div>
        <Navbar />
        <h1>Practice Reactjs + Typescript contact ASP.net core API</h1>

      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoadListContactInfo />} />
          <Route path='/addContactInfo' element={< AddContactInfo />} />
          <Route path='/viewDetailContactInfo/:id' element={< ViewDetailContactInfo/>}/>
          <Route path="/home" element={<LoadListContactInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
