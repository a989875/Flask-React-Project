import React ,{useState} from "react";
import Header from '../components/Header'


function Contact(){
   const style1={
         width:"100%",
         maxWidth : "1400px",
         display : "block",
         position : "relative",
         textAlign : "center",
         paddingLeft:"20px"
   }

   const style2={
         textAlign: "Left",
         textIndent: "5px",
         width: "50%",
         margin:"10px auto",
         display: "flex",
         justifyContent:"space-between"
   }
   const style3={
      position: "relative"
   }

   const style4={
      width: "50%",
      margin: "0 auto",
      textAlign: "Left",
      textIndent: "5px",
      paddingBottom:"50px",
      height:"200px"
   }
   const style5={
      resize : "none",
      width: "100%",
      height:"100%",
      fontSize:"20px"
   }

   const style6={
      border: "1px solid rgba(0, 0, 0, 0.4)",
      width: "300px",
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

   const style7={
      appearance: "none",
      outline: "0",
      border: "3",
      padding: "10px 15px",
      borderRadius: "3px",
      fontSize: "18px",
      opacity:"0.8",
      marginTop:"10px",
      width:"100%",
    }

   const style8={
      width: "50%",
      margin: "0 auto",
   }
   const style9={
      textAlign : "center",
      paddingRight: "50px",
      marginBottom:"10px",
   }
   
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [content, setMessage] = useState("");
    
      let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("contact", {
            method: "POST",
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              email : email,
              content: content
            }),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            alert(resJson.message);
            setName("");
            setEmail("");
            setMessage("");
          }
        } catch (err) {
          console.log(err);
        }
        
      };
    
   



   return( 
      <div>
      <div><Header title="Contact"/ ></div>
      <div style={style9}><h1>Get in touch</h1></div>
         <div style={style1}>
         <form onSubmit={handleSubmit}>
            <div style={style2}>
            <div style={style3}>
               <label>Name</label>
               <input  style={style6} required="required" type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div style={style3}>
               <label>Email</label>
               <input style={style6} required="required" type="email"  placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            </div>
            <div style={style4}>
               <label>Message</label>
               <br />
               <textarea style={style5} id='content' value={content} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <div style={style8}>
            <button style={style7} >Submit</button>
            </div>
         </form>
         </div>
       </div>
   ) 
}

export default Contact;