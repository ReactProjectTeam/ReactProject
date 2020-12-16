import React, { useState } from "react";
import "./Signup.scss";
import eye from "../../img/login/eye.png";
import hideEye from "../../img/login/hideEye.png";
import register from "../../API/register";
import { useFormik } from "formik";
import validateRegister from "../../utils/yup/validateRegister";
import {Alert} from "react-bootstrap";
import profileImg from "../../img/add_product/profileImg.png";
import deleteIcon from "../../img/add_product/delete.png";
import InputMask from 'react-input-mask';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

import Resizer from 'react-image-file-resizer';


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


  const history = useHistory();

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
      const phone = values.phoneNumber.split("-").join("").split(" ").join("").split("(").join("").split(")").join("");
      const formData = {
        ...values,
        photo: file.map((item) => item.file),
        phoneNumber: phone
      };
      register(formData)
          .then((response) => {
            if (response.data.codeName === "SendConfirmEmail") {
              history.push("/swal");
            }
          })
          .catch(() => {
            setCheckUser(true);
            swal("Yenidən cəhd edin", "Bu email ile istifadəçi qeydiyyatdan kechib", "warning",{
              button: "Təkrar",
            })
          });
    },
  });

  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 500, 500, 'JPEG', 100, 0,
        uri => {
          resolve(uri);
        },
        'base64'
    );
  });

  const handleChangeImg = async (event, date) => {
    const filesArr = [];
    for (const item of event.target.files) {
      const image = await resizeFile(item);
      let minimazePhoto = dataURLtoFile(image,item.name);
      filesArr.push({
        urlFront: URL.createObjectURL(minimazePhoto),
        file: minimazePhoto,
      });
    }
    setFile(filesArr);
  };

  const dataURLtoFile =(dataurl, filename)=> {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  const handleProductItemDelete = (index) => {
    const deletedItemImg = file.splice(index, 1);
    const newArray = file.filter((value) => value != deletedItemImg);
    setFile(newArray);
  };



  return (
      <section id="login_register">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="wrapper">
                <div className="header">
                  <h3>Qeydiyyat</h3>
                </div>
                <div className="form">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
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
                              <img src={inputTypePassword === "text" ? eye  :  hideEye} alt="" />
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
                              <img src={inputTypePassword === "text" ? eye  :  hideEye} alt="" />
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
                      </div>
                      <div className="col-md-6">
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
                          <InputMask
                              placeholder="Telefon nomrənizi qeyd edin"
                              name="phoneNumber"
                              id="phoneNumber"
                              onChange={handleChange}
                              value={phoneNumber}
                              mask="+\9\94 (99) 999-99-99" />
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
                                  <div className="productItem productItemSignUp" key={index} id={index}>
                                    <div className="productItemImg productItemImgSignUp">
                                      <img src={item.urlFront}/>
                                      {/*{index === 0 && (*/}
                                      {/*    <div className="d-flex justify-content-center align-items-center">*/}
                                      {/*      <img className="profileImg" src={profileImg} alt="" />*/}
                                      {/*    </div>*/}
                                      {/*)}*/}
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
                        >
                        </div>
                        <input className="submit" type="submit" value="Qeydiyyat" />

                      </div>
                    </div>


                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Signup;
