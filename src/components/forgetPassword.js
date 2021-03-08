/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import DDS  from '../images/DDS1.png';

const forgetPassword = () => {
    const [email,setEmail] = useState("");

    function handleLogin(){
        if(!email){
            swal("email is incorrect","","warning");
            return;
        }
        const api = axios.create({
            baseURL: `http://127.0.0.1:8000/api`
          })

          api.post('/request-reset-email/',email)
            .then(res => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className="container">
		<h3 className="welcome">welcome to</h3>
		<h1><span className="smart">smart.</span><span className="cheque">cheque</span></h1>
		<div className="card">
			<div>
			<label className="label">email</label><br/>
			<input type="text" className="input" value={email} onChange={e => setEmail(e.target.value)} />
			</div>
			<div className="password" style={{marginTop:'30px'}}>
				<button className="btn1" type="submit" onClick={handleLogin}>forget password</button><br/>
			</div>
		</div>
		<div className="footer">
			<img className="img" src={DDS} alt="logo" />
		</div>
	</div>
    )
}

export default forgetPassword
