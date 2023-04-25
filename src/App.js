import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './contexts/NoteState';
import { useState } from 'react';

import Home from "./components/Home";
import About from "./components/About";
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  return (
    <NoteState showAlert={showAlert}>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert}/>

        <div className='container'>
          <Routes>

            <Route exact path="/">
              <Route index element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;