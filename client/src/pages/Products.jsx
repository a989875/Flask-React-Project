import React ,{useState,useEffect} from 'react';
import Header from "../components/Header.jsx";
import ProductItem from "../components/ProductItem.jsx";


function Products(){
    const style1={
        display: 'flex',
        flexWrap: "wrap",
        flexDirection: "row",
        paddingLeft:"5%",
        paddingRight:"5%",
        justifyContent:"space-around"
    };

    const headerStyle={
        paddingLeff:"5px"
    }

    const style2={
        display: 'flex',
        textAlign : "center",
        width: "50%",
        margin: "0 auto",
        justifyContent: "center"
    }

    const Buttomstyle ={
        background: "none!important",
        border: "none",
        padding: "0!important",
        color: "#069",
        textDecoration: "underline",
        margin:"15px",
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize:"15px"
    }


    const [allProductList,getAllProductList]= useState([]);
    const [categoryList,getCategoryList]=useState([]);

    let getCategory = async (e) => {
        try {
            let category = ["All Categories"]
            let res = await fetch("/items/categories", {
                method: "GET",
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                }});
            let resJson = await res.json();
            if (res.status === 200) {
                for (let i = 0; i < resJson["categories"].length; i++) {
                    if (resJson["categories"][i] !== "None"){
                    category.push(resJson["categories"][i])}
                };
                getCategoryList(category)
            }}
            catch (err) {
                
              }
            };



    let getProducts = async () => {
        try {
            let product = []
            let res = await fetch("/items", {
                method: "GET",
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                }});
            let resJson = await res.json();
            if (res.status === 200) {
                for (let i = 0; i < resJson["items"].length; i++) {
                    if (resJson["items"][i].quantity>0){
                    product.push(resJson["items"][i])
                }};
                getAllProductList(product)
                
            }}
            catch (err) {
                
              }
            };
    
    

    let handleClicks = async (e) => {
        let category = e.target.value
        let url = ""
        if (category==="All Categories"){
            url = "/items"
        }else{
           url = "/items/category/"+ e.target.value
        }
        try {
            let product = []
            let res = await fetch(url, {
                method: "GET",
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                }});
            let resJson = await res.json();
            if (res.status === 200) {
                for (let i = 0; i < resJson["items"].length; i++) {
                    product.push(resJson["items"][i])
                };
                getAllProductList(product)
                
            }}
            catch (err) {

              }
            };

    useEffect(() => {
        getCategory()
        getProducts();},[])

    return (
        <div>
            <div>
             <Header title="Our Products" style={headerStyle} />
             </div>
        <div style={style2}>
                {categoryList.map((category,index) =><button key={index} style={ Buttomstyle} value={category} onClick={handleClicks}>{category.toUpperCase()}</button>)}
        </div>
        <div style={style1}>
         {allProductList.map((product,index) =><ProductItem id={product.id} key={index} img={product.imagelink} price={product.price} name={product.name}/>)}
        </div>
    </div>
    )
};

export default Products;
