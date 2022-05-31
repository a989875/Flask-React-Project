import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from '../components/Header'


function Register() {
  const style1={
      border: "1px solid rgba(0, 0, 0, 0.4)",
      width: "250px",
      borderRadius: "3px",
      fontFamily: "Source Sans Pro, sans-serif",
      padding: "10px 15px",
      margin: "0 auto 10px auto",
      display: "block",
      textAlign: "center",
      fontSize: "18px",
      fontWeight: "300",
      opacity:"0.6",
    }
  const style2={
      padding: "0 50px 0 0 ",
      position: "relative"
    
  }
  const style3={
    appearance: "none",
    outline: "0",
    border: "3",
    padding: "10px 15px",
    borderRadius: "3px",
    width: "250px",
    fontSize: "18px",
    opacity:"0.8",
    marginTop:"10px",
  }

  const style4={
    padding: "20px 0",
    textAlign: "center",
  }



  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("register", {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password : password,
          email: email,
          phone: mobileNumber
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setName("");
        setEmail("");
        setMobileNumber("");
        setPassword("");
        setMessage("User created successfully")
        alert("User created successfully")
        navigate('/login');;
        ;
      } else {
        setName("");
        setEmail("");
        setMobileNumber("");
        setPassword("");
        setMessage(resJson.message)
        ;
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <div><Header title="Regisiter"/>
    <div style={style4}>
      <form style={style2} className="form" onSubmit={handleSubmit}>
        <input style={style1}
          required="required" 
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />
        <input style={style1}
          required="required" 
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input style={style1}
          required="required" 
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input style={style1}
          required="required" 
          type="text"
          value={mobileNumber}
          placeholder="Mobile Number"
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        <button  style={style3} type="submit">Create</button>
        <br/>
        <div >{message ? <p style = {{fontSize:"30px",}}>{message}</p> : null}</div>
      </form>
    </div>
    </div>
  );
}



export default Register;
