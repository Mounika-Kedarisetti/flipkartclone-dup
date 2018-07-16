import React, { Component } from 'react'
import Cookies from 'universal-cookie';
class Logout extends Component{
    cookies = new Cookies(); 
    logout()
    {
    fetch("http://localhost:8000/kart/api/v1/logout/",
    {
      method:"GET"
    }).then(res=>res.json())
    .then(response => {
        this.cookies.remove('userJwtToken')
        this.props.history.push("/")})
    }

render(){
    this.logout()
    return(null)
        
    }
}
export default Logout;
    