"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import './Navbar.css';

const NavBar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [animationIndex, setAnimationIndex] = useState(0);

    // Toggle menu between different animations
    const toggleMenu = () => {
        setOpenMenu(!openMenu);
        if (!openMenu) {
            setAnimationIndex((animationIndex + 1) % 3); // Cycle through 3 animations (drop down, slide left, slide right)
        }
    };

    return (
        <div>
            {/* Navbar */}
            <div className={`navbar fixed w-full z-50 transition-all backdrop-blur-md duration-300 ${openMenu ? 'bg-black' : 'bg-transparent'} navbar-scroll`}>
                <div className="container mx-auto px-3 py-3 flex items-center justify-between">
                    
                    {/* Left CTA buttons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="nav-link first-cta">FIRST STEP</Link>
                        <Link href="/connect" className="nav-link second-cta">CONNECT</Link>
                        <Link href="/messages" className="nav-link third-cta">MESSAGES</Link>
                    </div>

                    {/* Logo with Church Name */}
                    <div className="flex flex-col items-center space-y-2">
                        <Link href="/" className="logo text-black">OVERCOMERS CHAPEL INTERNATIONAL</Link>
                        <img src="/new overcomers logo.jfif" alt="Overcomers Logo" className="logo-image" />
                    </div>

                    {/* Right CTA buttons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/about" className="nav-link fourth-cta">ABOUT US</Link>
                        <Link href="/projects" className="nav-link fifth-cta">PROJECTS</Link>
                        <Link href="/donate" className="nav-link sixth-cta">DONATE</Link>
                    </div>

                    {/* Menu button */}
                    <button className={`nav-link menu-button ${openMenu ? 'flipped' : ''}`} onClick={toggleMenu}>
                        {openMenu ? (<><i className="fas fa-times"></i> Close</>) : (<><i className="fas fa-bars"></i> Menu</>)}
                    </button>
                </div>

                {/* Dropdown */}
                {openMenu && (
                    <div className={`dropdown-fullscreen animation-${animationIndex}`}>
                        <div className="dropdown-content-wrapper">
                            <div className="dropdown-content">
                                {/* Dropdown Content */}
                                <div className="dropdown-main-content">
                                    <h4 className="main-title">OVERCOMERS CHAPEL INTERNATIONAL</h4>

                                    {/* Encouraging Verse */}
                                    <div className="verse-section">
                                        <p className="verse">"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future." - Jeremiah 29:11</p>
                                    </div>

                                    {/* Sermons Section */}
                                    <div className="sermons-section">
                                        <h5 className="sermon-title">Recent Sermons</h5>
                                        <div className="sermon-images">
                                            <Link href="/sermon-1">
                                                <img src="/sermon1.jpg" alt="Sermon 1" className="sermon-img" />
                                            </Link>
                                            <Link href="/sermon-2">
                                                <img src="/sermon2.jpg" alt="Sermon 2" className="sermon-img" />
                                            </Link>
                                            <Link href="/sermon-3">
                                                <img src="/sermon3.jpg" alt="Sermon 3" className="sermon-img" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Social Media Section */}
                                    <div className="social-media-section">
                                        <h5 className="social-title">Follow Us</h5>
                                        <div className="social-links">
                                            <a href="https://instagram.com" className="social-icon">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                            <a href="https://facebook.com" className="social-icon">
                                                <i className="fab fa-facebook"></i>
                                            </a>
                                            <a href="https://youtube.com" className="social-icon">
                                                <i className="fab fa-youtube"></i>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Extra Links */}
                                    <div className="extra-links">
                                        <h5>Useful Links</h5>
                                        <Link href="/latest-sermon" className="dropdown-button">Latest Sermon</Link>
                                        <Link href="/give" className="dropdown-button">Give</Link>
                                        <Link href="/volunteer" className="dropdown-button">Volunteer</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
