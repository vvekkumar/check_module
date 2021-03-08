/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState, useEffect} from 'react';
import axios from 'axios';

const userList = () => {
    const [data,setData] = useState([]);
    useEffect( () => {
        const GetData = async () => {
            const result =await axios.get('http://127.0.0.1:8000/api');
          setData(result.data);
        }
        GetData();
    },[]);
    const deleteId = (id) =>{
        debugger;
        axios.get('http://127.0.0.1:8000/api?id' + id)
        .then((result) => {
        }) 
    }
    const editId = (id) => {    
    }
    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Payee Name</th>
                            <th>Bank Name</th>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           data.map((item,id) => {
                                return <tr>
                                    <td>{item.payeename}</td>
                                    <td>{item.bankname}</td>
                                    <td>{item.date}</td>
                                    <td>{item.amount}</td>
                                    <td>
                                        <div>
                                            <button onClick={() => editId(item.id)}>Edit</button>
                                            <button onClick={() => deleteId(item.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>   
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default userList
