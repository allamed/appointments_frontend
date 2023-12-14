import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppointmentList from "./components/AppointmentList";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
     <AppointmentList/>
        <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
