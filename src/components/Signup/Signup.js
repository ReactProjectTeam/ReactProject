import React, { useState } from "react";
import "./Signup.scss";
import viewCopy from "../../img/login/view-copy.svg";
import register from "../../API/register";
import { useFormik } from "formik";
import validateRegister from "../../utils/yup/validateRegister";
import {Alert} from "react-bootstrap";
import profileImg from "../../img/add_product/profileImg.png";
import deleteIcon from "../../img/add_product/delete.png";
// import Index from "../../utils/Index";
import swal from 'sweetalert';

const Signup = (props) => {
  const [inputTypePassword, setInputTypePassword] = useState("password");
  const [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState(
    "password"
  );
  const [checkUser, setCheckUser] = useState(false);
  const [file, setFile] = useState([]);


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
    // validationSchema: validateRegister,
    onSubmit: (values) => {
      const formData = {
        ...values,
        photo: file.map((item) => item.file),
      };
      register(formData)
        .then(() => {
          console.log("elaaaaaaaaaaaa")
          history.push("/swal");
        })
        .catch(() => {
          setCheckUser(true);
          swal("Yenidən cəhd edin", "Bu email ile istifadəçi qeydiyyatdan kechib", "warning",{
            button: "Təkrar",
          })
        });
    },
  });

  const handleChangeImg = (event, date) => {
    const filesArr = [...file];
    for (const item of event.target.files) {
      filesArr.push({
        urlFront: URL.createObjectURL(item),
        file: item,
      });
    }
    setFile(filesArr);
  };

  const handleProductItemDelete = (index) => {
    const deletedItemImg = file.splice(index, 1);
    const newArray = file.filter((value) => value != deletedItemImg);
    setFile(newArray);
  };

  return (
    <section id="login_register">
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
                  <div className="inputs">
                    <label htmlFor="name">Ad</label>
                    <input
                      type="text"
                      placeholder="Adınızı qeyd edin"
                      name="name"
                      id="name"
                      onChange={handleChange}
                      value={name}
                    />
                    {errors.name && (
                        <Alert variant="warning">
                          {errors.name}
                        </Alert>
                    )}
                  </div>
                  <div className="inputs">
                    <label htmlFor="surname">Soyad</label>
                    <input
                      type="text"
                      placeholder="Soyadınızı qeyd edin"
                      name="surname"
                      id="surname"
                      onChange={handleChange}
                      value={surname}
                    />
                    {errors.surname && (
                        <Alert variant="warning">
                          {errors.surname}
                        </Alert>
                    )}
                  </div>
                  <div className="inputs">
                    <label htmlFor="phoneNumber">Telefon nömrəsi</label>
                    <input
                      type="text"
                      placeholder="Telefon nomrənizi qeyd edin"
                      name="phoneNumber"
                      id="phoneNumber"
                      onChange={handleChange}
                      value={phoneNumber}
                    />
                    {errors.phoneNumber && (
                        <Alert variant="warning">
                          {errors.phoneNumber}
                        </Alert>
                    )}
                  </div>
                  <div className="inputs">
                    <label htmlFor="address">Ünvan</label>
                    <input
                      type="text"
                      placeholder="Ünvanınızı qeyd edin"
                      name="address"
                      id="address"
                      onChange={handleChange}
                      value={address}
                    />
                    {errors.address && (
                        <Alert variant="warning">
                          {errors.address}
                        </Alert>
                    )}
                  </div>
                  <div className="inputs">
                    <label className="required" htmlFor="">
                      Şəkil
                    </label>
                    <div className="file-input">
                      <div className="file-input-choose">
                        <input
                            type="file"
                            className="input"
                            id="imageUpload"
                            onChange={(event) => handleChangeImg(event, new Date())}
                            onClick={(event) => {
                              event.target.value = null;
                            }}
                            style={{ display: "none" }}
                        />
                        <label
                            htmlFor="imageUpload"
                            className="btn btn-large"
                            className="inputFile"
                        >
                          Şəkil seçin
                          {file.length !== 0 && (
                              <span className="ml-2">{file.length}</span>
                          )}
                        </label>
                      </div>
                      <div className="uploadedImg">
                        {file.map((item, index) => (
                            <div className="productItem" key={index} id={index}>
                              <div className="productItemImg">
                                <img src={item.urlFront} className="mt-2" />
                                {index === 0 && (
                                    <div className="d-flex justify-content-center align-items-center">
                                      <img className="profileImg" src={profileImg} alt="" />
                                      <span>Esas şəkil</span>
                                    </div>
                                )}
                              </div>
                              <div
                                  className="productItemImgDelete"
                                  onClick={() => handleProductItemDelete(index)}
                              >
                                <img src={deleteIcon} alt={deleteIcon} />
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="remember_forgot">
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

export default Signup;
