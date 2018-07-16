import React, { Component } from 'react';
import './loginbut.css'
import './productList.css'
import Cookies from 'universal-cookie';
var s=0
class ShowCart extends Component
{
  cookies = new Cookies(); 
    state={
        cartList:null,
        total:0,
        loaded:0
      }
      getTotalString(x)
      {
        x=x.toString();
var lastThree = x.substring(x.length-3);
var otherNumbers = x.substring(0,x.length-3);
if(otherNumbers != '')
    lastThree = ',' + lastThree;
var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
return res
      }
      removeFromCart=(id)=> {
        const data1 ={ pid: id}
        fetch("http://127.0.0.1:8000/kart/api/v1/cartpro/",
        {
        method:'DELETE',
        body:JSON.stringify(data1),
         headers : {'Authorization': "JWT "+this.cookies.get("userJwtToken").token,'Content-type': "application/json"}
       
        })
        .then(response => {
            this.forceUpdate();
              this.props.history.push("/mycart");
        })
        .catch(e => {
            console.log(e);
          }); 
    
      }
    componentDidMount(){

        fetch("http://127.0.0.1:8000/kart/api/v1/cartpro/",
       
    {
    method:'GET',
     headers : {'Authorization': "JWT " +this.cookies.get('userJwtToken').token,'Accept': 'application/json'}
    
   
    }) .then(response => response.json())
    .then(responseJson => {
        this.setState({ cartList: responseJson });
        s=0;
        const pros=this.state.cartList
      for (let i = 0; i < pros.length; i++) {
        s += pros[i].cost;
      }
      this.setState({total:s})
      this.setState({loaded:1})
  
    })
    .catch(e => {
        console.log(e);
      }); 

  }

render()
{
  
    return(
      <React.Fragment>
        {this.props.headerfun()}
       
       {this.cookies.get('userJwtToken')?
       <div>
        <div>
      {this.state.cartList && this.state.cartList.map((CurrentObj)=>
     <div class="container1">
     <div class="images">
       <img src={CurrentObj.image} />
     </div>
     
     <div class="product">
       <p>{CurrentObj.category}'s {CurrentObj.type}</p>
       <h1>{CurrentObj.name}</h1>
       <h2><del>&#2352;</del> {(CurrentObj.cost).toLocaleString()}</h2>
       <p class="desc">{CurrentObj.description}</p>
       <div class="buttons">
               <button className="list-button" onClick={()=>{this.removeFromCart(CurrentObj.cartid)}}>Remove</button>
             </div>
      
     </div>
   </div>
  
   
      )
      }
     
    
      </div>
      {this.state.loaded ?
      <div class="footer">
      <div >total:{this.getTotalString(this.state.total)}</div>
      <button className="list-button pull-right">Check-Out</button>
      </div>
      :
      <div/>
      }
      </div>
      
      
      :
      this.props.history.push("/login")
    }
      </React.Fragment>
    )
}
}
export default ShowCart;



