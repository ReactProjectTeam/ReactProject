import React, { useState } from "react";
import "./Signup.scss";
import eye from "../../img/login/eye.png";
import hideEye from "../../img/login/hideEye.png";

import register from "../../API/register";
import { useFormik } from "formik";
import validateRegister from "../../utils/yup/validateRegister";
import {Alert} from "react-bootstrap";
import swal from 'sweetalert';
import { useHistory,useParams } from "react-router-dom";
import ButtonCustom from "../../utils/Button/Button";
import BackdropCustom from "../../utils/Backdrop/Backdrop";
import Footer from "../../layout/Footer";



const SignupEmail = (props) => {
  const [inputTypePassword, setInputTypePassword] = useState("password");
  const [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState(
    "password"
  );
  const [checkUser, setCheckUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  let { signup } = useParams();

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


  const history = useHistory();

  const {
    handleSubmit,
    handleChange,
    isSubmitting,
    dirty,
    values: {
      email,
      password,
      confirmPassword,
    },
    errors,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validateRegister,
    onSubmit: (values) => {
      setIsLoading(true)
      register(values)
        .then((response) => {
          if (response.data.codeName === "SendConfirmEmail") {
            setIsLoading(false)
            swal("Qeydiyyat uğurlu oldu", "Qeydiyyatınızı tamamlamaq üçün emailden təsdiqləyin", "success",{
              button: "Bağla",
            }).then(()=>{
              history.push("/");
            })
          }
        })
        .catch(() => {
          setCheckUser(true);
          setIsLoading(false)
          swal("Yenidən cəhd edin", "Bu email ile istifadəçi qeydiyyatdan kechib", "warning",{
            button: "Təkrar",
          })
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
                        <h3>Qeydiyyat</h3>
                      </div>
                      <div className="form">
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-md-12">
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
                                {checkUser === true && (
                                    <Alert variant="danger">
                                      Bu email ile user qeydiyyatdan kechib
                                    </Alert>
                                )}
                                {errors.email && (
                                    <Alert variant="warning">
                                      {errors.email}
                                    </Alert>
                                )}
                              </div>
                              <div className="inputs" style={errors.password && {marginBottom: 60}}>
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
                                    <img src={inputTypePassword === "text" ? eye : hideEye} alt=""/>
                                  </button>
                                </div>
                              </div>
                              <div className="inputs" style={errors.confirmPassword && {marginBottom: 60}}>
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
                                    <img src={inputTypeConfirmPassword === "text" ? eye : hideEye} alt=""/>
                                  </button>
                                </div>
                              </div>

                              <div
                                  className="g-recaptcha"
                                  data-sitekey="6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ"
                              >
                              </div>
                              {/*<input type="submit" className="submit" value="Qeydiyyat" />*/}
                              <ButtonCustom title="Qeydiyyat"/>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2"></div>
                </div>
              </div>
            </section>
            <Footer signin={"signup"}/>
      </>

  );
};

export default SignupEmail;
