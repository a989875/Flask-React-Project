import React from 'react'
import { Link } from 'react-router-dom'
import store from "../images/store.png"


function Header(props){
    let style1 ={
        display:"flex",
        height:"100px",
        paddingTop:"30px",
        paddingBottom:"30px",
        paddingLeft:"50px",
        paddingRight:"50px"
    }
    let style2 = {
        display:"flex",
        marginLeft: 'auto'
    }

    let style3={
        paddingTop:"9px",
        paddingBottom:"9px",
        paddingLeft:"20px",
        paddingRight:"20px",
        fontColor:"white",
        margin: "1% auto",
    }

    const style4={
        textAlign : "center",
        paddingRight: "50px",
        marginBottom:"10px",
     }

    function Logout(){
        fetch("logout", {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          "Authorization" : localStorage.getItem('SavedToken')
        }})
        localStorage.removeItem("SavedToken")
        window.location.reload(false);
    }

    
        

    if (localStorage.getItem('SavedToken') === null){
    return (
        <div>
        <div style={style1}>
            <div><Link to="/" ><img src={store} width="100px" alt="store" /></Link></div>
            <div style={style2} >
            <div style={style3}><Link to="/products">Products</Link></div>
            <div style={style3}><Link to="/about">About</Link></div>
            <div style={style3}><Link to="/contact">Contact Us</Link></div>
            <div style={style3}><Link to="/login" >Login</Link></div>
            <div style={style3}><Link to="/register" >Regisiter</Link></div>
            </div>
        </div>
        <div>
            <div style={style4}><h1>{props.title}</h1></div>
         </div>
         </div>

    )} else{
        return (
            <div>
            <div style={style1}>
                <div><Link to="/" ><img src={store} width="100px" alt="store"/></Link></div>
                <div style={style2} >
                <div style={style3}><Link to="/products">Products</Link></div>
                <div style={style3}><Link to="/about">About</Link></div>
                <div style={style3}><Link to="/contact">Contact Us</Link></div>
                <div style={style3}><Link to="/update" >Update Products</Link></div>
                <div style={style3}><button onClick={Logout}>Logout</button></div>
                </div>
            </div>
            <div>
                <div style={style4}><h1>{props.title}</h1></div>
            </div>
            </div>
            )
    };
};

export default Header