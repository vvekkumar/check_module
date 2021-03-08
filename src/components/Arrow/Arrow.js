import React from 'react';
import './arrow.css';
import bg2 from '../../images/download.jpg';

const Arrow = () => {
    return (
        <div>
           
            <div id="arrowAnim">
            <img src={bg2} alt="cheque" style={{width:"350px",height:"140px"}} />
                <div className="arrowSliding">
                    <div className="arrow"></div>   
                </div>
                <div className="arrowSliding delay1">
                    <div className="arrow"></div>   
                </div>
                <div className="arrowSliding delay2">
                    <div className="arrow"></div>
                </div>
                <div className="arrowSliding delay3">
                    <div className="arrow"></div>
                </div><br />
                <div className="arrowSliding delay4">
                    <div className="arrow"></div>
                </div>
               
            </div>
        </div>
    )
}

export default Arrow
