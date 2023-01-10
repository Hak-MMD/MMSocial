import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser, AiOutlineMenu } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import '../style.css';

function Navbar() {

    const navMenu = () => {

    };

    return (
        <nav>
            <div className="nav-wrapper teal">
                <Link style={{ marginLeft: 30 }} to='/' className="brand-logo left">Helper</Link>
                <ul style={{ marginRight: 30 }} id="nav-mobile" className="right">
                    <li className='hide-on-small-and-down'><Link to='/allQuestions'><AiOutlineHome /> Main</Link></li>
                    <li className='hide-on-small-and-down'><Link to='/login'><FiLogIn /> Login</Link></li>
                    <li className='hide-on-small-and-down'><Link to='/register'><AiOutlineUser /> Register</Link></li>

                    <li className="final__dropdown">
                        <a className="final__dropdown__hover hide-on-med-and-up"><AiOutlineMenu /></a>
                        <div className="final__dropdown__menu">
                            <Link to='/allQuestions'><AiOutlineHome /> Main</Link>
                            <Link to='/login'><FiLogIn /> Login</Link>
                            <Link to='/register'><AiOutlineUser /> Register</Link>
                        </div>
                    </li>
                    {/* <li className='hide-on-med-and-up'><Link to='/allQuestions'><AiOutlineHome /></Link></li>
                    <li className='hide-on-med-and-up'><Link to='/login'><FiLogIn /></Link></li>
                    <li className='hide-on-med-and-up'><Link to='/register'><AiOutlineUser /></Link></li> */}
                </ul>
            </div>
        </nav >
    )
}

export default Navbar