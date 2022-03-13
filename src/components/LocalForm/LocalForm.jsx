import React, { Fragment } from "react";
import AuthInput from "../AuthInput/AuthInput";
import user from "../../assets/employee.svg";
import lock from "../../assets/lock.svg";
import mail from "../../assets/mail.svg";

export default ({
  nameValue,
  mailValue,
  passwordValue,
  handleSubmit,
  handleChange,
  children,
  viewName,
  surnameValue
}) => (
  <Fragment>
    {children}
    <form className="editPlace" onSubmit={handleSubmit}>
      {viewName && (
        <>
          <AuthInput
            className="name"
            src={user}
            type="text"
            placeholder="Имя"
            name="username"
            value={nameValue}
            onChange={handleChange}
          />
          <AuthInput
            className="name"
            src={user}
            type="text"
            placeholder="Фамилия"
            name="surname"
            value={surnameValue}
            onChange={handleChange}
          />
        </>
      )}
      <AuthInput
        className="mail"
        src={mail}
        type="mail"
        placeholder="Электронная почта"
        value={mailValue}
        onChange={handleChange}
      />
      <AuthInput
        className="pass"
        src={lock}
        type="password"
        placeholder="Пароль"
        value={passwordValue}
        onChange={handleChange}
      />
      <div className="btn">
        <button type="submit">Войти</button>
      </div>
    </form>
  </Fragment>
);
