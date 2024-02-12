import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from '../shared/Footer/Footer';
import Navbar from '../shared/Navbar/Navbar';
import BackgroundImage from './BackgroundImage';

const Root = () => {
    return (
        <div className='md:max-w-7xl md:mx-auto'>
            {/* <BackgroundImage></BackgroundImage> */}
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer className = "max-w-none"></Footer>
            {/* <ToastContainer autoClose={1000}></ToastContainer> */}
        </div>
    );
};

export default Root;