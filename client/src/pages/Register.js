import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Register() {


    return (
        <div>
            <div className="sign-main">
                <div className="sign-img">
                    <img src='/systemImage/signimg.png' alt="" />
                </div>
                <div className="sign-form">
                    <h4>Sign Up</h4>

                    {/* <div className={error == '' ? 'clear-error' : 'error-hand'}>{error}</div> */}
                    <input className='inp' type="text" placeholder='Username...' />
                    <input className='inp' type="email" placeholder='Email...' />
                    <input className='inp' type="password" placeholder='Password...' />
                    <button type='button' className="waves-effect waves-light btn">Sign Ug</button>
                    <p style={{ fontSize: 17, marginTop: 10 }}>Have an account? <Link style={{ color: '#3e5e98' }} to="/login">Sing In</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register