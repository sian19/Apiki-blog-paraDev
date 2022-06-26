import React from 'react';

import './footer.css';

import img from '../../Assets/logo-apiki-site-01.png';
import git from '../../Assets/github.png';

function Footer() {
    return (
        <footer>
            <img src={img} alt="logo footer" />
            <h3>Sean Taron Dev</h3>
            <a href="https://github.com/sian19/Apiki-blog-paraDev"><img src={git} alt="github" /></a>
        </footer>
    );
}

export default Footer;