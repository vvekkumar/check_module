import React, { useEffect, useState } from 'react';
import './payment.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import DDS from '../../images/DDS1.png';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import swal from 'sweetalert';
import Navbar from '../NavBar/Navbar';


const Payment = () => {
    const history = useHistory();
    const date = new Date().toLocaleString()
    const [org, setOrg] = useState();
    const [payeeName, setPayeeName] = useState('');
    const [bank, setBank] = useState('');
    const [accnumber, setaccNumber] = useState('');
    const [chequedate, setChequeDate] = useState('');
    const [chequeAmount, setChequeAmount] = useState('');
    const [narration, setNarration] = useState('');
    const [orglist, setOrgList] = useState([]);
    const [paymentList, setPaymentList] = useState([]);
    const [bnklist, setbnkList] = useState([]);
    const [editing, setEditing] = useState(false);
    const [ids, setIds] = useState();
    const PaymentData = {
        "orgn": org,
        "bnk_id": bank,
        "pymnt_nm": payeeName,
        "pymnt_ac_no": accnumber,
        "pymnt_chq_dt": chequedate,
        "pymnt_chq_amt": chequeAmount,
        'narration': narration
    }
    const token = localStorage.getItem('user');
    const api = axios.create({
        baseURL: `http://127.0.0.1:8000/api`
    })
    useEffect(() => {
        const GetList = async () => {
            const result = await api.get("/orglist/", {
                headers: {
                    Authorization: ` Bearer ${token}`,
                }
            })
            setOrgList(result.data);
            console.log(result.data.length);
            if(result.data.length > 0){
                const list = await api.get("/pyamentlist/", {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                    }
                })
                setPaymentList(paymentList => [...paymentList,list.data]);
                const bnklist = await api.get('/bnklist/', {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                    }
                })
                setbnkList(bnklist.data);
               console.log('good')
            }else{
                swal('add organization detail','','warning')
                history.push('/organization')
            }   
        }
        GetList();
    }, [])

    const SavePayment = () => {
        setEditing(false);
        if(!org){
            swal("Please select organization", "Incorrect Input", "warning");
            return;
        }
        if(!bank){
            swal("Please select bank", "Incorrect Input", "warning");
            return;
        }
        if (!payeeName) {
            swal("Please Enter payee  Name", "Incorrect Input", "warning");
            return;
        }
        if (!bank) {
            swal("Please Enter bank Name", "Incorrect Input", "warning");
            return;
        }
        if (!accnumber) {
            swal("Please Enter account number", "Incorrect Input", "warning");
            return;
        }
        if (!chequedate) {
            swal("Please Enter cheque date", "Incorrect Input", "warning");
            return;
        }
        if (!chequeAmount) {
            swal("Please Enter cheque amount", "Incorrect Input", "warning");
            return;
        }
        if(payeeName ===paymentList.pymnt_nm && chequedate === paymentList.pymnt_chq_dt && chequeAmount === paymentList.pymnt_chq_amt ){
            swal("Please Enter cheque amount", "Incorrect Input", "warning");
            return;
        }
        listCheck();
        api.post('/payment/', PaymentData, {
            headers: {
                Authorization: ` Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
            clear();
            swal('you can add payment again','','success')
            }).catch(error => {
                console.log(error)               
            })
    }
    const listCheck = () => {
        for(const list of paymentList){
            if(list.pymnt_nm === payeeName && list.pymnt_chq_dt === chequedate &&  list.pymnt_chq_amt === chequeAmount ){
                swal("the record is already exist", "", "warning");
                return;
            }
        }
    }

    const deletePayment = (id) => {
        setEditing(false);
        api.delete(`/payment/${id}`, {
            headers: {
                Authorization: ` Bearer ${token}`,
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const editPayment = (id) => {
        setIds(id);
        setEditing(true);
        api.get(`/payment/${id}`, {
            headers: {
                Authorization: ` Bearer ${token}`,
            }
        })
            .then(res => {
                clear();
                console.log(res.data);
                setPayeeName(res.data.pymnt_nm);
                setBank(res.data.bnk_id);
                setaccNumber(res.data.pymnt_ac_no);
                setChequeDate(res.data.pymnt_chq_dt);
                setChequeAmount(res.data.pymnt_chq_amt);
                setNarration(res.data.narration);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const update = () => {
        const id = ids;
        api.put(`/payment/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                clear();
                swal("Good job!", "You record is updated", "success");
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const clear = () => {
        setPayeeName(" ");
        setaccNumber("");
        setBank("");
        setChequeDate("");
        setChequeAmount("");
        setNarration("");
    }
    const submit = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p style={{ color: 'white' }}>You want to add payment</p>
                        <button className="btn1" onClick={onClose}>No</button>
                        <button className="btn1"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Yes, Add!
              </button>
                    </div>
                );
            }
        });
    };


    return (
        <div className="dashboard">
            <Navbar />
            <div className="payment-card">
                <div><h3 className="detail">payment details</h3></div>
                <div >
                    <label className='payment-detail'>select organization</label><br />
                    <select className="select" value={org} onChange={e => setOrg(e.target.value)}>
                        <option></option>
                        {orglist.map(item =>
                            <option key={item.orgn_id} value={item.orgn_id} label={item.orgn_nm} ></option>
                        )}
                    </select>
                </div>

                <div>
                    <label className='payment-details'>select bank</label><br />
                    <select className="select" value={bank} onChange={e => setBank(e.target.value)}>
                        <option></option>
                        {bnklist.map(item =>
                            <option key={item.bnk_id} value={item.bnk_id} label={item.mstbnk_nm}></option>
                        )}
                    </select>
                </div>

                <div>
                    <label className='payment-details'>payee name</label><br />
                    <input type="text" className="input" onChange={(e) => setPayeeName(e.target.value)} />
                </div>
                <div>
                    <label className='payment-details'>account no</label><br />
                    <input type="text" className="input" onChange={(e) => setaccNumber(e.target.value)} />
                </div>
                <div>
                    <label className='payment-details'>cheque date</label><br />
                    <input type="date" className="input" value={chequedate} onChange={(e) => setChequeDate(e.target.value)} />
                </div>
                <div>
                    <label className='payment-details'>cheque amount</label><br />
                    <input type="text" className="input" onChange={(e) => setChequeAmount(e.target.value)} />
                </div>
                <div>
                    <label className='payment-details'>narration</label><br />
                    <input type="text" className="input" onChange={(e) => setNarration(e.target.value)} />
                </div>
                {editing ? (

                    <div className="paybtn">
                        <button className="btn1" >update</button>
                    </div>
                ) : (
                        <div className="paybtn">
                            <button className="btn1" onClick={SavePayment}>Save</button>
                        </div>
                    )}
            </div>
            <div className="table-list">
                <div><h2>payment list</h2></div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>payee name</th>
                            <th>bank name</th>   
                            <th>cheque date</th>
                            <th>cheque amt</th>
                            <th>Edit</th>
                            <th>Del</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentList.map(list =>
                            <tr key={list.pymnt_id}>
                                <td>{list.pymnt_nm}</td>
                                <td>{list.bnk_nm}</td>
                                <td>{list.pymnt_chq_dt}</td>
                                <td>{list.pymnt_chq_amt}</td>
                                <td><i className="fa fa-pencil" aria-hidden="true" onClick={() => { editPayment(list.pymnt_id) }}></i></td>
                                <td><i className="fa fa-trash-o" aria-hidden="true" onClick={() => { deletePayment(list.pymnt_id) }}></i></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div><button className="table-btn"><a href="/print">next</a></button></div>
            </div>
            <div className="footerPayment">
                <img className="img" src={DDS} alt="logo" />
            </div>
        </div>
    )
}

export default Payment
