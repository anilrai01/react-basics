import React from "react";
import Joi from "joi-browser";
import Form from "./common-comp/form";

class LogInForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  afterSubmit = () => {
    console.log("Submitted");
  };

  render() {

    return (
      <div>
        <h1>LogIn</h1>
        <form onSubmit={this.handleSubmit}>
         {this.renderInput("username", "Username", "text")}
         {this.renderInput("password", "Password", "password")}
         {this.renderButton("LogIn")}
        </form>
      </div>
    );
  }
}

export default LogInForm;
