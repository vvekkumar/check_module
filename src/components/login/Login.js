/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import './Login1.css';
import 'typeface-josefin-sans';
import DDS  from '../../images/DDS1.png';
import Header from '../header';

const login = () => {
	const history =useHistory();
	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [error, setError] = useState(false);
	const handleLogin = () => {
		if (!email) {
			swal("Please Enter Email", "Incorrect Input", "warning");
			setError(true);
			return;
		  }
		  if (!password || password.length < 6) {
			swal("Please Enter Password", "Incorrect Input", "warning");
			setError(true);
			return;
		  }
		  const loginData ={
			"email": email,
			"password": password
		  }

		  const api = axios.create({
			baseURL: `http://127.0.0.1:8000/api`
		  })
		  api.post("/login/", loginData)
			.then(res => {
			  console.log(res.data.tokens);
			  const token = res.data.tokens.access;	
			  localStorage.setItem("user",token);
			  history.push("/payment");
			})
			.catch(error => {
			  swal("Unauthorized Access", "", "error");
			  setError(true);
			})
	}
	const register = () => {
		history.push("/Signup");
	}
    return (
		<div className="container">
			 <Header />
		<div className="card">
			<div>
			<label className="label">Username</label><br/>
			<input type="text" className="input" value={email} onChange={e => setEmail(e.target.value)} />
			</div>
			<div className="password">
			<label className="label">Password</label><br/>
			<input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
			</div>
			<div className="loginbtn">
				<button className="btn1" type="submit" onClick={handleLogin}>login</button><br/>
				<a href="/forgetPassword" className="forget">Forget password</a>
			</div>
			<div>
				<h3 className="new">new to smart.cheque?</h3>
			</div>
			<div>
				<button className="btn2" type="submit" onClick={register}>register here</button>
			</div>
		</div>
		<div className="footer">
			<img className="img" src={DDS} alt="logo" />
		</div>
	</div>
    )
}

export default login
