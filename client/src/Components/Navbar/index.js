import React from 'react';
import DropdownMenu from './DropdownMenu';
import { useNavigate } from 'react-router-dom';
import ProfileBox from './ProfileBox';
import './index.scss'

const Navbar = (props) => {
    const navigate = useNavigate();

    return (
        <div className='navbar-container'>
            <div className='left-content'>
                <div className='logo'>
                    <div
                        onClick={() => {
                            navigate('/boards');
                        }}
                        src='https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif'
                    />
                </div>
                <div className='dropdown-container'>
                    <DropdownMenu title='Your Boards' />
                </div>
            </div>
            <div className='right-content'>
                <div className="search-bar">
                    <div className="icon"></div>
                    <input type="text" placeholder='Search' />
                </div>
                <div className="profile-box">
                    <ProfileBox />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
