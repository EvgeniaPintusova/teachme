import React, { Component, Fragment } from "react";
import GoogleLogin from 'react-google-login';
import FacebookLogin from "react-facebook-login";
import { CLIENT_ID_FACEBOOK, CLIENT_ID_GOOGLE } from "../../assets/config";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Auth.css";
import { Link } from "react-router-dom";
import LocalForm from "../LocalForm/LocalForm";

import { signIn, setGoogleUser, setFacebookUser } from "../../actions/auth";
import { animateError } from "../../actions/tests";

class Login extends Component {
  state = {
    mailValue: "",
    passwordValue: ""
  };

  handleChange = ({ target: { value }, target: { name } }) => {
    name === "mail"
      ? this.setState({ mailValue: value })
      : this.setState({ passwordValue: value });
  };

  handleSubmit = async e => {
    console.log("Im here ", e);
    try {

      e.preventDefault();
      const { mailValue, passwordValue } = this.state;
  
      const { animateError } = this.props;
  
      const validPass = passwordValue
        ? /^[a-zA-Z0-9]{5,30}$/.test(passwordValue)
        : true;
      const validMail =
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(mailValue) &&
        mailValue.length < 40;
  
      if (!validPass || !validMail) {
        animateError(
          ` * Mail должен выглядеть так\n ivanov_ivanov@ivan.ivan \n * Пароль должен быть в пределах 5-30`
        );
      } else {
        const body = {
          password: passwordValue,
          mail: mailValue
        };
        await this.props.signIn(body);
      }
      console.log('kek');
    }

    catch (error) {
      debugger;
    }
  };

  handleSocialLogin = user => {
    this.props.setGoogleUser(user.accessToken);
  };

  responseFacebook = user => {
    this.props.setFacebookUser(user.accessToken);
  };

  render() {
    document.title = "TeachMe - Авторизация";
    const { isLoad, isAuthenticated, errorMessage } = this.props;
    const { mailValue, passwordValue } = this.state;
    return (
      <Fragment>
        {isAuthenticated && <Redirect to="/" />}
        {errorMessage && <pre className="error">{errorMessage}</pre>}
        {isLoad && (
          <div className="loader">
            <div className="lds" />
          </div>
        )}
        <div className="authorize">
          <div className="form">
            <LocalForm
              handleSubmit={this.handleSubmit}
              mailValue={mailValue}
              passwordValue={passwordValue}
              handleChange={this.handleChange}
              viewName={false}
            />
            <div className="social-login">
              <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                onSuccess={this.handleSocialLogin}
                scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
              />
              <FacebookLogin
                appId={CLIENT_ID_FACEBOOK}
                textButton=""
                fields="name,email,picture"
                scope="public_profile,email"
                callback={this.responseFacebook}
                cssClass="facebook"
                icon="fab fa-facebook-f"
              />
            </div>
            <br />
            <p>
              Нет учётной записи?
              <br /><br />
              <Link to="/signup">Создать учётную запись</Link>
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
    isLoad: state.auth.isLoad
  }),
  {
    signIn,
    setGoogleUser,
    setFacebookUser,
    animateError
  }
)(Login);
