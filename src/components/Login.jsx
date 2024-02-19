import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, fetchHighscore } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseurl from '../constants';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseurl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const json = await response.json();
      localStorage.setItem('user', JSON.stringify(json));

      dispatch(setUser(json));
      dispatch(fetchHighscore());

      navigate('/');
    } catch (error) {
      // Display toast notification for invalid email or password
      toast.error('Invalid email or password', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-image">
          <img className="login-img" src="login1.png" alt="" srcset="" />
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="div1">
            <label>Email : </label>
            <input required type="text" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
          </div>

          <div className="div2">
            <label>Password : </label>
            <input required type="text" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
          </div>
          <div className="login-btn-div">
            <button type="submit" className="login-button">
              <span>Login</span>
              <img className="loginarrow" src="loginarrow.png" alt="" />
            </button>
          </div>
        </form>
        <div className="notuserdiv">
          <button className="notuser" onClick={() => navigate('/signup')}>
            Not a user? Signup
          </button>
        </div>
      </div>
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
}

export default Login;
