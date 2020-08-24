import React, {Component, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import user_info from "../../img/user_info/person.png";
import viewCopy from "../../img/login/view-copy.svg";
import {useCookies} from "react-cookie";
import getUserByToken from "../../API/getUserByToken";
import {useFormik} from "formik";

const UserInfo = (props) => {

    const [cookies] = useCookies(["token"]);
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserByToken(cookies.token).then((responseUser) => {
            if (responseUser.status === 200) {
                setUser(responseUser.data.data);
            }
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
            confirmpassword
        },
        errors,
    } = useFormik({
        initialValues: {
            userId: user.id,
            email: user.email,
            surname: user.surname,
            name: user.name,
            phonenumber: user.phoneNumber,
            address: user.address,
            photo: user.photo,
            password: "050284871878",
            confirmpassword: "Nizami",
        },
        onSubmit: (values) => {

            const formData = { ...values, userId: user.id,  };

            console.log(user)
        },
    });





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
                  <img src={user_info} alt={user_info} />
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
                                <label htmlFor="confirmPassword">Confirm Password</label>
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
                            <input className="submit" type="submit" value="Melumatları dəyiş" />
                        </form>
                    </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserInfo;
