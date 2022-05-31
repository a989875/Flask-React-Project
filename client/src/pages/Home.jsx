import React from 'react';
import Header from '../components/Header'
import open from "../images/open.jpeg"

function Home(){
    let style1 = {
        display:"flex",
        paddingTop:"10px",
        margin:"0 auto"
        
    }


    return (<div>
        <Header/>
        <div style={style1}>
        <div style={style1}><img src={open} width = "1000px" alt="Home" margin="30px"/></div>
        </div>
    </div>)
};

export default Home;