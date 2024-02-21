import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../providers/AuthProvider';
import { FaUserLarge } from "react-icons/fa6";
const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isSticky, setIsSticky] = useState(false);
    const [userWithGoogle, setUserWithGoogle] = useState(null);
    const location = useLocation();
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.pageYOffset; // Calculate scroll position
            setIsSticky(offset > 0); // Set sticky based on scroll position
        };

        window.addEventListener('scroll', handleScroll); // Add scroll event listener

        return () => {
            window.removeEventListener('scroll', handleScroll); // Remove listener on unmount
        };
    }, []);
    // console.log("from navbar", user)
    
    const [isBannerVisible, setIsBannerVisible] = useState(false);
    const [clicked, setClicked] = useState(false);
    // const notify = toast("Logged Out!");
    const handleClick = () => {
        setClicked(!clicked);
        setTimeout(() => {
            setClicked(false);
        }, 75);
    };
    const handleLogout = () => {
        logout()
            .then(result => {
                // console.log(result);
            })
            .catch(error => {
                console.log(error.message);
                // toast(error.message)
            });
        // notify();
        // 
    }
    const links = <>
        <li onClick={() => setIsBannerVisible(true)}><NavLink className={` nav-btn ${location.pathname === "/" ? "active " : ""}`} to={"/"} >
            Home
        </NavLink>
        </li>
        <li onClick={() => setIsBannerVisible(false)}><NavLink className={`nav-btn ${location.pathname === "/events" ? "active" : ""}`} to={"/events"}>Events</NavLink></li>
        <li onClick={() => setIsBannerVisible(false)}><NavLink className={`nav-btn ${location.pathname === "/about" ? "active" : ""}`} to={"/about"}>About</NavLink></li>
        <li onClick={() => setIsBannerVisible(false)}><NavLink className={`nav-btn ${location.pathname === "/blog" ? "active" : ""}`} to={"/blog"}>Blog</NavLink></li>
    </>
    return (
        <div className={`navbar my-3 z-50 relative top-3 w-4/5 mx-auto rounded-full ${isSticky ? 'sticky top-0 bg-[#707070]' : ''}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 menu menu-sm">
                        {
                            links
                        }
                    </ul>
                </div>
                <a className="rounded-md px-4 py-2 font-bold border-none text-xl text-[#FFA328]  flex justify-around items-center">
                    <img className='h-10 w-10 mr-2' src='/favicon.png'></img>
                    <span className='uppercase'>Læraðr</span></a>
            </div>
            <div className="navbar-center hidden lg:flex align-middle items-center">
                <ul className="menu-horizontal px-10 flex justify-between ">
                    {
                        links
                    }
                </ul>
            </div>

            <div className="navbar-end">

                {
                    user ?
                        <>
                            {
                                (user && user.displayName) &&
                                <p className='text-[#1AD1A4] text-xl font-bold'>{user.displayName}</p>
                            }
                            {
                                (user && !user.displayName) &&
                                <>
                                    <p className='text-[#1AD1A4] text-xl font-bold'>{user.email}</p>
                                    <button className={`relative mx-2 ${clicked ? 'scale-105' : ''} nav-clickable`} onClick={handleLogout}>Logout</button>
                                </>
                            }
                            <details className='flex justify-center items-center mx-3 relative'>
                                <summary className='flex'>
                                    {user?.photoURL &&
                                        <img className='icon h-14 w-14 mr-2 rounded-full' src={user.photoURL} alt="" />
                                    }
                                </summary>
                                {
                                    user &&
                                    <div>
                                        <ul className={`absolute right-0 top-full transform translate-y-4 ${clicked ? 'scale-105' : ''} nav-clickable`} onClick={handleLogout}>
                                            <li>Logout</li>
                                        </ul>
                                    </div>
                                }
                            </details>

                        </>
                        :
                        <>
                                {
                                    (!location.pathname.includes("/login")) &&                             <div alt = "login" className='flex justify-center items-center mx-3 relative'>
                                    <Link className='block' to={"/login"}>
                                        <summary className='icon'><FaUserLarge className='h-7 w-7' /></summary></Link>
                                </div>
                                }

                                {
                                    (!location.pathname.includes("/register")) &&                             <section className={`relative mx-2 ${clicked ? 'scale-105' : ''} nav-clickable`} onClick={handleClick}><Link to={"/register"}>
                                    Register
                                    <span className="btn-span"></span>
                                </Link>
                                </section>
                                }
                        </>
                }

            </div>
            {/* <img src={user.photoURL} alt="" /> */}
            {/* <ToastContainer></ToastContainer> */}
            {/* {
                user && user.photoURL && <img src={user.photoURL}></img>
            } */}
        </div>
    );
};

export default Navbar;