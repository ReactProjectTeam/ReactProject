import React, { useState, useEffect } from "react";
import viewCopy from "../../img/login/view-copy.svg";
import register from "../../API/register";
import { useFormik } from "formik";
import {Alert} from "react-bootstrap";
import validateForgotPassword from "../../utils/yup/validateForgotPassword";
import forgotPassword from "../../API/forgotPassword";

const ForgotPassword = (props) => {
  const [inputTypePassword, setInputTypePassword] = useState("password");
  const [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState(
    "password"
  );
  const [checkUser, setCheckUser] = useState(false);
  const [file, setFile] = useState([]);
  useEffect(() => {
    
  }, [])

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
    },
    errors,
  } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",

    },
    validationSchema: validateForgotPassword,
    onSubmit: (values) => {
      const code = new URLSearchParams(props.location.search).get("code")
      const formData = {
        ...values,
        code: code
      };
      console.log(formData);
      forgotPassword(formData)
        .then(() => {
          history.push("/signin");
        })
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
                <h3>Şifrəni dəyiş</h3>
              </div>
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <div className="inputs" style={errors.password && {marginBottom:60}}>
                    <label htmlFor="password">Şifrə</label>
                    <div className="password">
                      <input
                        type={inputTypePassword}
                        placeholder="Şifrənizi qeyd edin"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={password}
                      />
                      {errors.password && (
                          <Alert variant="warning">
                            {errors.password}
                          </Alert>
                      )}
                      <button
                        onClick={changeTypePassword}
                        type="button"
                        className="view"
                      >
                        <img src={viewCopy} alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="inputs" style={errors.confirmPassword && {marginBottom:60}}>
                    <label htmlFor="confirmPassword">Təkrar şifrə</label>
                    <div className="password">
                      <input
                        type={inputTypeConfirmPassword}
                        placeholder="Təkrar şifrənizi qeyd edin"
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={handleChange}
                        value={confirmPassword}
                      />
                      {errors.confirmPassword && (
                          <Alert variant="warning">
                            {errors.confirmPassword}
                          </Alert>
                      )}
                      <button
                        onClick={changeTypeConfirmPassword}
                        type="button"
                        className="view"
                      >
                        <img src={viewCopy} alt="" />
                      </button>
                    </div>
                  </div>
                  <div
                    className="g-recaptcha"
                    data-sitekey="6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ"
                  ></div>
                  <input className="submit" type="submit" value="Qeydiyyat" />
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

export default ForgotPassword;
