import React, { useState, useRef, useEffect } from 'react';
import DDS from '../../images/DDS1.png';
import './paymentver.css';
import axios from 'axios';
import Navbar from '../NavBar/Navbar';
import { CSVLink, CSVDownload } from "react-csv";

const PaymentVerification = () => {
    const [checked, setChecked] = useState(false);
    const [paymentList, setPaymentList] = useState([]);
    const token = localStorage.getItem('user');
    const api = axios.create({
        baseURL: `http://127.0.0.1:8000/api`
    })
    let btnRef = useRef();

    const onBtnClick = e => {
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
            setChecked(true);
        }
    }
    useEffect(() => {
        const GetData = async () => {
            const list = await api.get("/pyamentlist/", {
                headers: {
                    Authorization: ` Bearer ${token}`,
                }
            })
            setPaymentList(list.data);
            console.log(list.data);
        }
        GetData();
    }, []);
    return (
        <div className="dashboard">
            <Navbar />
            <div className="table-list">
                <div><h4 className="pending">payment verification</h4></div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>payee name</th>
                            <th>bank name</th>
                            <th>cheque date</th>
                            <th>cheque amt</th>
                            <th>cheque No</th>
                            <th>Verify</th>
                            <th>Mail</th>
                            <th>CSV</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentList.map(item =>
                            <tr key={item.pymnt_id}>
                                <td>{item.pymnt_nm}</td>
                                <td>{item.bnk_nm}</td>
                                <td>{item.pymnt_chq_dt}</td>
                                <td>{item.pymnt_chq_amt}</td>
                                <td>{item.pymnt_ac_no}</td>
                                <td><input type="checkbox" name="checked" ref={btnRef} onChange={onBtnClick} /></td>
                                <td><input type="checkbox" name="mail" disabled={!checked} /></td>
                                <td><input type="checkbox" name="cms" disabled={!checked}  /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="verificationfooter">
                <img className="img" src={DDS} alt="logo" />
            </div>
        </div>
    )
}

export default PaymentVerification
