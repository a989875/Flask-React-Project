import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from '../components/Header'

function UserProfile(){

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
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("/item/"+name, {
            method: "POST",
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              "Authorization": localStorage.getItem("SavedToken")
            },
            body: JSON.stringify({
                price: price,
                quantity: quantity,
                category:category,
                imagelink:"white.png"
            }),
          });
          let resJson = await res.json();
          if (res.status === 201) {
            setName("");
            setPrice("");
            setCategory("");
            setQuantity("");
            setMessage("Item created successfully");
            alert("Item created successfully");
            navigate('/products');
          } 
          else if(res.status === 401) {
            alert("Login Expried")
            navigate('/login');
          } else if(res.status === 400) {
            setName("");
            setPrice("");
            setCategory("");
            setQuantity("");
            setMessage(resJson.message);
          }} 
          catch (err) {
            console.log(err);
        }
        
      };


    return (
        <div><Header title="Update Product"/>
        <div style={style4}>
          <form style={style2} className="form" onSubmit={handleSubmit}>
            <input style={style1}
              required="required" 
              type="text"
              value={name}
              placeholder="Product Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input style={style1}
              required="required" 
              type="number"
              value={price}
              placeholder="Product Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input style={style1}
              required="required" 
              type="number"
              value={quantity}
              placeholder="Product Quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <input style={style1}
              required="required" 
              type="text"
              value={category}
              placeholder="Product Category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <input style={style1}
              type="text"
              placeholder="Product Image(Not Support)"
            />
    
            <button  style={style3} type="submit">Create</button>
            <br/>
            <div >{message ? <p style = {{fontSize:"30px",}}>{message}</p> : null}</div>
          </form>
        </div>
        </div>
      );
    }

export default UserProfile;
