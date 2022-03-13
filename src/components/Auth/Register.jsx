import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { CLIENT_ID_FACEBOOK, CLIENT_ID_GOOGLE } from "../../assets/config";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "./Auth.css";
import { Link } from "react-router-dom";
import LocalForm from "../LocalForm/LocalForm";
import { connect } from "react-redux";
import { signUp, setGoogleUser, setFacebookUser } from "../../actions/auth";
import { animateError } from "../../actions/tests";

class Register extends Component {
  state = {
    mailValue: "",
    passwordValue: "",
    nameValue: "",
    surnameValue: "",
  };

  handleSubmit = e => {
    e.preventDefault();
    const { mailValue, passwordValue, nameValue, surnameValue } = this.state;
    const { animateError } = this.props;
    // console.log(this.props);
    const validName =
      /^[a-zA-Zа-яА-Я0-9]+(([',. -][a-zA-Zа-яА-Я0-9 ])?[a-zA-Zа-яА-Я0-9]*)*$/.test(
        nameValue
      ) && nameValue.length < 30;
    const validSurname =
      /^[a-zA-Zа-яА-Я0-9]+(([',. -][a-zA-Zа-яА-Я0-9 ])?[a-zA-Zа-яА-Я0-9]*)*$/.test(
        surnameValue
      ) && nameValue.length < 30;
    const validPass = /^[a-zA-Z0-9]{5,30}$/.test(passwordValue);
    const validMail =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(mailValue) &&
      mailValue.length < 40;
    if (!validName || !validPass || !validMail || !validSurname) {
      console.log("ERROR, PROBLEM HERE");
      animateError(
        " * Mail должен выглядеть так\n ivanov_ivanov@ivan.ivan \n * Имя и фамилия должно быть в пределах 3-30\n * Пароль должен быть в пределах 5-30"
      );
    } else {
      const body = {
        method: "post",
        signUp: {
          username: nameValue + " " + surnameValue,
          password: passwordValue,
          mail: mailValue
        }
      };
      this.props.signUp(body);
    }
  };

  handleChange = ({ target: { value }, target: { name } }) => {
    switch (name) {
      case "mail":
        this.setState({ mailValue: value });
        break;

      case "password":
        this.setState({ passwordValue: value });
        break;

      case "username":
        this.setState({ nameValue: value });
        break;

      case "surname":
        this.setState({ surnameValue: value });
        break;

      default:
        break;
    }
  };

  handleSocialLogin = async user => {
    this.props.setGoogleUser(user.accessToken);
  };

  responseFacebook = async user => {
    this.props.setFacebookUser(user.accessToken);
  };

  render() {
    document.title = "TeachMe - Регистрация";
    const { isLoad, isAuthenticated, errorMessage } = this.props;
    const { mailValue, passwordValue, nameValue, surnameValue } = this.state;
    return (
      <Fragment>
        {isAuthenticated && <Redirect to="/" />}
        {errorMessage && (
          <div className="error">
            <pre>{errorMessage}</pre>
          </div>
        )}
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
              nameValue={nameValue}
              surnameValue={surnameValue}
              viewName={true}
            />
            <div className="social-login">
              <GoogleLogin
                clientId={CLIENT_ID_GOOGLE}
                onSuccess={this.handleSocialLogin}
                scope="https://www.googleapis.com/auth/userinfo.profile"
              />
              <FacebookLogin
                appId={CLIENT_ID_FACEBOOK}
                textButton=""
                fields="name,email,picture"
                scope="public_profile"
                callback={this.responseFacebook}
                cssClass="facebook"
                icon="fab fa-facebook-f"
              />
            </div>
            <p>
              Уже зарегестрированы?
              <br /><br />
              <Link to="/signin">Вход</Link>
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
    signUp,
    setGoogleUser,
    setFacebookUser,
    animateError
  }
)(Register);
