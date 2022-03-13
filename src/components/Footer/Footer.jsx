import React from 'react';
import fsc from '../../assets/fsc.png'
import './Footer.css';

export default () => (
    <footer>
        <div className="footer">
            <a href='http://fsc.bsu.by/ru/home/'>
                <img src={fsc} alt="fsc"/>
                <span>БГУ, Факультет Социокультурных Коммуникаций.</span>
            </a>
            <span> Все права защищены © 2019</span>
        </div>
    </footer>
)
