import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setUser, fetchHighscore } from "../redux/slices/userSlice"
import "./authStyle.css"
import { useNavigate} from "react-router-dom";
import baseurl from '../constants';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${baseurl}/users/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })

        const json = await response.json();

        if (response.ok) {
            //Save user and token to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //Set user in authcontext i.e dispatch action
            dispatch(setUser(json))
            dispatch(fetchHighscore())
        }
    }

    return (
        <div className='signup-container' >
                        <div className="signup-content">
                            <div className="signUp-image">
                            <img src="signup.png" alt="" />
                            <h1>Signup</h1>
                            </div>
                            <form onSubmit={handleSubmit} >
                                <div>
                                    <label>Name : </label> <br />
                                    <input type="text" value={name} required onChange={(e) => setName(e.target.value)} /> <br />
                                </div>
                                <div>
                                    <label>Email : </label> <br />
                                    <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} /> <br />
                                </div>

                                <div>
                                    <label>Password : </label> <br />
                                    <input type="text" value={password} required onChange={(e) => setPassword(e.target.value)} /> <br />
                                </div>
                                <div className="create-btn">
                                <button type="submit">Create </button>
                                </div>
                            </form>
                            <div className="alreadyuserdiv">

                            <button className='already-user' onClick={ () => navigate("/login") } >Already a user? Login</button>
                            </div>

                        </div>
        </div>
    )
}

export default Signup
