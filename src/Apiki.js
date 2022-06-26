import React from 'react';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';

import './main.css';


function Apiki() {
    return (
        <>
            <Header />
            <main >
                <Home />
            </main >
            <Footer />
        </>
    );
}

export default Apiki;