import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoadListContactInfo from './components/LoadListContactInfo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddContactInfo from './components/AddContactInfo';
import ViewDetailContactInfo from './components/ViewDetailContactInfo';
import Navbar from './components/Navbar';
import AddNewConDynamicForm from './components/DynamicForm.tsx/AddNewConDynamicForm';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
          <Route path='/viewDetailContactInfo/:id' element={< ViewDetailContactInfo />} />
          <Route path="/home" element={<LoadListContactInfo />} />
          <Route path="/demo-react-hock-form-val" element={<AddNewConDynamicForm />} />

        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
