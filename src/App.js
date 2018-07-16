import React, { Component } from 'react';
import logo from './logo.svg';
 import './App.css';
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";
import ProductList from './productList.js';
 import LoginBut from './loginbut.js';
 import ShowCart from './showCart.js';
 import SignUp from './signup.js';
 import Cookies from 'universal-cookie';
 import Logout from './logout';
var s=0
class App extends Component {
  cookies = new Cookies(); 
  state={
    productList:null,
    isAuthenticated : false,
    seeCart:false,
    username:'',
    buttonName:'login',
    userJwtToken:''
  }
  
 
  updateLoginStatus = (isAuthenticated) => {
    this.setState({isAuthenticated})
  }

  updateUsername = (username) => {
    this.setState({username})
  }
  
  butNameHandler(name){
    
    this.setState({
        buttonName:name
    });
  }

    userNameHandler(name){
      this.setState({
          username:name
      });
    }

     tokenHandler(name) {

        this.setState({
            userJwtToken:name
        });
      }

header1() {  
  return(
   <div>
  <div className="App-header">
  <div>
  <h1 className="App-logo" ><Link to="/" style={{ textDecoration: 'none',color:'white'}} >Hay U!</Link></h1>
<div className="buttonsclass">
{
  this.cookies.get('userJwtToken')?
  <div>
    
  <Link to="/mycart"><a class="App-button">MY CART</a></Link>
  <Link to="/logout" ><a class="App-button">LOGOUT</a></Link>
  </div>:
  <div>
  
  <Link to="/login" ><a class="App-button">LOGIN</a></Link>
  </div>
  
}
  </div>
  </div>
</div>
</div>
  )
}

componentDidMount(){
  fetch("http://localhost:8000/kart/api/v1/products/",{
    method : "GET"

  })
    .then(response => { return response.json()})
    .then(responseJson => {
      this.setState({ productList: responseJson });
     
    })
    .catch(e => {
      console.log(e);
     
    });
  }   


  render() {
    return (
      
      <React.Fragment>
       
         
       <Router>
         <React.Fragment>
          <Switch>
           <Route exact path="/"
           render={(props)=>
            <ProductList productList={this.state.productList} buttonName={this.state.buttonName} isAuthenticated={this.state.isAuthenticated}
            userJwtToken={this.state.userJwtToken} headerfun={this.header1.bind(this)} {...props}/>
           }
           />
            <Route exact path="/login"
              render={(props)=>
           <LoginBut action={this.butNameHandler.bind(this)} userNameHandler={this.userNameHandler.bind(this)} tokenHandler={this.tokenHandler.bind(this)}{...props}/> 
              }
           />
           <Route exact path="/logout"
            render={(props)=>
           <Logout action={this.butNameHandler.bind(this)} userNameHandler={this.userNameHandler.bind(this)} tokenHandler={this.tokenHandler.bind(this)} {...props} />
            }
            />
           <Route exact path="/mycart"
            render={(props)=>
           <ShowCart buttonName={this.state.buttonName} headerfun={this.header1.bind(this)} {...props}/>
          }
          />
          <Route exact path="/signup"
           render={(props)=>
           <SignUp userNameHandler={this.userNameHandler.bind(this)} tokenHandler={this.tokenHandler.bind(this)}{...props}/> 
           }
           />
           </Switch>
           </React.Fragment>  
           </Router>
      </React.Fragment>
      
    );
  }
}



export default App;
