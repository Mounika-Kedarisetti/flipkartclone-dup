import React, { Component } from 'react';
import './productList.css'
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";
 var s=0

class ProductList extends Component{
 
  cookies = new Cookies(); 

  addToCart(e,id) {
   
    e.preventDefault()
    var data = new FormData();
    const data1 ={ pid: id}
    data.append('pid', id);
  
    this.cookies.get('userJwtToken')?
  (
    
    fetch("http://127.0.0.1:8000/kart/api/v1/cartpro/",
    {
    method:'PUT',
    body:JSON.stringify(data1),
     headers : {'Accept': 'application/json',
                'Authorization': "JWT " +this.cookies.get('userJwtToken').token,
                'Content-Type': 'application/json'
                }
    
    //body: formData, 
   
    }).then(res=>{ return res.json()})
    .then(response => {
       
        this.props.history.push("/");
    })
    .catch(e => {
        console.log(e);
      }) 
    ):
    this.props.history.push("/login");

  }
 
    render(){
        return(

            <div>
         
              {this.props.headerfun()}

            
            {this.props.productList && this.props.productList.map((CurrentObj)=>
           <div class="container1">
           <div class="images">
             <img src={CurrentObj.image} />
             s+=parseInt({CurrentObj.cost})
        
            
           </div>
          
           <div class="product">
             <p>{CurrentObj.category}'s {CurrentObj.type}</p>
             <h1>{CurrentObj.name}</h1>
             <h2><del>&#2352;</del> {(CurrentObj.cost).toLocaleString()}</h2>
             <p class="desc">{CurrentObj.description}</p>
             <div class="buttons">
               <button class="add" class="list-button" type="submit" onClick={(e) => this.addToCart(e,CurrentObj.id)}>Add to Cart</button>
               <button class="like" class="list-button" ><span>♥</span></button>
              
             </div>
           </div>
         </div>
        
         
            )
            }
           
            </div>
            
        );
    }
}


export default ProductList;