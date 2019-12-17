import React from 'react';
import Joi from "joi-browser";
import Form from "./common-comp/form";


class RegisterForm extends Form {
    state = { 
        data: { username: "", email: "", password:""},
        errors: {}
     }

    schema = {
        email: Joi.string()
            .email()
            .required()
            .label("Email"),
        
        password: Joi.string()
            .min(5)
            .required()
            .label("Password"),
        
        username: Joi.string()
            .required()
            .label("Username") 
    }

    afterSubmit = () => {

        console.log("Registered");
      };
    
    render() { 
        return ( 
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Username", "email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("username", "Name", "text")}
                    {this.renderButton("Register")}
                </form>
            </div>
         );
    }
}
 
export default RegisterForm;