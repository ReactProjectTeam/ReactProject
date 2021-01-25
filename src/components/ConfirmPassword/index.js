import React, {useEffect, useState} from "react";
// import "./Signin.scss";
import { useFormik } from "formik";
import login from "../../API/login";
import { Alert } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { Link, Redirect } from "react-router-dom";
import confirmPassword from "../../API/confirmPassword";
import validateConfirmPassword from "../../utils/yup/validateConfirmPassword";
import swal from "sweetalert";
import ButtonCustom from "../../utils/Button/Button";
import Footer from "../../layout/Footer";

const ConfirmPassword = (props) => {
  const [checkUser, setCheckUser] = useState(false);
  const { history } = props;

  useEffect(() => {
    changeFooterCss()
  }, []);

  const changeFooterCss=()=>{
    let inputs = document.getElementsByTagName("input");
    let footer = document.getElementsByTagName("footer")[0];

    Array.from(inputs).map(input=> {
      input.addEventListener("focus", function () {
        footer.style.position = "static";
      });
    });
    Array.from(inputs).map(input=> {
      input.addEventListener("blur", function () {
        footer.style.position = "fixed";
      });
    })
  }


  const {
    handleSubmit,
    handleChange,
    values: { email },
    errors,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validateConfirmPassword,
    onSubmit: (values) => {
        confirmPassword(values)
        .then((response) => {
          setCheckUser(true);
          swal("Əməliyyat ugurlu oldu", "Əməliyyatı tamamlamaq üçün emailden təsdiqləyin", "success",{
            button: "Bağla",
          })
          history.push("/signin");
        })
        .catch(err=>{
          swal("Əməliyyat alınmadi", "Bele istifadəçi yoxdur", "warning",{
            button: "Bağla",
          })
        })
    },
  });

  return (
      <>
        <section id="login_register">
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="wrapper">
                <div className="header">
                  <h3>Şifrəni unutdum</h3>
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
                    <div className="confirmPassworToLogin d-flex mt-3">
                      <p>Şifrəniz yadınızdadırsa daxil olun</p>
                      <Link to={"/signin"} className="ml-2" style={{color: "#ff9466"}}>Daxil ol</Link>
                    </div>
                    <div
                        className="g-recaptcha"
                        data-sitekey="6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ"
                    ></div>
                    {checkUser === true && (
                        <Alert variant="info">
                          Emailinizi yoxlayin
                        </Alert>
                    )}
                    {/*<input className="submit" type="submit" value="Təsdiqlə" />*/}
                    <ButtonCustom title="Təsdiqlə"/>

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
        <Footer confirmPassword={"confirmPassword"}/>
        </>
  );
};

export default ConfirmPassword;
