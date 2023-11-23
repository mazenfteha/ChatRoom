import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
import { UserContext } from './UserContext';
import Chat from './components/chat/Chat';
import Home from './components/home/Home';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup'

function App() {
  const [user, setUser] = useState(null)
  return (
    <Router>
      <div className="App" >
        <UserContext.Provider value={{user, setUser}}>
          <Navbar/>
          <Routes>
            <Route exact path='/' Component={Home}/>
            <Route exact path='/chat/:room_id/:room_name' Component={Chat}/>
            <Route  path='/signup' Component={Signup}/>
            <Route  path='/login' Component={Login}/>
          </Routes>
    </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
