import React, { useState, useRef } from 'react';
import './dashboard.css';
import DDS  from '../../images/DDS1.png';
import Navbar from '../NavBar/Navbar';

const Dashboard = () => {
    const [checked, setChecked] = useState(false);
    let btnRef = useRef();

    const onBtnClick = e => {
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
            setChecked(true);
        } else {
            setChecked(false);
        }
    }
    return (
        <div className="dashboard">
            <Navbar />
            <div className="table-list">
                <div><h4 className="pending">Pending Task</h4></div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>payee name</th>
                            <th>bank name</th>
                            <th>cheque date</th>
                            <th>cheque amt</th>
                            <th>cheque no</th>
                            <th>Verify</th>
                            <th>Mail</th>
                            <th>CSV</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>janak kumar</td>
                            <td>hdfc</td>
                            <td>2/09/2012</td>
                            <td>5000</td>
                            <td>12345</td>
                            <td><input type="checkbox" name="checked" ref={btnRef} onChange={onBtnClick} /></td>
                            <td><input type="checkbox" name="mail" disabled={!checked} /></td>
                            <td><input type="checkbox" name="cms" disabled={!checked} /></td>
                        </tr>
                        <tr>
                            <td>janak kumar</td>
                            <td>hdfc</td>
                            <td>2/09/2012</td>
                            <td>5000</td>
                            <td>12345</td>
                            <td><input type="checkbox" name="checked" ref={btnRef} onChange={onBtnClick} /></td>
                            <td><input type="checkbox" name="mail" disabled={!checked} /></td>
                            <td><input type="checkbox" name="cms" disabled={!checked} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="footer">
			<img className="img" src={DDS} alt="logo" />
		</div>
        </div>
    )
}

export default Dashboard
