/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const userPayment = () => {
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();
    const  currentDateTime= Date().toLocaleString();
    const [selectedDate, setSelectedDate] = useState(currentDateTime);
    const [payeeName,setPayeeName] = useState("");
    const [bankName,setBankName] = useState("");
    const [amount,setAmountName] = useState("");
    console.log(selectedDate);

        const saveUserDeatil = (e) => {
            e.preventDefault();  
            debugger; 
            const data = {
                "PayeeName":payeeName,
                "BankName":bankName,
                "Date":selectedDate,
                "amount":amount
            }
            const api = axios.create({
                baseURL: `http://127.0.0.1:8000/api`
            });
            api.post('/register', data)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
        }     

    return (
        <div className='section'>
            <div className='form-container1'>
                <div className="header"><h1>Payments</h1></div>
                <div className="control">
                    <label>Payee Name:</label>
                    <input 
                        type="text" 
                        placeholder="payeename" 
                        name="payeename" 
                        onChange={e => setPayeeName(e.target.value)}
                        ref={register({ required: true })}
                    />
                     {errors.payeename && <p className="danger">This payeeName is required</p>}
                </div>
                <div className="control">
                    <label>Bank Name:</label>
                    <input 
                        type="text" 
                        placeholder="Bank Name" 
                        name="bankname" 
                        onChange={e =>setBankName(e.target.value)} 
                        ref={register({ required: true })}
                    />
                     {errors.bankname && <p className="danger">This bankName is required</p>}
                </div>
                <div className="control">
                    <label>Date:</label>
                    <input 
                            type="date" 
                            placeholder="date" 
                            name="date" 
                            onChange={e => setSelectedDate(e.target.value)}
                            ref={register({ required: true })}
                    />
                     {errors.date && <p className="danger">This Date is required</p>}
                </div>
                <div className="control">
                    <label>Amount</label>
                    <input 
                        type="number" 
                        placeholder="amount" 
                        name="amount"
                        onChange={e => setAmountName(e.target.value)}
                        ref={register({ required: true })}
                    />
                     {errors.amount && <p className="danger">This amount is required</p>}
                </div>
            </div>
        </div>
    )
}

export default userPayment;
