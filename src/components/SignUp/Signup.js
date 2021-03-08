import React,{useState,useRef,useEffect} from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import swal from 'sweetalert';
import Header from '../header';
import { useHistory } from "react-router-dom";
import './signup.css';
import DDS  from '../../images/DDS1.png';


const Signup = () => {
	const history = useHistory();
	const {  handleSubmit } = useForm();	
	let userRef = useRef('');
	let emailRef = useRef('');
	let mobileRef =useRef('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState();
    const [user, setUser] = useState('');
    const [confirmPwd, setConfirmPwd] = useState();
	const [error,setError] = useState(false);
	const handleSignUp = () => {
		if(!user){
			swal("Please Enter username", "Incorrect Input", "warning");
			setError(true);
			return;
		}
		if (!email) {
			swal("Please Enter Email", "Incorrect Input", "warning");
			setError(true);
			return;
		  }
		  if(!mobile){
			swal("Please Enter Mobile Number", "Incorrect Input", "warning");
			setError(true);
			return;
		  }
		  if (!password || password.length < 6) {
			swal("Please Enter Password", "Incorrect Input", "warning");
			setError(true);
			return;
		  }
		 if (!confirmPwd || confirmPwd.length < 6) {
			swal("Please Enter confirm Password", "Incorrect Input", "warning");
			setError(true);
			return;
		  }
		 
        if(password !== confirmPwd){
            swal("password is not matching","","warning");
            setError(true);
            return;
		}
        const signupData = {
           "name":user,
			"email":email,
			"mobile":mobile,
			"password":password
        }
        const api = axios.create({
            baseURL: `http://127.0.0.1:8000/api`
        });
		const emailverify = () => {
            api.get('/email-verify/').then(res =>
              localStorage.setItem('user')
             )}
		api.post('/register/',signupData)
            .then(res => {
				history.push("/login");
				console.log(res.data);
            })
            .catch(error => {
				console.log(error);
                swal("Email Already registered", "", "error");
            })
	}
	const clear =function(){
		userRef.current.value ='';
		emailRef.current.value='';
		mobileRef.current.value='';
	}
	


    return (
        <div className="container">
           <Header />
        <div className="cardsignup">
		<div className="signheader"><h3>user organization</h3></div>
			<div>
			<label className="label">user name</label><br/>
			<input 
					type="text"
					className="input"		
					name="user"			
					onChange={(e) => setUser(e.target.value)} 
					ref={userRef}
					/>			
			</div>
            <div className="password">
			<label className="label">email id</label><br/>
			<input 
					type="email"
					name="email"
					className="input" 
					onChange={(e) => setEmail(e.target.value)} 
					ref={emailRef}
				/>
					
			</div>
            <div className="password">
			<label className="label">mobile number</label><br/>
			<input 
					type="number"		
					className="input"	
					name="mobile"
					onChange={(e) => setMobile(Number(e.target.value))}
					ref={mobileRef}
				 />
			</div>
            <div className="password">
			<label className="label">enter password</label><br/>
			<input 
					type="password"	
					className="input"
					name="password"				
					onChange={(e) => setPassword(e.target.value)}
					 />
			</div>
			<div className="password">
			<label className="label">confirm password</label><br/>
			<input 
				type="password"
				name="confpassword"
				className="input"
				onChange={(e) => setConfirmPwd(e.target.value)} 
				/>
			</div>	
			<div className="buttondiv">
            <button className="btnsave" type="submit" onClick={handleSignUp} >save</button>
            <button  className="btnsave" type="submit" onClick={clear}>clear</button>
            </div>
		</div>
        <div className="footer1">
			<img className="img" src={DDS} alt="logo" />
            </div>
        </div>
    )
}

export default Signup
