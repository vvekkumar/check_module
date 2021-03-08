/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState,useEffect} from 'react';
import axios from 'axios';

const userEditPayment = (props) => {
    const [detail ,setDetail] = useState({Id:'',payeeName:'',bankName:'',date:'',amount:''});
   
    const URL= `http://127.0.0.1:8000/api`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(URL);
            setDetail(result.data);
        }
        GetData();
    }, []);

    return (
        <div>
            <div>
                <div><h1>Update payment Detail</h1></div>
                <div>
                    <label>Payee Name</label>
                    <input 
                        type="text" 
                        placeholder="payee name" 
                        name="payeename" 
                        onChange={e => setDetail.payeeName(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Bank Name</label>
                    <input 
                        type="text" 
                        placeholder="Bank Name" 
                        name="bankName" 
                        onChange={e => setDetail.bankName(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Date</label>
                    <input 
                        type="date" 
                        placeholder="Date" 
                        name="date" 
                        onChange={e => setDetail.data(e.target.value)}
                    />
                </div>
                <div>
                    <label>Amount</label>
                    <input 
                        type="text" 
                        placeholder="Amount" 
                        name="amount" 
                        onChange={e => setDetail.amount(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default userEditPayment
