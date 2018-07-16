import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';

 import './loginbut.css'
 class SignUp extends Component{
    cookies = new Cookies(); 
    state = {
        username : "" ,
        password: "",
        email:""
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
    saveEmail = (event) => {
        const {target : {value}} = event;
        this.setState({
            email : value
        })
    }
    submit=(e) => {
        e.preventDefault();
        const {username,password,email}=this.state;
        const requestbody= `{
            "username":"`+username+`",
            "password":"`+password+`",
            "email":"`+email+`"
            }`
            fetch("http://localhost:8000/kart/api/v1/signup/",
        {
        method:'post',
        body:requestbody,
         headers : {'Accept': 'application/json','Content-type': "application/json" }
        
        })
        .then(response => {
            if(response.status==201){
                fetch("http://127.0.0.1:8000/kart/api/api-jwt-token/",{
                    method: 'post',
                    body: requestbody,
                    headers : {'Content-type': "application/json"}, 
                    }).then(response=>{return response.json();
                    }).then((myJson)=>{
                        if ('token' in myJson){
                            this.cookies.set('userJwtToken', myJson, { path: '/',expires: new Date(Date.now()+2592000)} );
                            this.cookies.set('username',username, {path : '/', expires: new Date(Date.now()+2592000)})
                            this.props.userNameHandler(username)
                            this.props.tokenHandler('token')
                            this.props.history.push("/");
                        }
                    })
                }
                else if(response.status==500)
                {
                    alert("A user with the username already exists");
                }
           
            else
            {
                this.props.history.push("/signup")
            }
        })
        }

 render(){
    return(
        <div class="login-page">
<div class="form">
<form class="register-form">
<h1>HAy u!</h1>
  <input type="text" onChange={this.saveUsername} placeholder="name"/>
  <input type="password"onChange={this.savePassword}  placeholder="password"/>
  <input type="text" onChange={this.saveEmail} placeholder="email address"/>
  <button class="loginbut" onClick={this.submit}>create</button>
  <br/>
  <br/>
  <button  onClick={()=>this.props.history.push('/login')} class="signuptext" >Login here</button>
</form>
</div>
</div>
    )
}
 }
 export default SignUp;