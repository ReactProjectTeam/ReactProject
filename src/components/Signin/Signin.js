import React, { useState } from "react";
import "./Signin.scss";
import { useFormik } from "formik";
import login from "../../API/login";
import validateLogin from "../../utils/yup/validateLogin";
import { Alert } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

const Signup = (props) => {
  const [checkUser, setCheckUser] = useState(false);
  const { history } = props;
  const [cookies, setCookie] = useCookies(['token']);
  const {
    handleSubmit,
    handleChange,
    values: { email, password },
    errors,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateLogin,
    onSubmit: (values) => {
      login(values)
        .then((response) => {
          setCookie('token',response.data.data.token)
          history.push("/");
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
                        type="password"
                        placeholder="Şifrənizi qeyd edin"
                        name="password"
                        onChange={handleChange}
                        value={password}
                      />


                      <button type="button" className="view">
                        <img src="img/login/view-copy.svg" alt="" />
                      </button>
                    </div>
                    {errors.password && (
                        <Alert variant="warning">
                          {errors.password}
                        </Alert>
                    )}
                  </div>

                  <div className="remember_forgot" style={{marginTop: "15px"}}>
                    <label className="checkbox_container">
                      Yadda saxla
                      <input type="checkbox" defaultChecked={true} />
                      <span className="checkmark"></span>
                    </label>
                    {/*<a href="">Forgot password?</a>*/}
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
                  <input className="submit" type="submit" value="Daxil ol" />
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
  );
};

export default Signup;
