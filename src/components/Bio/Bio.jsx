import React from 'react'
import headshot from "/headshot.jpg"
import studio from "/studio.jpg"
import "./Bio.css"
import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";




function Bio() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  let contactUs = async () => {
    try{
    let response = await axios.post(`http://127.0.0.1:4000/form/contactUs`,
    {name, email, message},
    {headers:{
      'Content-Type':'application/json'
    }}
  )
  
  }
    
    catch(error){
      console.log(error);
    }
  }
  
  return (
    <>
    <div className="bio-container">
        <img src={headshot} alt="<Emma's headshot>" className="headshot"/>
        <div className='biocard'>
          <div id="aboutMe">

        <p>I am Emma Boyd Elliott, potter and creator of You’re Welcome Pottery. Two years ago, I began working
        with clay in sculpture and pottery classes and fell in love with making functional pottery on the wheel.
      In 2022, my husband bought me my own pottery wheel. By early 2023, I was moving into my own little
        studio in the Kreate Hub building in Nashville, Tennessee, where I spent lots of time making a mess!
        <br />
        <br />
        <br />
        </p>
      
        <img src={studio} alt="<Emma's studio>" className="studio"/>

        <p>
          <br />
          <br />
          <br />
        I am still learning and growing as an artist, and I am thrilled to be sharing my adventures in ceramics
      with you as I progress. I have also enjoyed teaching true beginners the basics of learning to throw on the
      potter’s wheel and may expand those offerings in the future.
      <br>
      </br>
     <br>
     </br>
      
      I am also a lawyer, knitter, and banana bread baker, am in a curling league, and love snuggling with my
      two three-legged dogs.
        </p>
        </div>
        </div>
    </ div>

<Box
sx ={{
  display: "flex",
  alignItems:"center",
  justifyContent: "center",
  height: "100vh"
}}
>
<Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <Typography variant="h4" align="center" mb={2} style={{color: "black"}}>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button variant="contained" type="submit" onClick={()=> {contactUs(), console.log(name,email,message)}} sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
      </Box>
      </>


  )
}

export default Bio