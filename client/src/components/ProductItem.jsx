import React from 'react';
import { Link } from 'react-router-dom'

function ProductItem(props){
    const style1={
        margin:"10px",
    }

    const style2={
        height:"300px",
        width:"300px",
    };
    const style3={
        textAlign:"center",
        fontSize:"20px",
        paddingRight:"20px"
    }


    return (
        <div style={style1}>
          <div>
          <Link to={"/product/"+props.name}><img  style={style2} src={require(`../images/${props.img}`)} alt={props.name}/></Link>
          </div>
          <div style={style3}>
            <p >{props.name}</p>
            <p>${props.price}</p>
          </div>
        </div>
      );
    }

export default ProductItem;