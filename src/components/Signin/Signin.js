import React, { useState, useEffect } from "react";
import "./Signin.scss";
import eye from "../../img/login/eye.png";
import hideEye from "../../img/login/hideEye.png";
import { useFormik } from "formik";
import validateLogin from "../../utils/yup/validateLogin";
import { Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import ButtonCustom from "../../utils/Button/Button";
import BackdropCustom from "../../utils/Backdrop/Backdrop";
import Footer from "../../layout/Footer";
import loginUserName from "../../API/loginUserName";
import axios from "axios";
import loginFacebook from "../../API/loginFacebook";



const Signin = (props) => {
  const [checkUser, setCheckUser] = useState(false);
  const history = useHistory();
  const [cookies, setCookie] = useCookies(["token"]);
  const [inputTypePassword, setInputTypePassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    changeFooterCss();
  }, []);

  const changeTypePassword = (e) => {
    inputTypePassword === "password"
      ? setInputTypePassword("text")
      : setInputTypePassword("password");
  };
  const {
    handleSubmit,
    handleChange,
    values: { userName, password },
    errors,
  } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validateLogin,
    onSubmit: (values) => {
      setIsLoading(true);
      loginUserName(values)
        .then((response) => {
          setIsLoading(false);
          setCheckUser(true);
          setCookie("token", response.data.data.token);
          props.getLoggedIn(true);
          history.push("/");
        })
        .catch((errorResponse) => {
          setCheckUser(true);
          setIsLoading(false);
        });
    },
  });

  const changeFooterCss = () => {
    let inputs = document.getElementsByTagName("input");
    let footer = document.getElementsByTagName("footer")[0];
    Array.from(inputs).map((input) => {
      input.addEventListener("focus", function () {
        footer.style.position = "static";
      });
    });
    Array.from(inputs).map((input) => {
      input.addEventListener("blur", function () {
        footer.style.position = "fixed";
      });
    });
  };

  const login = async () => {
    setIsLoading(true);
    setCheckUser(true);
    const { authResponse } = await new Promise(window.FB.login);
    if (!authResponse) return;

    await apiAuthenticate(authResponse.accessToken);
    history.push("/");
  };

  const apiAuthenticate = async (accessToken) => {
    const account = await axios
      .get(`https://graph.facebook.com/v8.0/me?access_token=${accessToken}`)
      .then((response) => response.data);
    if (account != null) {
      loginFacebook(account.id, account.name).then((res) => {
        setCookie("token", res.data.data.token);
        props.getLoggedIn(true);
      });
    } else {
      swal("Yenidən cəhd edin", "Faceook ilə daxil olmaq alınmadı", "warning", {
        button: "Təkrar",
      });
    }
  };



  return (
    <>
      <section id="login_register">
        {isLoading && <BackdropCustom />}
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
                      <label htmlFor="userName">İstifadəçi adı</label>
                      <input
                        type="text"
                        placeholder="İstifadəçi adı qeyd edin"
                        name="userName"
                        id="userName"
                        onChange={handleChange}
                        value={userName}
                      />

                      {errors.userName && (
                        <Alert variant="warning">{errors.userName}</Alert>
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
                          <img
                            src={inputTypePassword === "text" ? eye : hideEye}
                            alt=""
                          />
                        </button>
                      </div>
                      {errors.password && (
                        <Alert variant="warning">{errors.password}</Alert>
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
                    {checkUser === true && (
                      <Alert variant="danger">
                        İstifadəçi adı və ya parolda səhvlik var
                      </Alert>
                    )}

                    <ButtonCustom title="Daxil ol" />
                    <button
                      type="button"
                      className="btn btn-facebook"
                      onClick={login}
                    >
                      <i className="fa fa-facebook mr-1"></i>
                      FACEBOOK-LA DAXIL OL
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </section>
      <Footer signin={"signin"} />
    </>
  );
};


export default Signin;
