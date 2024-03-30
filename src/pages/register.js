import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase'; // Adjust the path as necessary
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const navigate = useNavigate();
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, emailReg, passwordReg);
      // Set the signup success state to true
      setSignupSuccess(true);
    } catch (error) {
      console.error("Error signing up with email and password", error);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form className="form" onSubmit={handleRegister}>
        <h2 className="form-title">Hello, Doctor!</h2>

        <input type="email" placeholder="email" value={emailReg} onChange={(event) => setEmailReg(event.target.value)} />
        <input type="password" placeholder="password" value={passwordReg} onChange={(event) => setPasswordReg(event.target.value)} />

        <button className="form-button" type="submit">Sign Up</button>

        {/* Display a message if signup is successful */}
        {signupSuccess && (
          <div className="signup-success-message">
            Registration successful! Please <a href="#" onClick={() => navigate('/signin')}>sign in</a>.
          </div>
        )}
      </form>
    </div>
  );
}

export default SignUp;

