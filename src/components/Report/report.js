import React, { useEffect, useState } from 'react';
import './report.css';
import axios from 'axios';
import DDS from '../../images/DDS1.png';
import Navbar from '../NavBar/Navbar';


const Report = () => {
    const [item,setItem] = useState([]);
    const [lists, setList] = useState(item);
    const [category, setCategory] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const token = localStorage.getItem('user');
    const api = axios.create({
        baseURL: `http://127.0.0.1:8000/api`
    })

    //e = event for the value when select changes
    const handleFilterChange = (e, filterType) => {
        //changes state 
        switch (filterType) {
            case "category":
                setCategory(e.target.value);
                break;
            case "min":
                setMin(e.target.value);
                break;
            case "max":
                setMax(e.target.value);
                break;
            case "startDate":
                setStartDate(e.target.value);
                break;
            case "endDate":
                setEndDate(e.target.value);   
            default: break;
        }
    }
  
   useEffect(() => {
        const GetList = async () => {
        const  items =await  api.get('/payment/', {
                headers: {
                    Authorization: ` Bearer ${token}`,
                }
            })
            console.log(items.data);
             setItem(items.data);
        }
        GetList();
    },[])
 useEffect(() => {
    let filteredProducts = item;
    if(category !== ""){
        filteredProducts = filteredProducts.filter(list =>
            list.pymnt_nm.toLowerCase().includes(category.toLowerCase()))
    }
    if(min !== ""){
        filteredProducts = filteredProducts.filter(list =>
            list.pymnt_chq_amt > min)
    }
    if(max !== ""){
        filteredProducts = filteredProducts.filter(list =>
            list.pymnt_chq_amt < max)
    }
    if(startDate !== ""){
        filteredProducts = filteredProducts.filter(list => 
            list.pymnt_chq_dt.includes(startDate))
    }
    setList(filteredProducts);
    },[item,category ,min, max,startDate,endDate])
    
    return (
        <div>
            <Navbar />
            <div className="table-list">
                <div><h2>reports</h2></div>
                <div className="filter-card">
                    <div>date range<input type="text" className="date-input" onChange={(e) => handleFilterChange(e, "startDate")} /><input type="text" className="date-input"  onChange={(e) => handleFilterChange(e, "endDate")} /></div>
                    <div>payee name<input type="text" className="date-input"  onChange={(e) => handleFilterChange(e, "category")}/></div>
                    <div>amt range<input type="text" className="date-input" onChange={(e) => handleFilterChange(e, "min")}/><input type="text" className="date-input" onChange={(e) => handleFilterChange(e, "max")} /></div>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>payee name</th>
                                <th>bank name</th>
                                <th>payee a/c no.</th>
                                <th>cheque date</th>
                                <th>cheque amt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lists.map(list =>
                                <tr key={list.pymnt_id}>
                                    <td>{list.pymnt_nm}</td>
                                    <td>hdfc</td>
                                    <td>{list.pymnt_ac_no}</td>
                                    <td>{list.pymnt_chq_dt}</td>
                                    <td>{list.pymnt_chq_amt}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="footerorg">
                <img className="img" src={DDS} alt="logo" />
            </div>
        </div>
    )
}



export default Report
