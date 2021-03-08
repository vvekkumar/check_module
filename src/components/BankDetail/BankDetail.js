import React, { useState, useEffect, Fragment } from 'react';
import Navbar from '../NavBar/Navbar';
import axios from 'axios';
import './BankDetail.css';
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import swal from 'sweetalert';
import DDS from '../../images/DDS1.png';

const BankDetail = () => {
    const history = useHistory();
    const [bankEmail, setBankEmail] = useState('');
    const [org, setOrg] = useState('');
    const [bank, setBank] = useState('');
    const [orglist, setOrgList] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [userbnkList, setUserbnkList] = useState([]);
    const [editing, setEditing] = useState(false);
    const [ids, setIds] = useState();
    const BankData = {
        "orgn_id": org,
        "masterbank_id": bank,
        "bnk_msg_to": bankEmail
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

            const list = await api.get("/mstbnklist/", {
                headers: {
                    Authorization: ` Bearer ${token}`,
                }
            })
            setBankList(list.data);
            console.log(list.data);

            const banklist = await api.get('/alldata/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(banklist.data);
            setUserbnkList(banklist.data)
        }

        GetList();
    }, []);

    const SaveBankDetail = () => {
        if(!org){
            swal("Please Enter Org Name", "Incorrect Input", "warning");
            return;
        }
        if(!bank){
            swal("Please Enter bank Name", "Incorrect Input", "warning");
            return;
        }
        api.post('/savebank/', BankData, {
            headers: {
                Authorization: ` Bearer ${token}`,
            }
        })
            .then(res => {
                history.push("/login");
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const DeleteBank = (id) => {
        setEditing(false)
        api.delete(`/savebank/${id}`,{
            headers: {
                Authorization: ` Bearer ${token}`,
            } 
        })
        .then(res => {
           swal("your data is successfully deleted","","success")
        })
        .catch(error => {
            console.log(error);
        })
    }

    const edit = (id) => {
        setIds(id);
        setEditing(true);
        api.get(`/savebank${id}`,{
            headers: {
                Authorization: ` Bearer ${token}`,
            } 
        })
        .then(res => {
            setOrg(res.data.org);
            setBank(res.data.bank);
            setBankEmail(res.data.bankEmail);

        })
        .catch(error => {
            console.log(error);
        })

    }

    const Update = () => {
        const id = ids;
        api.put(`/savebank/${id}`,{
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

    return (
        <div className="dashboard">
            <Navbar />
            <div className="bank-card">
                <div><h2>Bank Detail</h2></div>
                <div>
                    <label className='payment-detail'>select organization</label><br />
                    <select className="select" value={org} onChange={e => setOrg(e.target.value)}>
                        <option>Choose an option</option>
                        {orglist.map(item =>
                            <option key={item.orgn_id} value={item.orgn_id} label={item.orgn_nm}></option>
                        )}
                    </select>
                </div>
                <div>
                    <label className='payment-detail'>select bank</label><br />
                    <select className="select bank" value={bank} onChange={e => setBank(e.target.value)}>
                        <option>Choose an option</option>
                        {bankList.map(item =>
                            <option key={item.mstbnk_id} value={item.mstbnk_id} label={item.mstbnk_nm}></option>
                        )}
                    </select>
                    <i className="fa fa-question-circle add" aria-hidden="true" data-tip data-for="registerTip"></i>
                    <ReactTooltip id="registerTip" place="top" effect="solid" type="light">
                      if bank Name is not listed.Contact Us
                     </ReactTooltip>
                </div>
                <div>
                    <label className='payment-detail'>email</label><br />
                    <input type="email" className="input" onChange={e => setBankEmail(e.target.value)} />
                </div>
                <div>
                    {editing ? (

                        <div className="paybtn">
                            <button className="btn1" onChange={Update} >update</button>
                        </div>
                    ) : (
                            <div className="paybtn">
                                <button className="btn1" onClick={SaveBankDetail}>Save</button>
                            </div>
                        )}
                </div>
            </div>
            <div className="bank-table">
                <table>
                    <thead>
                        <tr>
                            <th>organization name</th>
                            <th>bank name</th>
                            <th>email id</th>
                            <th>Edit</th>
                            <th>Del</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userbnkList.map(item =>
                            <tr key={item.bnk_id}>
                                <td>{item.orgn_nm}</td>
                                <td>{item.mstbnk_nm}</td>
                                <td>{item.bnk_msg_to}</td>
                                <td><i className="fa fa-pencil" aria-hidden="true" data-tip data-for="editTip" onClick={() => edit(item.bnk_id)}></i>
                                <ReactTooltip id="editTip" place="top" effect="solid" type="light">
                     edit
                     </ReactTooltip>
                                </td>
                                <td><i className="fa fa-trash-o" aria-hidden="true" data-tip data-for="deleteTip" onClick={() => {DeleteBank(item.bnk_id)}}></i>
                                <ReactTooltip id="deleteTip" place="top" effect="solid" type="light">
                     delete
                     </ReactTooltip>
                                </td>
                            </tr>
                        )
                        }
                        <tr>

                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="footerbank">
                <img className="img" src={DDS} alt="logo" />
            </div> 
        </div>
    )
}

export default BankDetail;
