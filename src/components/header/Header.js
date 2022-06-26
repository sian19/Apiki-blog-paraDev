import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../../Assets/logo-apiki-site-01.png';

const Heade = styled.header`
width: 100%;
padding: 16px 2%;
background-color: #EBF2FA;
`

const Logo = styled.img`
width: 90px;
height: 29px;
display: block;
margin: auto;
@media(max-width: 450px){
    width: 68px;
    height: 22px;
}
`

const Center = styled.div`
max-width: 1200px;
display: flex;
justify-content: space-between;
align-items: center;
margin: auto;
`

function Header() {
    return (

        <Heade>
            <Center>
                <Logo src={logo} alt="logo tipo" />
            </Center>
        </Heade>
    )
}

export default Header;