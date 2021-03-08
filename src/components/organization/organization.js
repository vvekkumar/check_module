/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Header from '../header';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import './organization.css';
import DDS from '../../images/DDS1.png';

const organization = () => {
    const history = useHistory();
    const [orgName, setOrgName] = useState("");
    const [orgEmail, setOrgEmail] = useState("");
    const [orgMobile, setOrgMobile] = useState();
    const [ids, setIds] = useState();
    const [error, setError] = useState(false);
    const [orgList, setOrgList] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [editing, setEditing] = useState(false)
    const orgdata = {
        "orgn_nm": orgName,
        "orgn_email": orgEmail,
        "orgn_mobile": orgMobile,
    }
    const SaveOrg = () => {
        setEditing(false)
        if (!orgName) {
            swal("Please Enter Organization Name", "Incorrect Input", "warning");
            setError(true);
            return;
        }
        if (!orgEmail) {
            swal("Please Enter Organization Email", "Incorrect Input", "warning");
            setError(true);
            return;
        }
        if (!orgMobile) {
            swal("Please Enter Mobile Number", "Incorrect Input", "warning");
            setError(true);
            return;
        }
        const token = localStorage.getItem('user');
        console.log(token);
        const api = axios.create({
            baseURL: `http://127.0.0.1:8000/api`
        })
        api.post('/org/', orgdata, {
            headers: {
                Authorization: ` Bearer ${token}`,
            }
        })
            .then((res) => {
                clear();
                history.push("/bank");
                if (token) {
                    console.log(res.data);
                }

            }).catch((error) => {
                swal("Unauthorized Access", "", "error");
                console.log(error);
                console.log(orgdata);
            })
    }
    const deletUser = (id) => {
        setEditing(false)
        const token = localStorage.getItem('user');
        console.log(token);
        const api = axios.create({
            baseURL: `http://127.0.0.1:8000/api`
        })

        api.delete(`/org/${id}`, {
            headers: {
                Authorization: ` Bearer ${token}`,
            }
        })
            .then(result => {
                console.log(result);
                history.push("/organization");
            })
            .catch(error => {
                console.log(error);
            })
    }
    const updateUser = (id) => {
        setIds(id);
        setEditing(true);
        const token = localStorage.getItem('user');
        const api = axios.create({
            baseURL: `http://127.0.0.1:8000/api`
        })
        api.get(`/org/${id}`, {
            headers: {
                Authorization: ` Bearer ${token}`,
            }
        })
            .then(res => {
                console.log(res.data);
                setOrgName(res.data.orgn_nm);
                setOrgEmail(res.data.orgn_email);
                setOrgMobile(res.data.orgn_mobile);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const editUser = () => {
        const id = ids;
        const token = localStorage.getItem('user');
        const api = axios.create({
            baseURL: `http://127.0.0.1:8000/api`
        })
        api.put(`/org/${id}/`, orgdata, {
            headers: {
                Authorization: ` Bearer ${token}`,
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
    useEffect(() => {
        const GetData = async () => {
            const token = localStorage.getItem('user');
            console.log(token);
            const api = axios.create({
                baseURL: `http://127.0.0.1:8000/api`
            })
            const result = await api.get('/org/', {
                headers: {
                    Authorization: ` Bearer ${token}`,
                }
            });
            console.log(result.data);
            setOrgList(result.data);
           {/**  const result1= await api.get('/masterbanklist/');
            console.log(result1.data);
            setBankList(result1.data);
            */}
        };
        
        GetData();
    }, [])
    const clear = () => {
        setOrgName("");
        setOrgEmail("");
        setOrgMobile("");
       
    }
    return (
        <div className="container">
            <Header />
            <div className="orgmain">
                <div className="orgheader"><h3>register organization</h3></div>
                <div>
                    <label className="label">organization name</label><br />
                    <input type="text" className="input" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                </div>
                <div className="alingment">
                    <label className="label">email id</label><br />
                    <input type="text" className="input" value={orgEmail} onChange={e => setOrgEmail(e.target.value)} />
                </div>
                <div className="alingment">
                    <label className="label">mobile number</label><br />
                    <input type="text" className="input" value={orgMobile} onChange={e => setOrgMobile(e.target.value)} />
                </div>
                <div className="buttondiv">
                    {editing ? (
                        <Fragment>
                            <button className="btnsave" type="submit" onClick={editUser} >update</button>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <button className="btnsave" type="submit" onClick={SaveOrg} >save</button>
                                <button className="btnsave" type="submit" onClick={clear} >cancel</button>
                            </Fragment>
                        )}


                </div>
            </div>
            <div className="sync">
                <p>would you like to sync with accounting software?</p>
                <div className="buttondiv">
                    <button className="btnsave" type="submit" ><a href="/external">next</a></button>
                    <button className="btnsave" type="submit" >cancel</button>
                </div>
            </div>
            <div className="sync1">
                <div><h2>Organization list</h2></div>
                <table className="ortableg-">
                    <thead>
                        <tr>
                            <th>organization name</th>
                            <th>email id</th>
                            <th>mobile number</th>
                            <th>Edit</th>
                            <th>Del</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orgList.length > 0 ? (
                            orgList.map(user => (
                                <tr key={user.orgn_id}>
                                    <td>{user.orgn_nm}</td>
                                    <td>{user.orgn_email}</td>
                                    <td>{user.orgn_mobile}</td>
                                    <td><i onClick={() => { updateUser(user.orgn_id) }} className="fa fa-pencil " aria-hidden="true"></i></td>
                                    <td><i onClick={() => { deletUser(user.orgn_id) }} className="fa fa-trash-o" aria-hidden="true"></i></td>
                                </tr>
                            ))
                        ) : (
                                <tr>
                                    <td colSpan={3}>No users</td>
                                </tr>
                            )}

                    </tbody>
                </table>
            </div>
            <div className="footerorg">
                <img className="img" src={DDS} alt="logo" />
            </div>

        </div>
    )
}

export default organization
