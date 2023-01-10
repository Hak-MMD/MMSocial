import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineMenu } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import '../style.css';
import axios from 'axios';
import { urlAuth } from '../../axios/custom';

function NavbarAuth() {
    const navigate = useNavigate();

    const logoutUser = () => {
        if (localStorage.getItem('token')) {
            const id = localStorage.getItem('id');
            localStorage.clear();
            axios.get(urlAuth + '/myAccount/' + id, {
                transformRequest: (data, headers) => {
                    delete headers.common['Authorization'];

                }
            });
            navigate('/')
        }
    };
    return (
        <nav>
            <div className="nav-wrapper teal">
                <Link style={{ marginLeft: 30 }} to='/allQuestionsAuth' className="brand-logo left">Helper</Link>
                <ul style={{ marginRight: 30 }} id="nav-mobile" className="right">
                    {/* <li><input className='search-inp' type="text" placeholder='Search...' /></li> */}
                    <li className='hide-on-small-only'><Link to='/myAccount'><AiOutlineUser /> MyAccount</Link></li>
                    <li className='hide-on-small-only'><Link onClick={logoutUser} to='/'><FiLogOut /> Logout</Link></li>
                    <li className="final__dropdown">
                        <a className="final__dropdown__hover hide-on-large-only"><AiOutlineMenu /></a>
                        <div className="final__dropdown__menu">
                            <Link className='hide-on-large-only' to='/allQuestionsAuth'>All Questions</Link>
                            <Link to='/myQuestions'>My Questions</Link>
                            <Link to='/allTagsAuth'>Tags</Link>
                            <hr />
                            <Link to='/myAccount'><AiOutlineUser /> MyAccount</Link>
                            <Link onClick={logoutUser} to='/'><FiLogOut /> Logout</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavbarAuth