import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import user_info from "../../img/user_info/person.png";
import viewCopy from "../../img/login/view-copy.svg";
import { useCookies } from "react-cookie";
import getUserByToken from "../../API/getUserByToken";
import { useFormik } from "formik";
import validateUserInfo from "../../utils/yup/validateUserInfo";
import putUpdateUser from "../../API/putUpdateUser";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import isEmpty from "lodash/isEmpty";
import login from "../../API/login";

const UserInfo = (props) => {
  const [cookies] = useCookies(["token"]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [published, setPublished] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [created, setCreated] = useState([]);

  useEffect(() => {
    getUserByToken(cookies.token)
      .then((responseUser) => {
        if (responseUser.status === 200) {
          setUser(responseUser.data.data);
          setPublished(responseUser.data.data.productResponses.filter(item=>item.status === "Published"))
          setDeleted(responseUser.data.data.productResponses.filter(item=>item.status === "Deleted"))
          setCreated(responseUser.data.data.productResponses.filter(item=>item.status === "Created"))
        }
      })
      .finally((response) => {
        setIsLoading(false);
      });
  }, []);

  const {
    handleSubmit,
    handleChange,
    values: {
      userId,
      email,
      surname,
      name,
      phonenumber,
      address,
      photo,
      password,
      confirmpassword,
    },
    errors,
  } = useFormik({
    initialValues: {
      userId: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      phoneNumber: user.phoneNumber,
      address: user.address,
      photo: user.photo,
      // password: "050284871878",
      // confirmpassword: "Nizami",
    },
    // validationSchema: validateUserInfo,
    onSubmit: (values) => {
      const formData = { ...values, userId: user.id };
      putUpdateUser(cookies.token, formData);
      // console.log(user)
    },
  });

  console.log("user", user);

  return (
    <>
      <section id="userInfo">
        <div className="container">
          <div className="userInfoHeader">
            <h5>User Info</h5>
          </div>
          <div className="information">
            <div className="row">
              <div className="col-md-5">
                <div className="information_left">
                  <img
                    src={`http://aanar028-001-site3.dtempurl.com/api/userimage/${user.photo}`}
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
                        <input
                          type="text"
                          placeholder="Your email"
                          name="email"
                          id="email"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          defaultValue={user.email}
                        />
                        {/*{checkUser === true &&*/}
                        {/*"Bu email ile user qeydiyyatdan kechib"}*/}
                        {/*{errors.email ? errors.email : null}*/}
                      </div>
                      <div className="inputs">
                        <label htmlFor="password">Password</label>
                        <div className="password">
                          <input
                            // type={inputTypePassword}
                            placeholder="Your password"
                            name="password"
                            id="password"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            defaultValue="******"
                          />
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
                          Confirm Password
                        </label>
                        <div className="password">
                          <input
                            // type={inputTypeConfirmPassword}
                            placeholder="Your confirm password"
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            defaultValue="******"
                          />
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
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          placeholder="Your name"
                          name="name"
                          id="name"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          defaultValue={user.name}
                        />
                        {/*{errors.name ? errors.name : null}*/}
                      </div>
                      <div className="inputs">
                        <label htmlFor="surname">Surname</label>
                        <input
                          type="text"
                          placeholder="Your surname"
                          name="surname"
                          id="surname"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          defaultValue={user.surname}
                        />
                        {/*{errors.surname ? errors.surname : null}*/}
                      </div>
                      <div className="inputs">
                        <label htmlFor="phoneNumber">PhoneNumber</label>
                        <input
                          type="text"
                          placeholder="Your phoneNumber"
                          name="phoneNumber"
                          id="phoneNumber"
                          onChange={handleChange}
                          defaultValue={user.phoneNumber}
                        />
                        {/*{errors.phoneNumber ? errors.phoneNumber : null}*/}
                      </div>
                      <div className="inputs">
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          placeholder="Your address"
                          name="address"
                          id="address"
                          onChange={handleChange}
                          defaultValue={user.address}
                        />
                        {/*{errors.address ? errors.address : null}*/}
                      </div>
                      <div
                        className="g-recaptcha"
                        data-sitekey="6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ"
                      ></div>
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
                          <Tab>{!isEmpty(published) && "Dərc olunmuş"}</Tab>
                          <Tab>{!isEmpty(deleted) && "Silinmiş"}</Tab>
                          <Tab>{!isEmpty(created) && "Yoxlanılır"}</Tab>
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
                            ) : (
                                 published.map((row, index) => {
                                  return (
                                      <div key={index} className="col-md-3">
                                        <Link to={`/product_details/${row.id}`}>
                                          <div
                                              className="products_item"

                                          >
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
                            ) : (
                                deleted.map((row, index) => {
                                  return (
                                      <div key={index} className="col-md-3">
                                        <Link to={`/product_details/${row.id}`}>
                                          <div
                                              className="products_item"

                                          >
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
                            ) : (
                                created.map((row, index) => {
                                  return (
                                      <div key={index} className="col-md-3">
                                        <Link to={`/product_details/${row.id}`}>
                                          <div
                                              className="products_item"

                                          >
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
