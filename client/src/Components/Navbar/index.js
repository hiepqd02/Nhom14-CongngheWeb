import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileBox from './ProfileBox';
import './index.scss'
import SearchIcon from '@mui/icons-material/Search';
const Navbar = ({ searchString, setSearchString }) => {
    const navigate = useNavigate();

    return (
        <div className='navbar-container'>
            <div className='left-content'>
                <div className='logo' onClick={() => {
                    navigate('/boards');
                }}>
                    Boostme
                </div>
            </div>
            <div className='right-content'>
                <div className="search-bar">
                    <div className="icon"><SearchIcon /></div>
                    <input type="text" placeholder='Search' value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                </div>
                <div className="profile-box">
                    <ProfileBox />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
