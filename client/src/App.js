import './style.css';
import Header from './Header.js';
import AuthModal from './AuthModal';
import AuthModalContext from './AuthModelContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import RoutingSwitch from './RoutingSwitch';
import PostFormModal from './PostFormModal';
import PostFormModalContext from './PostFormModalContext';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostFormModal, setShowPostFormModal] = useState(false);
  const [user, setUser] = useState({});


  useEffect(() => {
    axios.get('http://localhost:4000/user/', { withCredentials: true })
      .then(response => setUser(response.data));
  }, []);

  function logout() {
    axios.post('http://localhost:4000/user/logout', {}, { withCredentials: true })
      .then(() => setUser({}));
  }

  function Routing() {
    return (
      < div >
        <Router>
          <Header />
          <RoutingSwitch />
          <PostFormModal />
          <AuthModal />
        </Router>
      </div >
    );
  }

  return (
    <AuthModalContext.Provider value={{ show: showAuthModal, setShow: setShowAuthModal }}>
      <PostFormModalContext.Provider value={{ show: showPostFormModal, setShow: setShowPostFormModal }}>
        <UserContext.Provider value={{ ...user, logout, setUser }}>
          <Routing />

        </UserContext.Provider>
      </PostFormModalContext.Provider>
    </AuthModalContext.Provider >
  );
}

export default App;
