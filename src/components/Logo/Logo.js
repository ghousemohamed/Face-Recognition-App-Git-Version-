import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import brain from './brain.png';

const Logo = ({onClickCounter}) => {
    return (
        <div className='center'>
        <div className='ma4 mt0 flex'>
            <Tilt className="Tilt br2 shadow-2 mr3 pa2" options={{ max : 45 }} style={{ height: 100, width: 100 }} >
                <div onClick={onClickCounter} className="Tilt-inner grow clickbutton"> <img style={{paddingTop: '3px', paddingLeft: '2px', height:80, width: 80 }} alt='logo' src={brain}></img> </div>
            </Tilt>
        </div>
        </div>
    );
}


export default Logo;