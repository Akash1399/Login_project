import './App.js';
import React  from 'react';
import Dashboard from './Components/dashboard'
import Login from './Components/Login';
import {Route, Routes} from 'react-router-dom'
import Registration from './Components/Registration.js';




function App() {
  return (
  <>
  <Routes>
    <Route exact  path='/' element={<Login/>} />
    <Route path='/register' element={<Registration/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
   
  </Routes>
  </>
  );
}

 export default App;
