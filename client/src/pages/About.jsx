import React from "react";
import Header from '../components/Header'
function About(){
    const style1={
      fontSize:"36px",
      textAlign:"center",
    }
   return (
   <div><Header title="About"/>
    <h1 style={style1}>This is a online shopping website!</h1>
    </div>
  )
};

export default About;