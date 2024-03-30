import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase'; // Make sure this path is correct
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Home');
    } catch (error) {
      console.error("Error signing in with email and password", error);
    }
  };

    return (
        <div className="form-container sign-in-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form-title">Welcome Back!</h2>

                <input type="username" placeholder="Enter username" value={email} onChange={(event) => setEmail(event.target.value)} />
                <input type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} />

                <button className="form-button">sign in</button>
                <a className="find-password" href="#">Forgot Password?</a>
            </form>
        </div>
    );
}

export default SignIn;
