import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import payverLogo from "../../img/header/payverLogo.jpg";
import login from "../../img/header/login.png";
import register from "../../img/header/register.png";
import plus from "../../img/header/plus.png";
import facebook from "../../img/contact/facebook.svg";
import instagram from "../../img/contact/instagram.svg";
import logout from "../../img/header/logout.png";
import userLogo from "../../img/header/user.png";
import subCategoryLogo from "../../img/header/subCategory.png";
import "./index.scss";
import { useCookies } from "react-cookie";
import getUserByToken from "../../API/getUserByToken";
import getCategories from "../../API/getCategories";
import getSubCategories from "../../API/getSubCategories";

const Header = (props) => {
  const [cookies, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const handleSignOut = () => {
    removeCookie("token");
  };

  useEffect(() => {
    if(cookies.token !== undefined && cookies.token !== "undefined"){
      getUserByToken(cookies.token)
          .then((responseUser) => {
            if (responseUser.status === 200) {
              setUser(responseUser.data.data);
            }
          });
    }
    getCategories()
        .then((response) => {
          if (response.status === 200) {
            setCategories(response.data.data);
          }
        });
    getSubCategories()
        .then((response) => {
          if (response.status === 200) {
            setSubCategories(response.data.data);
          }
        });
  }, [cookies.token]);

  const handleGetProductBySubcategory =(subCategoryId)=>{
    console.log("subCategoryId",subCategoryId)
  }
  // console.log("categories",categories)
  // console.log("subCategories",subCategories)

  return (
    <>
      <header className="header">
        <div className="inner-header">
          <div className="container">
            <div className="inside-inner">
              <div className="social">
                <Link to="/">
                  <img src={facebook} alt="" />
                </Link>
                {/*<Link to="https://www.instagram.com/runtime.az/">*/}
                <a href="https://www.instagram.com/runtime.az/">
                  <img src={instagram} alt="" />
                </a>
                {/*</Link>*/}
                <p>
                  Dəstək: <span>+994502782268</span>
                </p>
              </div>
              <div className="pages">
                <Link to="/">Ana Səhifə</Link>
                <Link to="/blogs">Xəbərlər</Link>
                <Link to="/contact">Əlaqə</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="center-header">
          <div className="container">
            <div className="wrapper">
              <div className="logo">
                <Link to="/">
                  <div id="sha_temp_body">
                    <span className="sha_temp">
                      <span>
                        <span className="temp-data">
                          <img src={payverLogo} alt="Logo" />
                          {/* <p>Sənin olsun</p> */}
                        </span>
                      </span>
                    </span>
                  </div>
                </Link>
              </div>
              <div className="right-side-header">
                <div className="buttons">
                  <div className="head right profile">
                    {cookies.token !== "undefined" &&
                    cookies.token !== undefined ? (
                      <>
                        <div className="user-info-header light-btn d-flex align-items-center">
                          <Link to="/user_info">
                            <img src={userLogo} alt={userLogo} />
                            <span>{user.name}</span>
                          </Link>
                        </div>
                        <div className="logout light-btn d-flex align-items-center">
                          <Link to="/" onClick={() => handleSignOut()}>
                            <img src={logout} alt={logout} />
                            <span>Çixiş</span>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to="/signin">
                          <div className="signin">
                            <img src={login} alt={login} />
                            <span>Login</span>
                          </div>
                        </Link>
                        <Link to="/signup">
                          <div className="signup">
                            <img src={register} alt={register} />
                            <span>Register</span>
                          </div>
                        </Link>
                      </>
                    )}
                    <div className="add_product light-btn d-flex align-items-center">
                      <Link to="/add_product">
                        <img src={plus} alt="Plus" />
                        <span>
                          Elan yerləşdir
                        </span>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="menu" id="menu">
          <div className="container">
            <nav>
              <ul>
                <li className="active">
                  <Link to="/">Xüsusi yardım</Link>
                </li>
                {categories.map((item,index)=>(
                    <li key={index} className="dropdown">
                      <Link to="/" className="dropbtn">
                        {item.name}
                      </Link>
                      <div className="dropdown-content">
                        {subCategories.map((subCategory, index) => {
                          if (subCategory.categoryId === item.id) {
                            return (
                                <Link key={index} id={subCategory.id} to="/" onClick={()=>handleGetProductBySubcategory(subCategory.id)}>
                                  <img src={subCategoryLogo} alt=""/>
                                  <span>{subCategory.name}</span>
                                </Link>
                          );
                          }
                        })}
                      </div>
                    </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
