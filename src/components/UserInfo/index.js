import React, { Component, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import user_info from "../../img/user_info/person.png";
import eye from "../../img/login/eye.png";
import hideEye from "../../img/login/hideEye.png";
import noPhoto from "../../img/user_info/noPhoto.jpg"
import { useCookies } from "react-cookie";
import getUserByToken from "../../API/getUserByToken";
import { useFormik } from "formik";
import validateUserInfo from "../../utils/yup/validateUserInfo";
import putUpdateUser from "../../API/putUpdateUser";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import isEmpty from "lodash/isEmpty";
import login from "../../API/login";
import swal from "sweetalert";
import profileImg from "../../img/add_product/profileImg.png";
import deleteIcon from "../../img/add_product/delete.png";
import { Alert } from "react-bootstrap";
import Context from "../../Context/context";
import Crop from "./Crop";
import InputMask from "react-input-mask";
import BackdropCustom from "../../utils/Backdrop/Backdrop";
import Resizer from "react-image-file-resizer";
import Footer from "../../layout/Footer";

const UserInfo = () => {
  const [cookies] = useCookies(["token"]);
  const [isLoadingTab, setIsLoadingTab] = useState(true);
  const [published, setPublished] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [created, setCreated] = useState([]);
  const [updated, setUpdated] = useState([]);
  const [file, setFile] = useState([]);
  const [rendering, setRendering] = useState(false);
  const [user, setUser] = useState({});
  const { renderingHandle } = useContext(Context);
  const [inputTypePassword, setInputTypePassword] = useState("password");
  const [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState(
      "password"
  );
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (!isEmpty(user)) {
      setPublished(
        user.productResponses.filter((item) => item.status === "Published")
      );
      setDeleted(
        user.productResponses.filter((item) => item.status === "Deleted")
      );
      setCreated(
        user.productResponses.filter((item) => item.status === "Created")
      );
      setUpdated(
          user.productResponses.filter((item) => item.status === "Updated")
      );
      setIsLoadingTab(false);
    }
  }, [user]);

  useEffect(() => {
    !isEmpty(cookies) &&
      getUserByToken(cookies.token).then((responseUser) => {
        if (responseUser.status === 200) {
          setUser(responseUser.data.data);
        }
      });
  }, [rendering]);

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

  const {
    handleSubmit,
    handleChange,
    values: {
      userId,
      userName,
      surname,
      name,
      phoneNumber,
      address,
      photo,
      password,
      confirmpassword,
    },
    errors,
  } = useFormik({
    initialValues: {
      // userId: user.id,
      // email: user.email,
      userName: user.userName || "",
      name: user.name || "",
      surname: user.surname || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      // photo: user.photo,
      // password: "050284871878",
      // confirmpassword: "Nizami",
    },
    validationSchema: validateUserInfo,
    enableReinitialize: true,
    onSubmit: (values) => {
      const phone = values.phoneNumber
        .split("-")
        .join("")
        .split(" ")
        .join("")
        .split("(")
        .join("")
        .split(")")
        .join("");
      const formData = {
        ...values,
        photo: file.map((item) => item.file),
        userId: user.id,
        phoneNumber: phone,
      };

      setIsLoading(true);

      putUpdateUser(cookies.token, formData)
        .then(() => {
          setIsLoading(false);
          swal(
            "Uğurla yeniləndi",
            "Daxil etdiyiniz məlumatlar dəyişdirildi",
            "success",
            {
              button: "Bağla",
            }
          );
        })
        .then(() => {
          setRendering(!rendering);
          renderingHandle(!rendering);
        });
    },
  });

  const handleProductItemDelete = (index) => {
    const deletedItemImg = file.splice(index, 1);
    const newArray = file.filter((value) => value != deletedItemImg);
    setFile(newArray);
  };

  const resizeFile = (file) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            600,
            600,
            "JPEG",
            100,
            0,
            (uri) => {
              resolve(uri);
            },
            "base64"
        );
      });

  const handleChangeImg = async (event, date) => {
    const filesArr = [];
      for (const item of event.target.files) {
        let typeEvent = item.type.substring(item.type.indexOf("/")+1);
        if (typeEvent == "HEIF" || typeEvent == "HEIC" || typeEvent == "jpg" || typeEvent == "jpeg" || typeEvent == "gif" || typeEvent == "png"){
          const image = await resizeFile(item);
          let minimazePhoto = dataURLtoFile(image, item.name);
          filesArr.push({
            urlFront: URL.createObjectURL(minimazePhoto),
            file: minimazePhoto,
          });
        }
      }

    setFile(filesArr);
  };

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const getFileCropper = (data) => {
    const filesArr = [];
    for (const item of data) {
      filesArr.push({
        urlFront: URL.createObjectURL(item),
        file: item,
      });
    }
    setFile(filesArr);
  };

  return (
    <>
        <section id="userInfo">
          {isLoading && <BackdropCustom/>}
          <div className="container">
            <div className="userInfoHeader">
              <h5>Şəxsi kabinet</h5>
            </div>
            <div className="information">
              <div className="row">
                <div className="col-md-5">
                  <div className="information_left">
                    <div className="information_left_inside">
                      {user.photo != null ? (
                          <img
                              src={
                                user.photo &&
                                `https://pricegroup.az/api/userimage/${user.photo}`
                              }
                              alt={user.photo}
                          />
                      ) : (
                          <img src={noPhoto} alt={noPhoto}/>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="information_right">
                    <div className="form">
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="inputs">
                              <div className="emailInfo">
                                <label htmlFor="userName">Email</label>
                                <p>{user.email}</p>
                              </div>
                            </div>
                            <div className="inputs">
                              <label htmlFor="password">Şifrə</label>
                              <div className="password">
                                <input
                                  type={inputTypePassword}
                                  placeholder="Şifrənizi qeyd edin"
                                  name="password"
                                  id="password"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}

                                />
                                {errors.password && (
                                  <Alert variant="warning">
                                    {errors.password}
                                  </Alert>
                                )}
                                {/*{errors.password ? errors.password : null}*/}
                                <button
                                    onClick={changeTypePassword}
                                    type="button"
                                    className="view"
                                >
                                  <img
                                    src={
                                      inputTypePassword === "text"
                                        ? eye
                                        : hideEye
                                    }
                                    alt=""
                                  />
                                </button>
                              </div>
                            </div>
                            <div className="inputs">
                              <label htmlFor="confirmPassword">
                                Təkrar şifrə
                              </label>
                              <div className="password">
                                <input
                                  type={inputTypeConfirmPassword}
                                  placeholder="Təkrar şifrənizi qeyd edin"
                                  name="confirmPassword"
                                  id="confirmPassword"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}

                                />
                                {errors.confirmPassword && (
                                  <Alert variant="warning">
                                    {errors.confirmPassword}
                                  </Alert>
                                )}
                                {/*{errors.confirmPassword ? errors.confirmPassword : null}*/}
                                <button
                                  onClick={changeTypeConfirmPassword}
                                  type="button"
                                  className="view"
                                >
                                  <img
                                    src={
                                      inputTypeConfirmPassword === "text"
                                        ? eye
                                        : hideEye
                                    }
                                    alt=""
                                  />
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
                                // defaultValue={user.name}
                              />

                              {errors.name && (
                                <Alert variant="warning">{errors.name}</Alert>
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
                              {/*{errors.surname ? errors.surname : null}*/}
                            </div>
                            <div className="inputs">
                              <label htmlFor="phoneNumber">
                                Telefon nömrəsi
                              </label>
                              <InputMask
                                placeholder="Telefon nomrənizi qeyd edin"
                                name="phoneNumber"
                                id="phoneNumber"
                                onChange={handleChange}
                                value={phoneNumber}
                                mask="+\9\94 (99) 999-99-99"
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
                              {/*{errors.address ? errors.address : null}*/}
                            </div>
                            <div className="inputs">
                              <label className="required" htmlFor="">
                                Şəkil
                              </label>
                              {/*<Crop file={file} getFileCropper={getFileCropper}/>*/}
                              <div className="file-input fileInputUserInfo">
                                <div className="file-input-choose">
                                  <input
                                      type="file"
                                      className="input"
                                      id="imageUpload"
                                      onChange={(event) =>
                                          handleChangeImg(event, new Date())
                                      }
                                      onClick={(event) => {
                                        event.target.value = null;
                                      }}
                                      style={{ display: "none" }}
                                  />
                                  <label
                                      htmlFor="imageUpload"
                                      className="btn btn-large"
                                      className="inputFile inputFileCustom"
                                  >
                                    Şəkil seçin
                                    {file.length !== 0 && (
                                        <span className="ml-2">
                                        {file.length}
                                      </span>
                                    )}
                                  </label>
                                </div>

                                <div className="uploadedImg">
                                  {file.map((item, index) => (
                                      <div
                                          className="productItem"
                                          key={index}
                                          id={index}
                                      >
                                        <div className="productItemImg">
                                          <img
                                              src={item.urlFront}
                                              className="mt-2"
                                          />
                                          {/*{index === 0 && (*/}
                                          {/*  <div className="d-flex justify-content-center align-items-center">*/}
                                          {/*    <img*/}
                                          {/*      className="profileImg"*/}
                                          {/*      src={profileImg}*/}
                                          {/*      alt=""*/}
                                          {/*    />*/}
                                          {/*  </div>*/}
                                          {/*)}*/}
                                        </div>
                                        <div
                                            className="productItemImgDelete"
                                            onClick={() =>
                                                handleProductItemDelete(index)
                                            }
                                        >
                                          <img
                                              src={deleteIcon}
                                              alt={deleteIcon}
                                          />
                                        </div>
                                      </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <input
                                className="submit"
                                type="submit"
                                value="Məlumatları dəyiş"
                            />
                          </div>

                          {/*<div className="col-md-6"></div>*/}
                          {/*<div className="col-md-6">*/}
                          {/*  */}
                          {/*</div>*/}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!isEmpty(user.productResponses) && (
            <div className="ownerProducts">
              <section id="all_products">
                <div className="container">
                  <div className="row">
                      <Tabs className="w-100 tabs">
                        <TabList>
                          <Tab>Dərc olunmuş</Tab>
                          <Tab>Silinmiş</Tab>
                          <Tab>Yoxlanılır</Tab>
                          <Tab>Dəyişdirilmiş</Tab>
                        </TabList>
                        <TabPanel>
                          <div className="row">
                            {isLoadingTab === true ? (
                              <div className="col-md-12 d-flex justify-content-center align-items-center">
                                <div
                                  className="spinner-border"
                                  style={{ color: "#ff9466" }}
                                  role="status"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            ) : !isEmpty(published) ? (
                              published.map((row, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="col-md-3 col-sm-3 col-6"
                                  >
                                    <Link to={`/product_details/${row.id}`}>
                                      <div className="products_item">
                                        <div className="item">
                                          <div className="products_item_top">
                                            {row.photos.length > 0 && (
                                              <img
                                                src={`https://pricegroup.az/api/productimage/${
                                                  row.photos.filter(
                                                    (x) =>
                                                      x.status === "Created"
                                                  )[0].path
                                                }`}
                                                alt=""
                                              />
                                            )}
                                          </div>
                                          <div className="products_item_name">
                                            <p>{row.title}</p>
                                          </div>
                                          <div className="products_item_bottom">
                                            <p>
                                              {row.city !== undefined &&
                                                row.city.name}
                                            </p>

                                            <p>
                                              <span className="ml-2">
                                                {new Date(row.addedDate).toLocaleDateString()}
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })
                            ) : (
                                <div className="notProductUserInfo">
                              <p>Dərc olunmuş elanınız yoxdur</p>
                                </div>
                            )}
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="row">
                            {isLoadingTab === true ? (
                              <div className="col-md-12 d-flex justify-content-center align-items-center">
                                <div
                                  className="spinner-border"
                                  style={{ color: "#ff9466" }}
                                  role="status"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            ) : !isEmpty(deleted) ? (
                              deleted.map((row, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="col-md-3 col-md-3 col-sm-3 col-6"
                                  >
                                    <Link
                                      to={() => false}
                                      style={{ cursor: "auto" }}
                                    >
                                      <div className="products_item">
                                        <div className="item">
                                          <div className="products_item_top">
                                            {row.photos.length > 0 && (
                                              <img
                                                src={`https://pricegroup.az/api/productimage/${row.photos[0].path}`}
                                                alt=""
                                              />
                                            )}
                                          </div>
                                          <div className="products_item_name">
                                            <p>{row.title}</p>
                                          </div>
                                          <div className="products_item_bottom">
                                            <p>
                                              {row.city !== undefined &&
                                              row.city.name}
                                            </p>


                                            <p>
                                              <span className="ml-2">
                                                {new Date(row.addedDate).toLocaleDateString()}
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })
                            ) : (
                                <div className="notProductUserInfo">
                                  <p>Silinmiş elanınız yoxdur</p>
                                </div>
                            )}
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="row">
                            {isLoadingTab === true ? (
                              <div className="col-md-12 d-flex justify-content-center align-items-center">
                                <div
                                  className="spinner-border"
                                  style={{ color: "#ff9466" }}
                                  role="status"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            ) : !isEmpty(created) ? (
                              created.map((row, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="col-md-3 col-md-3 col-sm-3 col-6"
                                  >
                                    <Link
                                        to={() => false}
                                        style={{ cursor: "auto" }}
                                    >
                                      <div className="products_item">
                                        <div className="item">
                                          <div className="products_item_top">
                                            {row.photos.length > 0 && (
                                              <img
                                                src={`https://pricegroup.az/api/productimage/${row.photos[0].path}`}
                                                alt=""
                                              />
                                            )}
                                          </div>
                                          <div className="products_item_name">
                                            <p>{row.title}</p>
                                          </div>
                                          <div className="products_item_bottom">
                                            <p>
                                              {row.city !== undefined &&
                                              row.city.name}
                                            </p>


                                            <p>
                                              <span className="ml-2">
                                                {new Date(row.addedDate).toLocaleDateString()}
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="notProductUserInfo">
                              <p>Yoxlamada olan elanınız yoxdur</p>
                              </div>
                            )}
                          </div>
                        </TabPanel>
                        <TabPanel>
                          <div className="row">
                            {isLoadingTab === true ? (
                                <div className="col-md-12 d-flex justify-content-center align-items-center">
                                  <div
                                      className="spinner-border"
                                      style={{ color: "#ff9466" }}
                                      role="status"
                                  >
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                </div>
                            ) : !isEmpty(created) ? (
                                updated.map((row, index) => {
                                  return (
                                      <div
                                          key={index}
                                          className="col-md-3 col-md-3 col-sm-3 col-6"
                                      >
                                        <Link
                                            to={() => false}
                                            style={{ cursor: "auto" }}
                                        >
                                          <div className="products_item">
                                            <div className="item">
                                              <div className="products_item_top">
                                                {row.photos.length > 0 && (
                                                    <img
                                                        src={`https://pricegroup.az/api/productimage/${row.photos[0].path}`}
                                                        alt=""
                                                    />
                                                )}
                                              </div>
                                              <div className="products_item_name">
                                                <p>{row.title}</p>
                                              </div>
                                              <div className="products_item_bottom">
                                                <p>
                                                  {row.city !== undefined &&
                                                  row.city.name}
                                                </p>


                                                <p>
                                              <span className="ml-2">
                                                {new Date(row.addedDate).toLocaleDateString()}
                                              </span>
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </Link>
                                      </div>
                                  );
                                })
                            ) : (
                                <div className="notProductUserInfo">
                                  <p>Dəyişdirmədə olan elanınız yoxdur</p>
                                </div>
                            )}
                          </div>
                        </TabPanel>
                      </Tabs>

                  </div>
                </div>
              </section>
            </div>
            )}
          </div>
        </section>
      <Footer/>
    </>
  );
};


// data.status == "Created" ||
// data.status == "Blocked" ||
// data.status == "Disabled" ||
// data.status == "Deleted"




export default UserInfo;
