import axios from 'axios';
import React, { useEffect,useState } from 'react';
import './print.css';
import Arrow from '../Arrow/Arrow';
import DDS from '../../images/DDS1.png';
import Navbar from '../NavBar/Navbar'

const Print = () => {
    const [paymentList, setPaymentList] = useState([]);
    const token = localStorage.getItem('user');
    const api = axios.create({
        baseURL: `http://127.0.0.1:8000/api`
    })
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
        <div>
            <Navbar />
            <div className="print-card">
                <div><h2 className="step-title">print cheque</h2></div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>payee name</th>
                            <th>bank name</th>  
                            <th>cheque date</th>
                            <th>check amount</th>
                            <th>select for print</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentList.map(item =>
                                 <tr key={item.pymnt_id}>
                                 <td>{item.pymnt_nm}</td>
                                 <td>{item.bnk_nm}</td>
                                 <td>{item.pymnt_chq_dt}</td>
                                 <td>{item.pymnt_chq_amt}</td>
                                 <td><input type="checkbox" name="print" /></td>
                             </tr>
                            )}
                    </tbody>
                </table>
            </div>
            <div className="step">
                <div className="stepone">
                    <h2 className="step-title">step one</h2>
                    <h4 className="step-content">place the cheque in this way</h4>
                    <Arrow /><br />
                    <button type="submit" className="btn1"><a href="/printers">print</a></button>
                </div>

            </div>
            <div className="stepthree">
                <button type="submit" className="btn2"><a href="/verification">verify payment</a></button>
            </div>
            <div className="printfooter">
                <img className="img" src={DDS} alt="logo" />
            </div>
        </div>
    )
}

export default Print
