import React, {useState} from 'react'
import { TextField, Button } from '@mui/material'
import jwt_decode from 'jwt-decode'
import "./ProductCreate.css"
import axios from 'axios'
function Auth({updateLocalStorage, email, setEmail}) {
    let [password,setPassword] = useState("")
    let [RecoverEmail, setRecoverEmail] = useState(false)
    let [forgotPassword,setForgotPassword] = useState(false)
    let [resetPassword, setResetPassword] = useState(false)
    let [otp, setOTP] = useState(undefined)
    let [userOTP, setUserOTP] = useState("")
    let [wrongCode , setWrongCode] = useState(false)
    let submitLogin = async e => {
        e.preventDefault();
        let url = "http://127.0.0.1:4000/admin/login";
        let body = { email, password };
    
        try {
          let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
              "Content-Type": "application/json"
            })
          });
          let data = await response.json();
          if (!data.token) throw Error(data.message);
          let token= data.token;
          let decodedToken = jwt_decode(token);
  
         updateLocalStorage(data.token,(decodedToken.email));
    
          
        } catch (err) {
          window.alert(err);
        }
      };


      function generateOTP() {
       let newOTP=  Math.floor(10000 + Math.random() * 9000)
        setOTP(newOTP)
        return newOTP;
        }

      let sendRecoveryEmail = async () => {
        try{
    
          let response = await axios.post(`http://127.0.0.1:4000/password/forgot/${email}`,{
            OTP: generateOTP()
          })
          setForgotPassword(false);
          setRecoverEmail(true);

        }
        catch (err){
          console.log(err);
          if ((err.response.data.message).includes("No")) {
            window.alert("No user found")
        }
      }
    }
    
    let renewPassword = () =>{
      if (userOTP == otp) {
        setRecoverEmail(false);
        setResetPassword(true)}
      else{
        setWrongCode(true);
      }
      }
    
    let updateUser = async e => {
        e.preventDefault();
        let url = `http://127.0.0.1:4000/admin/update/${email}`;
        let body = {password}
      
        try {
          let response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: new Headers({
              "Content-Type": "application/json",
            })
          });
      
          let data = await response.json();
          console.log(data)
          window.alert("Password reset")
          // Toggle the update trigger to refresh the messages
      
        } catch (err) {
          console.log(err);
        }
      };

  return ( 
    <>    
    {forgotPassword ? 
    <div id="login">
      <h2>Forgot Password</h2>
    <TextField
            type="email"
            name="email"
            id="emailLogin"
            variant='outlined'
            size='small'
            label="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
        />
        <Button variant = "contained" type="submit" onClick = {sendRecoveryEmail}>Send Email</Button>
        </div>
     :
     RecoverEmail?
     
     <div id="login">
        <h2>Enter Code</h2>
        <TextField
            type="otp"
            name="otp"
            id="otp"
            variant='outlined'
            size='small'
            label="Secret Code"
            value={userOTP}
            onChange={e => setUserOTP(e.target.value)}
            placeholder='Secret Code'
        />
        <Button variant = "contained" type="submit" onClick = {renewPassword}>Submit</Button>
        {wrongCode?  <p style={{color: "red"}}>Wrong Code. Try again</p> : <p></p>}
        </div>
        : resetPassword?
        <div id="login">
          <h2>Reset Password</h2>
        <TextField
        type="text"
        name="passwordLogin"
        id="password"
        variant='outlined'
        size='small'
        label="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Product Name"
    />
    <Button variant = "contained" type="submit" onClick = {(e) => {updateUser(e); setResetPassword(false)}}>Update Password</Button>
    </div>
    :<div id="login">
        <h2>Admin Login</h2>
        <TextField
            type="email"
            name="email"
            id="emailLogin"
            variant='outlined'
            size='small'
            label="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
        />
        <TextField
            type="password"
            name="passwordLogin"
            id="password"
            variant='outlined'
            size='small'
            label="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Product Name"
        />
        <Button variant='contained' type="submit" onClick={submitLogin}>Login </Button>
        <Button variant='contained' type='submit' onClick={() => setForgotPassword(true)}>Forgot Password</Button>

    </div>
    }
    </>
  )
}

export default Auth