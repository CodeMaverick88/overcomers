"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import './Navbar.css';

// Importing Google Fonts
import { Audiowide } from 'next/font/google';

// Applying Audiowide Font to Titles and Subtitles
const audiowideFont = Audiowide({ weight: '400', subsets: ['latin'] });

const NavBar = () => {
    const [openMenu, setOpenMenu] = useState(false);

    // Toggle menu for dropdown
    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    

    return (
        <div>
            <div className="navbar fixed w-full z-50 transition-all bg-transparent backdrop-blur-md duration-300">
                <div className="container mx-auto px-3 py-3 flex items-center justify-between">

                    {/* Logo with Audiowide Font */}
                    <div className="flex flex-col items-center space-y-2">
                        <Link href="/" className={`text-0.5xl ${audiowideFont.className} text-white`}>OVERCOMERS</Link>
                        <Link href="/" className={`text-0.5xl ${audiowideFont.className} text-white`}>CHAPEL</Link>
                        <Link href="/" className={`text-0.5xl ${audiowideFont.className} text-white`}>INTERNATIONAL</Link>
                    </div>

                    {/* Main buttons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className={`nav-link ${audiowideFont.className}`}>FIRST STEP</Link>
                        <Link href="/connect" className={`nav-link ${audiowideFont.className}`}>CONNECT</Link>
                        <Link href="/messages" className={`nav-link ${audiowideFont.className}`}>MESSAGES</Link>
                    </div>

                    {/* Menu button */}
                    <button className={`nav-link menu-button ${audiowideFont.className} ${openMenu ? 'flipped' : ''}`} onClick={toggleMenu}>
                        {openMenu ? "Close" : "Menu"}
                    </button>
                </div>

                {/* Dropdown with scrollable content */}
                <div className={`dropdown-fullscreen ${openMenu ? 'open' : 'closed'}`}>
                    <div className="dropdown-content-wrapper">
                        <div className="dropdown-content">

                            {/* Logo Slot at Top Left */}
                            <div className="dropdown-logo">
                                <img src="/new overcomers logo.jfif" alt="Overcomers Chapel Logo" className="logo-image" />
                            </div>

                            {/* Close button */}
                            <button className="close-button" onClick={toggleMenu}>CLOSE</button>

                            {/* Main Title */}
                            <div className="main-title-section">
                                <h4 className="main-title underline">OVERCOMERS CHAPEL INTERNATIONAL</h4>

                                {/* Subtitles horizontally arranged with vertically arranged buttons */}
                                <div className="title-group-horizontal">
                                    <div className="column">
                                        <h5 className={`subtitle ${audiowideFont.className}`}>Navigate</h5>
                                        <div className="button-group">
                                            <button className="dropdown-button">About Us</button>
                                            <button className="dropdown-button">Live Events</button>
                                            <button className="dropdown-button">Projects</button>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <h5 className={`subtitle ${audiowideFont.className}`}>Blessed to Be a Blessing</h5>
                                        <div className="button-group">
                                            <button className="dropdown-button">Give</button>
                                            <button className="dropdown-button">Share</button>
                                            <button className="dropdown-button">Donate</button>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <h5 className={`subtitle ${audiowideFont.className}`}>Location</h5>
                                        <div className="button-group">
                                            <button className="dropdown-button">Ministries</button>
                                            <button className="dropdown-button">Praise Cathedral</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sermon Image Section - centered below title */}
                            <div className="sermon-image-container">
                                <h5 className="sermon-title">Latest Sermon</h5>
                                <Link href="/latest-sermon">
                                    <img src="/anointing.jpg" alt="Latest Sermon" className="sermon-image" />
                                </Link>
                            </div>

                            {/* Bottom Section - Bible Verse and Meeting Times */}
                            <div className="dropdown-bottom">
                                <p className="verse text-white">&quot;I can do all things through Christ who strengthens me.&quot; - Philippians 4:13</p>
                                <p className="meeting-times text-white">Sundays: 10:00 AM | Wednesdays: 7:00 PM</p>
                            </div>

                            {/* Social Media Links with Icons */}
                            <div className="social-media-links">
                                <a href="https://instagram.com" className="social-icon">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="https://facebook.com" className="social-icon">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="https://tiktok.com" className="social-icon">
                                    <i className="fab fa-tiktok"></i>
                                </a>
                                <a href="https://youtube.com" className="social-icon">
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
