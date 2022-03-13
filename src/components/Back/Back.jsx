import React from 'react';
import { Link } from 'react-router-dom';
import './Back.css';
import imgBack from '../../assets/bake.png'

export default ({link}) => (  
    <Link className='back' to={link}>
        <img src={imgBack} alt="back"/>
    </Link>
)
