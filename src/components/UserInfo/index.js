import React, {Component, useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import user_info from "../../img/user_info/person.png";
import viewCopy from "../../img/login/view-copy.svg";
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

const UserInfo = () => {
  const [cookies] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(true);
  const [published, setPublished] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [created, setCreated] = useState([]);
  const [file, setFile] = useState([]);
  const [rendering, setRendering] = useState(false);
  const [user, setUser] = useState({});
  const { renderingHandle } = useContext(Context);


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
      setIsLoading(false);
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



  const {
    handleSubmit,
    handleChange,
    values: {
      userId,
      email,
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
      name: user.name,
      surname: user.surname,
      phoneNumber: user.phoneNumber,
      address: user.address,
      // photo: user.photo,
      // password: "050284871878",
      // confirmpassword: "Nizami",
    },
    validationSchema: validateUserInfo,
    enableReinitialize: true,
    onSubmit: (values) => {
      const phone = values.phoneNumber.split("-").join("").split(" ").join("").split("(").join("").split(")").join("");
      const formData = {
        ...values,
        photo: file.map((item) => item.file),
        userId: user.id,
        phoneNumber: phone
      };
      putUpdateUser(cookies.token, formData)
        .then(() => {
          swal(
            "Uğurla yeniləndi",
            "Daxil etdiyiniz melumatlar dəyişdirildi",
            "success",
            {
              button: "Bağla",
            }
          );
        })
        .then(() => {
          setRendering(!rendering);
          renderingHandle(!rendering)
        });
    },
  });

  const handleChangeImg = (event, date) => {
    console.log("event.target.files",event.target.files)
    const filesArr = [];
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

  const getFileCropper =(data)=>{
    console.log("data",data)
    const filesArr = [];
    for (const item of data) {
      filesArr.push({
        urlFront: URL.createObjectURL(item),
        file: item,
      });
    }
    setFile(filesArr);
  }


  return (
    <>
      <section id="userInfo">
        <div className="container">
          <div className="userInfoHeader">
            <h5>Şəxsi kabinet</h5>
          </div>
          <div className="information">
            <div className="row">
              <div className="col-md-5">
                <div className="information_left">
                  {/*f4a26b26-25b4-448e-834f-eb72c14aa850tebriz.jpg*/}
                  {/*a284d6da-2283-4744-9559-f89bc6ed23d9tebriz.jpg*/}
                  <img
                    src={
                      user.photo &&
                      `http://aanar028-001-site3.dtempurl.com/api/userimage/${user.photo}`
                    }
                    alt={user.photo}
                  />
                </div>
              </div>
              <div className="col-md-7">
                <div className="information_right">
                  <div className="form">
                    <form onSubmit={handleSubmit}>
                      <div className="inputs">
                        <label htmlFor="email">Email</label>
                        <p>{user.email}</p>
                      </div>
                      <div className="inputs">
                        <label htmlFor="password">Şifrə</label>
                        <div className="password">
                          <input
                            // type={inputTypePassword}
                            placeholder="Şifrənizi qeyd edin"
                            name="password"
                            id="password"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            defaultValue="******"
                          />
                          {errors.password && (
                            <Alert variant="warning">{errors.password}</Alert>
                          )}
                          {/*{errors.password ? errors.password : null}*/}
                          <button
                            // onClick={changeTypePassword}
                            type="button"
                            className="view"
                          >
                            <img src={viewCopy} alt="" />
                          </button>
                        </div>
                      </div>
                      <div className="inputs">
                        <label htmlFor="confirmPassword">
                          Təkrar şifrə
                        </label>
                        <div className="password">
                          <input
                            // type={inputTypeConfirmPassword}
                            placeholder="Təkrar şifrənizi qeyd edin"
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            defaultValue="******"
                          />
                          {errors.confirmPassword && (
                            <Alert variant="warning">
                              {errors.confirmPassword}
                            </Alert>
                          )}
                          {/*{errors.confirmPassword ? errors.confirmPassword : null}*/}
                          <button
                            // onClick={changeTypeConfirmPassword}
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
                          // value={name}
                          defaultValue={user.name}
                        />

                        {errors.name && (
                          <Alert variant="warning">{errors.name}</Alert>
                        )}
                      </div>
                      <div className="inputs">
                        <label htmlFor="surname">Soyad</label>
                        <input
                          type="text"
                          placeholder="Soyadinızı qeyd edin"
                          name="surname"
                          id="surname"
                          onChange={handleChange}
                          // value={user.surname}
                          defaultValue={user.surname}
                        />
                        {errors.surname && (
                          <Alert variant="warning">{errors.surname}</Alert>
                        )}
                        {/*{errors.surname ? errors.surname : null}*/}
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
                          placeholder="Ünvaninizi qeyd edin"
                          name="address"
                          id="address"
                          onChange={handleChange}
                          defaultValue={user.address}
                        />
                        {errors.address && (
                          <Alert variant="warning">{errors.address}</Alert>
                        )}
                        {/*{errors.address ? errors.address : null}*/}
                      </div>

                      <div className="inputs">
                        <label className="required" htmlFor="">
                          Şəkil
                        </label>
                        <Crop file={file} getFileCropper={getFileCropper}/>



                        {/*<div className="file-input">*/}
                        {/*  <div className="file-input-choose">*/}
                        {/*    <input*/}
                        {/*      type="file"*/}
                        {/*      className="input"*/}
                        {/*      id="imageUpload"*/}
                        {/*      onChange={(event) =>*/}
                        {/*        handleChangeImg(event, new Date())*/}
                        {/*      }*/}
                        {/*      onClick={(event) => {*/}
                        {/*        event.target.value = null;*/}
                        {/*      }}*/}
                        {/*      style={{ display: "none" }}*/}
                        {/*    />*/}
                        {/*    <label*/}
                        {/*      htmlFor="imageUpload"*/}
                        {/*      className="btn btn-large"*/}
                        {/*      className="inputFile"*/}
                        {/*    >*/}
                        {/*      Şəkil seçin*/}
                        {/*      {file.length !== 0 && (*/}
                        {/*        <span className="ml-2">{file.length}</span>*/}
                        {/*      )}*/}
                        {/*    </label>*/}
                        {/*  </div>*/}

                        {/*  <div className="uploadedImg">*/}
                        {/*    {file.map((item, index) => (*/}
                        {/*      <div*/}
                        {/*        className="productItem"*/}
                        {/*        key={index}*/}
                        {/*        id={index}*/}
                        {/*      >*/}
                        {/*        <div className="productItemImg">*/}
                        {/*          <img src={item.urlFront} className="mt-2" />*/}
                        {/*          {index === 0 && (*/}
                        {/*            <div className="d-flex justify-content-center align-items-center">*/}
                        {/*              <img*/}
                        {/*                className="profileImg"*/}
                        {/*                src={profileImg}*/}
                        {/*                alt=""*/}
                        {/*              />*/}
                        {/*              <span>Esas şəkil</span>*/}
                        {/*            </div>*/}
                        {/*          )}*/}
                        {/*        </div>*/}
                        {/*        <div*/}
                        {/*          className="productItemImgDelete"*/}
                        {/*          onClick={() => handleProductItemDelete(index)}*/}
                        {/*        >*/}
                        {/*          <img src={deleteIcon} alt={deleteIcon} />*/}
                        {/*        </div>*/}
                        {/*      </div>*/}
                        {/*    ))}*/}
                        {/*  </div>*/}
                        {/*</div>*/}




                      </div>
                      <input
                        className="submit"
                        type="submit"
                        value="Melumatları dəyiş"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ownerProducts">
            <section id="all_products">
              <div className="container">
                <div className="row">
                  {!isEmpty(user.productResponses) && (
                    <Tabs className="w-100">
                      <TabList>
                        <Tab>Dərc olunmuş</Tab>
                        <Tab>Silinmiş</Tab>
                        <Tab>Yoxlanılır</Tab>
                      </TabList>
                      <TabPanel>
                        <div className="row">
                          {isLoading === true ? (
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
                                              src={`http://aanar028-001-site3.dtempurl.com/api/productimage/${row.photos[0].path}`}
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
                                            {new Date(
                                              row.addedDate
                                            ).toLocaleDateString()}
                                            <span className="ml-2">
                                              {new Date(
                                                row.addedDate
                                              ).toLocaleTimeString()}
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
                            <p>Dərc olunmuş elanınız yoxdur</p>
                          )}
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="row">
                          {isLoading === true ? (
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
                                  <Link to={`/product_details/${row.id}`}>
                                    <div className="products_item">
                                      <div className="item">
                                        <div className="products_item_top">
                                          {row.photos.length > 0 && (
                                            <img
                                              src={`http://aanar028-001-site3.dtempurl.com/api/productimage/${row.photos[0].path}`}
                                              alt=""
                                            />
                                          )}
                                        </div>
                                        <div className="products_item_name">
                                          <p>{row.title}</p>
                                        </div>
                                        <div className="products_item_bottom">
                                          {/*<p>*/}
                                          {/*  {row.city !== undefined &&*/}
                                          {/*    row.city.name}*/}
                                          {/*</p>*/}

                                          <p>
                                            {new Date(
                                              row.addedDate
                                            ).toLocaleDateString()}
                                            <span className="ml-2">
                                              {new Date(
                                                row.addedDate
                                              ).toLocaleTimeString()}
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
                            <p>Silinmiş elanınız yoxdur</p>
                          )}
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="row">
                          {isLoading === true ? (
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
                                  <Link to={`/product_details/${row.id}`}>
                                    <div className="products_item">
                                      <div className="item">
                                        <div className="products_item_top">
                                          {row.photos.length > 0 && (
                                            <img
                                              src={`http://aanar028-001-site3.dtempurl.com/api/productimage/${row.photos[0].path}`}
                                              alt=""
                                            />
                                          )}
                                        </div>
                                        <div className="products_item_name">
                                          <p>{row.title}</p>
                                        </div>
                                        <div className="products_item_bottom">
                                          {/*<p>*/}
                                          {/*  {row.city !== undefined &&*/}
                                          {/*    row.city.name}*/}
                                          {/*</p>*/}

                                          <p>
                                            {new Date(
                                              row.addedDate
                                            ).toLocaleDateString()}
                                            <span className="ml-2">
                                              {new Date(
                                                row.addedDate
                                              ).toLocaleTimeString()}
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
                            <p>Yoxlamada olan elanınız yoxdur</p>
                          )}
                        </div>
                      </TabPanel>
                    </Tabs>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserInfo;
