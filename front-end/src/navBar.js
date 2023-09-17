
import React from "react";
import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <nav className='nav'>
            <li>
            
            <Link to="/">
                    <button className='navBut-link'>
                        Home
                    </button>
                </Link>
                <Link to="/data">
                    <button className='navBut-link'>
                        Data
                    </button>
                </Link>
                <Link to="/about">
                    <button className='navBut-link'>
                        About 
                    </button>
                </Link>
                <Link to="/page2">
                    <button className='navBut-link'>
                         Page 2
                    </button>
                </Link>
            </li>
        </nav>
    );
}