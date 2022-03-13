import * as React from "react";
import testImg from '../../assets/dotest.png';
import {NavLink} from '../NavigationButton/NavigationButton';

import "./previweTest.css"

export default ({ test }) => {
    const { title, _id, description } = test;

    return (
        <li className="testview" >
            <figure>
                <img src={testImg} alt="test"/>
            </figure>
            <span className="testview-title">{title}</span>
            <span className="testview-description">{description}</span>
            <NavLink text='Start' link={`/learn/${_id}`}/>
        </li>
    )
}