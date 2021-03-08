import React from 'react';
import { Route, BrowserRouter,Switch } from "react-router-dom";
import organization from './components/organization/organization';
import Signup from './components/SignUp/Signup';
import ProtectedRoute from './components/GuardedRoute';
import userPayment from './components/userPayment';
import login from './components/login/Login'
import ExternalSoftware from './components/ExternalSoftware/ExternalSoftware';
import Dashboard from './components/Dashboard/Dashboard';
import Payment from './components/Payment/Payment';
import Report from './components/Report/report';
import Print from './components/Print/Print';
import PrintExample from './components/PrintExample';
import PaymentVerification from './components/paymenVerification/PaymentVerification';
import camera from './components/camera';
import forgetPassword from './components/forgetPassword';
import BankData from './components/BankDetail/BankDetail';
import Mapper from './components/Image-mapper/Mapper';



const App = () => {
    
    return (
        <div>
            <BrowserRouter>
                <Switch>
                <ProtectedRoute  path="/dashboard" component={Dashboard} /> 
                <ProtectedRoute  path="/bank" component={BankData} /> 
                <ProtectedRoute path='/payment' component={Payment} />
                <Route path='/forgetPassword' component={forgetPassword} />
                <Route path='/mapper' component={Mapper} />
                <ProtectedRoute path='/camera' component={camera} />
                <ProtectedRoute path='/printers' component={PrintExample} />
                <ProtectedRoute path="/verification" component={PaymentVerification} />
                <ProtectedRoute path='/report' component={Report} />
                <ProtectedRoute path='/print' component={Print} />
                <Route exact path="/login" component={login} />   
                <ProtectedRoute  path="/organization" component={organization} />   
                <Route path="/external" component={ExternalSoftware} />    
                <Route  path="/Signup" component={Signup} />  
                <ProtectedRoute  path="/userPayment" component={userPayment} />  
                <ProtectedRoute />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
