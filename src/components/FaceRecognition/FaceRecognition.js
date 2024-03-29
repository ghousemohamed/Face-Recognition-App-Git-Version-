import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
    return (
            <div className="center ma">
                <div className='mt2 absolute'>
                <img  id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
                {box.map((box, index) => {
                    return <div key={index} className='bounding-box' style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow}}></div>
                })}
                    {/* <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow}}></div> */}
                </div>
            </div>
    );
}

export default FaceRecognition;