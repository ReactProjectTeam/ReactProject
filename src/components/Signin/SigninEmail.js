import React, { useState,useEffect } from "react";
import "./Signin.scss";
import eye from "../../img/login/eye.png";
import hideEye from "../../img/login/hideEye.png";
import { useFormik } from "formik";
import login from "../../API/login";
import validateLogin from "../../utils/yup/validateLogin";
import { Alert } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import {Link, useHistory} from "react-router-dom";
import swal from "sweetalert";
import confirm from "../../API/confirm";
import ButtonCustom from "../../utils/Button/Button";
import BackdropCustom from "../../utils/Backdrop/Backdrop";
import Footer from "../../layout/Footer";

const Signin = (props) => {
  const [checkUser, setCheckUser] = useState(false);
  const history = useHistory();
  const [cookies, setCookie] = useCookies(['token']);
  const [inputTypePassword, setInputTypePassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);


  const changeTypePassword = (e) => {
    inputTypePassword === "password"
      ? setInputTypePassword("text")
      : setInputTypePassword("password");
  };
  const {
    handleSubmit,
    handleChange,
    isSubmitting,
    dirty,
    values: { email, password },
    errors,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateLogin,
    onSubmit: (values) => {
      setIsLoading(true)
      login(values)
        .then((response) => {
          if (response.data.codeName === "SendConfirmEmail"){
            setIsLoading(false)
            swal("Yenidən cəhd edin", "Emailinizi təsdiqləyin", "warning",{
              button: "Təkrar",
            })
            setCheckUser(false);
          }else{
            setCookie('token',response.data.data.token)
            props.getLoggedIn(true)
            history.push("/");
          }
        })
        .catch((errorResponse) => {
          setCheckUser(true);
          setIsLoading(false)
        });
    },
  });




  return (
      <>

          <section id="login_register">
            {isLoading && <BackdropCustom/>}
            <div className="container">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <div className="wrapper">
                    <div className="header">
                      <h3>Daxil ol</h3>
                    </div>
                    <div className="form">
                      <form onSubmit={handleSubmit}>
                        <div className="inputs">
                          <label htmlFor="email">Email</label>
                          <input
                              type="text"
                              placeholder="Emailinizi qeyd edin"
                              name="email"
                              id="email"
                              onChange={handleChange}
                              value={email}
                          />

                          {errors.email && (
                              <Alert variant="warning">
                                {errors.email}
                              </Alert>
                          )}
                        </div>
                        <div className="inputs">
                          <label htmlFor="password">Şifrə</label>
                          <div className="password">
                            <input
                                id="password"
                                type={inputTypePassword}
                                placeholder="Şifrənizi qeyd edin"
                                name="password"
                                onChange={handleChange}
                                value={password}
                            />


                            <button
                                onClick={changeTypePassword}
                                type="button"
                                className="view"
                            >
                              <img src={inputTypePassword === "text" ? eye  :  hideEye} alt="" />
                            </button>
                          </div>
                          {errors.password && (
                              <Alert variant="warning">
                                {errors.password}
                              </Alert>
                          )}
                        </div>
                        <div className="registerUser">
                          <div className="registerUserInside">
                            <p>Hesabınız yoxdur?</p>
                            <Link to={"/signup"}>Qeydiyyat</Link>
                          </div>
                          <div className="forgotPassword">
                            <Link to="/confirmPassword">Şifrəni unutdum</Link>
                          </div>
                        </div>
                        <div
                            className="g-recaptcha"
                            data-sitekey="6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ"
                        ></div>
                        {checkUser === true && (
                            <Alert variant="danger">
                              Email və ya parolda səhvlik var
                            </Alert>
                        )}

                        {/*<input type="submit" className="submit"  value="Daxil ol" />*/}
                        <ButtonCustom title="Daxil ol"/>

                        <div className="have_acc">
                          {/*<a href="">Don’t have an Account? Register</a>*/}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          </section>
          <Footer signin={"signin"}/>
    </>
  );
};

export default Signin;
