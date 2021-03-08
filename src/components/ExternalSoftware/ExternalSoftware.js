import React from 'react';
import Header from '../header';
import './external.css';
import DDS  from '../../images/DDS1.png';

const ExternalSoftware = () => {
    return (
        <div className="container">
            <Header />
            <div className="extheader">
            <div className="orgheader"><h3>external software details</h3></div>
                <div>
                    <label>select platform</label><br />
                    <select className="select">
                        <option></option>
                        <option>tally</option>
                    </select>
                </div>
                <div  className="alingment">
                    <label>organization name</label><br />
                    <input type="text" className="input" />
                </div>
                <div className="buttondiv">
            <button className="btnsave" type="submit" >save</button>
            <button  className="btnsave" type="submit" >cancel</button>
            </div>
            </div>
            <div className="footer">
			<img className="img" src={DDS} alt="logo" />
		</div>
        </div>
    )
}

export default ExternalSoftware
