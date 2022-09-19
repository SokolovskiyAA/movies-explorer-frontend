import React from 'react';
import './Main.css';
import Button from '../Button/Button';
import About from '../About/About';
import Technologies from '../Technologies/Technologies';
import Student from '../Student/Student';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';

export default function Main(props) {
    return (
        <>
            <Header
                isLoggedIn={props.isLoggedIn}
                isOpen={props.isOpen}
                onMenuOpen={props.onMenuOpen} />
            <main className='main'>
                <Promo />
                <About />
                <Technologies />
                <Student />
            </main>
            <Footer />
        </>

    );
}