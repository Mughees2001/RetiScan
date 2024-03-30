import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ControlPanel from './ControlPanel';
import HomePage from './HomePage';
import Chatbox from './Chatbox'; 
import Main from './main.js';
import Formfile from '../components/formfile';
import Register from './register';
import ImageUpload from './abnormal' ;
import TestimonialCarousel from '../components/TestimonialCarousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <Router>
<Navbar bg="dark" variant="dark">
  <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
    <img
      src="/logo.png"
      width="40" 
      height="40" 
      alt="RetiScan Logo"
      style={{ marginTop: '10px' , marginRight: '5px' }}
    />
    RetiScan
  </Navbar.Brand>
  <Nav className="mr-auto">
    <Nav.Link as={Link} to="/">Home</Nav.Link>
    <Nav.Link as={Link} to="/control-panel">Demo</Nav.Link>
    <Nav.Link as={Link} to="/abnormality">Abnormality Testing</Nav.Link>
    <Nav.Link as={Link} to="/chat-box">Chat with Us!</Nav.Link>
  </Nav>
</Navbar>


    <Routes>
  <Route path="/control-panel" element={<ControlPanel />} />
  <Route path="/chat-box" element={<Chatbox />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/formfile" element={<Formfile />} />
  <Route path="/register" element={<Register />} />
  <Route path="/" element={<Main />} />
  <Route path="/testimonials" element={<TestimonialCarousel />} />
  <Route path="/abnormality" element={<ImageUpload />} />
</Routes>

    </Router>
  );
}

export default App;

