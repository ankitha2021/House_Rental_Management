import React, { useState } from 'react';
import UserSignup from './User_Signup';
import UserLogin from './User_Login';
import OwnerLogin from './Owner_Login';
import OwnerSignup from './Owner_Signup';
import Owner from './Owner';
import Frontpage from './Frontpage'; 
import './App.css';
import BgImg from './bg_img.jpg';

function App() {
    const [currentPage, setCurrentPage] = useState('frontpage'); // Start with frontpage


    const renderPage = () => {
        if (currentPage === 'frontpage') {
            return (
                <div className='buttonspace'>
                    
                    <button className='button' onClick={() => setCurrentPage('OwnerSignup')}>Go to Owner Signup</button>
                    <button className='button' onClick={() => setCurrentPage('UserSignup')}>Go to User Signup</button>
                    <button className='button' onClick={() => setCurrentPage('OwnerLogin')}>Go to Owner Login</button>
                    <button className='button' onClick={() => setCurrentPage('UserLogin')}>Go to User Login</button>
                    <Frontpage /> 
                </div>
            );
        } else if (currentPage === 'OwnerSignup') {
            return (
                <div>
                    <button className='button' onClick={() => setCurrentPage('frontpage')}>Go back to Home</button>
                    <OwnerSignup />
                    <button className='button' onClick={() => setCurrentPage('OwnerLogin')}>Go to your login page</button>
                </div>
            );
        } else if (currentPage === 'UserSignup') {
            return (
                <div>
                    <button className='button' onClick={() => setCurrentPage('frontpage')}>Go back to Home</button>
                    <UserSignup />
                    <button className='button' onClick={() => setCurrentPage('UserLogin')}>Go to your login page</button>     
                </div>
            );
        }    else if (currentPage === 'OwnerLogin') {
            return (
                <div>
                    <button className='button' onClick={() => setCurrentPage('frontpage')}>Go back to Home</button>
                    <OwnerLogin />
                </div>
            );
        }   else if (currentPage === 'UserLogin') {
            return (
                <div>
                    <button className='button' onClick={() => setCurrentPage('frontpage')}>Go back to Home</button>
                    <UserLogin />
                </div>
            );
        } else if (currentPage === 'Owner') {
            return (
                <div>
                    <Owner />
                </div>
            );
            }
    };

    return (
        <div style={{ backgroundImage: `url(${BgImg})`, backgroundSize: 'cover', minHeight: '100vh' }}>
            {renderPage()}
        </div>
    );
}

export default App;