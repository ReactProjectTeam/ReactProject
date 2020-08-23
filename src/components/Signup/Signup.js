import React, { useState } from "react";
import "./Signup.scss";
import viewCopy from "../../img/login/view-copy.svg";
import register from "../../API/register";
import { useFormik } from "formik";
import validateRegister from "../../utils/yup/validateRegister";

const Signup = (props) => {
  const [inputTypePassword, setInputTypePassword] = useState("password");
  const [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState(
    "password"
  );
  const [checkUser, setCheckUser] = useState(false);

  const changeTypePassword = (e) => {
    inputTypePassword === "password"
      ? setInputTypePassword("text")
      : setInputTypePassword("password");
  };
  const changeTypeConfirmPassword = (e) => {
    inputTypeConfirmPassword === "password"
      ? setInputTypeConfirmPassword("text")
      : setInputTypeConfirmPassword("password");
  };



  const { history } = props;

  const {
    handleSubmit,
    handleChange,
    values: {
      email,
      password,
      confirmPassword,
      name,
      surname,
      phoneNumber,
      address,
    },
    errors,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      surname: "",
      phoneNumber: "",
      address: "",
    },
    validationSchema: validateRegister,
    onSubmit: (values) => {
      register(values)
        .then(() => {
          history.push("/signin");
        })
        .catch(() => {
          setCheckUser(true);
        });
    },
  });

  return (
    <section id="login_register">
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="wrapper">
              <div className="header">
                <h3>Register</h3>
              </div>
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <div className="inputs">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      placeholder="Your email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      value={email}
                    />
                    {checkUser === true &&
                      "Bu email ile user qeydiyyatdan kechib"}
                    {errors.email ? errors.email : null}
                  </div>
                  <div className="inputs">
                    <label htmlFor="password">Password</label>
                    <div className="password">
                      <input
                        type={inputTypePassword}
                        placeholder="Your password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={password}
                      />
                      {errors.password ? errors.password : null}
                      <button
                        onClick={changeTypePassword}
                        type="button"
                        className="view"
                      >
                        <img src={viewCopy} alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="inputs">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="password">
                      <input
                        type={inputTypeConfirmPassword}
                        placeholder="Your confirm password"
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={handleChange}
                        value={confirmPassword}
                      />
                      {errors.confirmPassword ? errors.confirmPassword : null}
                      <button
                        onClick={changeTypeConfirmPassword}
                        type="button"
                        className="view"
                      >
                        <img src={viewCopy} alt="" />
                      </button>
                    </div>
                  </div>

                  <div className="inputs">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      name="name"
                      id="name"
                      onChange={handleChange}
                      value={name}
                    />
                    {errors.name ? errors.name : null}
                  </div>
                  <div className="inputs">
                    <label htmlFor="surname">Surname</label>
                    <input
                      type="text"
                      placeholder="Your surname"
                      name="surname"
                      id="surname"
                      onChange={handleChange}
                      value={surname}
                    />
                    {errors.surname ? errors.surname : null}
                  </div>
                  <div className="inputs">
                    <label htmlFor="phoneNumber">PhoneNumber</label>
                    <input
                      type="text"
                      placeholder="Your phoneNumber"
                      name="phoneNumber"
                      id="phoneNumber"
                      onChange={handleChange}
                      value={phoneNumber}
                    />
                    {errors.phoneNumber ? errors.phoneNumber : null}
                  </div>
                  <div className="inputs">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      placeholder="Your address"
                      name="address"
                      id="address"
                      onChange={handleChange}
                      value={address}
                    />
                    {errors.address ? errors.address : null}
                  </div>
                  <div className="remember_forgot">
                    <label className="checkbox_container">
                      Remember me
                      <input type="checkbox" defaultChecked={true} />
                      <span className="checkmark"></span>
                    </label>
                    {/*<a href="">Forgot password?</a>*/}
                  </div>
                  <div
                    className="g-recaptcha"
                    data-sitekey="6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ"
                  ></div>
                  <input className="submit" type="submit" value="Register" />
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
