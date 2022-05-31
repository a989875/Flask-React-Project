import React ,{useState,useEffect} from 'react';
import { useParams ,useNavigate  } from "react-router-dom";


function ProductDetail() {

  const obj=[{
    id: 0,
    name: 'Product',
    price: 0,
    quantity: 1,
    imagelink:"white.png"
  }]

  const style1={
    height:"500px",
    width:"55%",
  }

  const style2={
    padding:"10px",
    float: "left",
    width:  "90%",
    height: "90%",
    objectFit: "cover",
  }
  
  const style3={
    margin:"32px",
    display:"flex",
    alignItems: "center"
  }

  const style4={
    fontSize:"30px",
    marginBottom:"10px"
  }

  const style5={
    fontSize:"36px",
    marginBottom:"10px"
  }
  const style6={
    marginBottom:"20px"
  }
  const style7={
    marginRight:"30px",
    width:"40%",
  }

  const style8={
    width: "80%",
    height: "38px",
    fontSize:"18px",
    marginBottom:"20px",
    size:3
  }

  const style9={
    width: "80%",
    height: "38px",
  }
  
  const [productDetail,getProductDetail]= useState(obj[0]);
  const [purchaseValue,getPurchaseValue]= useState("");
  const { productName } = useParams();
  const navigate = useNavigate();

  let fetchproductDetail = async () => {
    try {
        let res = await fetch("/item/"+productName, {
            method: "GET",
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            }});
        let resJson = await res.json();
        if (res.status === 200) {
          getProductDetail(resJson)
        }}
        catch (err) {
            console.log(err)
          }
        };

    useEffect(() => {
      fetchproductDetail();},[])

    const url= productDetail.imagelink
    var numberList =[]
     if (productDetail.quantity>50) {
       numberList= Array.from({length: 50}, (_, i) => i + 1)} else {
        numberList= Array.from({length: productDetail.quantity}, (_, i) => i + 1)
      }

    function handleChanges(e){
      getPurchaseValue(e.target.value)
    }
    
    let handleClicks = async () => {
      if (localStorage.getItem("SavedToken")){
      try {
          let res = await fetch("/send-order", {
            method: "POST",
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            "Authorization": localStorage.getItem("SavedToken")
            },
            body: JSON.stringify({
              item_name: productDetail.name,
              quantity:purchaseValue
            }),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            alert(resJson.message);
            navigate('/products')
          } else{
            alert("login expired, Please login agian")
            navigate('/login')
          }}
          catch (err) {
            console.log(err)
            }
          } else {
            alert("Haven't Login, Please login");
            navigate('/login')
          }
        };


  return (
    <div style={style3}>
        <div style={style1}>
          <img style={style2} src ={require(`../images/${url}`)} alt={url}/>
        </div>
        <div style={style7}>
        <h1 style={style5}>{productDetail.name.toUpperCase()}</h1>
        <div style={style4}>$ {productDetail.price}</div>
        <div style={style6}>Some Description Some Description Some Description Some Description Some Description Some Description
         Some Description  Some Description  Some Description</div>
         <div>
           <select style={style8} onChange={handleChanges}>
            <option value="">Select Quantity</option>
              {numberList.map(number => <option value={number} key={number}>{number}</option> )}
           </select>
           <button style={style9} type="submit" onClick={handleClicks}>Buy Now</button>
         </div>
        </div>
    </div>
  )
}


export default ProductDetail;
