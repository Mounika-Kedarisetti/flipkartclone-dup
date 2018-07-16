import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';
 import './loginbut.css'
 
class LoginBut extends Component{
    cookies = new Cookies(); 
    state = {
        buttonName : 'Login',
        username : "" ,
        password: ""
    }

    saveUsername = (event) => {
        const {target : {value}}  = event;
        this.setState({
            username : value
        })
    }

    savePassword = (event) => {
        const {target : {value}} = event;
        this.setState({
            password : value
        })
    }

    submit=(e) => {
        e.preventDefault();
        const {username,password}=this.state;
        var formData  = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        const requestbody= `{
            "username":"`+username+`",
            "password":"`+password+`"
            }` 
        fetch("http://127.0.0.1:8000/kart/api/api-jwt-token/",{
        method: 'post',
        body: requestbody,
        headers : {'Content-type': "application/json"}, 
        }).then(response=>{ return response.json();
        }).then((myJson)=>{
            if ('token' in myJson){
                this.cookies.set('userJwtToken', myJson, { path: '/',expires: new Date(Date.now()+2592000)} );
                this.cookies.set('username',formData.get('username'), {path : '/', expires: new Date(Date.now()+2592000)})
                this.props.userNameHandler(username)
                this.props.tokenHandler('token')
                fetch("http://localhost:8000/kart/api/v1/loginauth/",
        {
        method:'post',
        body:requestbody,
         headers : {'Content-type': "application/json"},
       
        }).then(res=>res.json())
        .then(response => {
            if (response==="successful"){
                this.setState({ isAuthenticated: "true" });
            this.props.action('logout');
            this.props.history.push("/");
            }
            else
            {
                this.props.history.push("/login");
            }
        })
        .catch(e => {
            console.log(e);
          });
        
        }})
    
      
        
    }
    gotosignup=(e) => {
        
    }
    render(){
        return(
            <div class="login-page">
  <div class="form">
    <form class="login-form">
    <h1>HAy u!</h1>
      <input type="text" onChange={this.saveUsername} placeholder="username"/>
      <input type="password" onChange={this.savePassword} placeholder="password"/>
      <button onClick={this.submit} type="submit"  class="loginbut">login</button>
      <br/>
      <br/>
      <button class="signuptext" onClick={()=>this.props.history.push('/signup')}>Sign up here</button>
    </form>
  </div>
</div>

    
        )
    }
    }
    export default LoginBut;