import * as React from 'react';
import { Link } from 'react-router-dom';
import './navStyle.css'

export const NavLink = ({text, link}) => (
    <Link className='nav_button' to={link}>{text}</Link>
)