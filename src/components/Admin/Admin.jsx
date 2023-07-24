import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';

import ProductCreate from './ProductCreate'
import ProductCardUpdate from './ProductCardUpdate'
import Register from './register'
import Auth from './auth'
function Admin() {
  let [token, setToken] = useState(undefined);
  let [email,setEmail] = useState("")
  let [productCreated, setProductCreated] = useState(false);

  let updateLocalStroage = (newToken, userEmail) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('email', userEmail);
    setToken(newToken)
    setEmail(userEmail);
  };

  let checkLogin = () => {
    let storedToken = localStorage.getItem('token');
    if (storedToken) {setToken(storedToken);}
    let storedEmail = localStorage.getItem('email')
    if (storedEmail) {setEmail(storedEmail);}
  }
  useEffect(()=>
  {
    checkLogin();
  }, [token])


  // Logout function
  let logout = () => {
    localStorage.clear();
    setToken(undefined);
    location.reload();
  };

  return (
    <>
    <div>
      {!token?(
        <Auth updateLocalStorage={updateLocalStroage} email={email} setEmail={setEmail} />) :(
          <>
        <h3>Welcome: {email} </h3>
        <Button variant="contained" onClick={logout}>Logout</Button>
        <Register />
        <ProductCreate setProductCreated = {setProductCreated} productCreated={productCreated} />
        <ProductCardUpdate productCreated = {productCreated}/>
        
        </>)}
    </div>
    </>
  )
}

export default Admin