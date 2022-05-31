import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import Header from "../components/Header.jsx";


function Product(){
    const style={
        paddingLeft:"5%",
        fontSize:"20px"
    }
    return(<div>
        <Header/>
        <div style={style}>
        <Link to='/products'> [Back] </Link>
        </div>
        <Outlet/>
    </div>)
}

export default Product;