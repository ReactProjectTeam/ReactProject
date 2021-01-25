import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menu from "../../img/header/menu.svg";
import close from "../../img/header/close.svg";
import payverLogo from "../../img/header/payverLogo.jpg";
import login from "../../img/header/login.png";
import register from "../../img/header/register.png";
import plus from "../../img/header/plus.png";
import instagram from "../../img/contact/instagram.svg";
import userPhoto from "../../img/header/userPhoto.png";
import logout from "../../img/header/logout.png";
import subCategoryLogo from "../../img/header/subCategory.png";
import down from "../../img/header/down.png";
import up from "../../img/header/up.png";
import home1 from "../../img/header/home1.png";
import news from "../../img/header/news.png";
import contact from "../../img/header/contact.png";
import "./index.scss";
import { useCookies } from "react-cookie";
import getUserByToken from "../../API/getUserByToken";
import getCategories from "../../API/getCategories";
import getSubCategories from "../../API/getSubCategories";
import Context from "../../Context/context";
import { Accordion, Card, Button } from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as headerActions from "../../store/actions/headerActions"


const pageHeader = document.querySelector(".mobile");
const openMobMenu = document.querySelector(".open-mobile-menu");
const closeMobMenu = document.querySelector(".close-mobile-menu");
const topMenuWrapper = document.querySelector(".top-menu-wrapper");
const isVisible = "is-visible";
const showOffCanvas = "show-offcanvas";
const noTransition = "no-transition";
let resize;

// Opening Mobile Menu
// openMobMenu.addEventListener("click",
const openMobile = () => {
  const topMenuWrapper = document.querySelector(".top-menu-wrapper");
  topMenuWrapper.classList.add(showOffCanvas);
};

// Closing Mobile Menu
// closeMobMenu.addEventListener("click",
const closeMobile = () => {
  const topMenuWrapper = document.querySelector(".top-menu-wrapper");
  topMenuWrapper.classList.remove(showOffCanvas);
};

// Resizing Screen
window.addEventListener("resize", () => {
  pageHeader &&
    pageHeader.querySelectorAll("*").forEach(function (el) {
      el.classList.add(noTransition);
    });
  clearTimeout(resize);
  resize = setTimeout(resizingComplete, 500);
});

function resizingComplete() {
  pageHeader &&
    pageHeader.querySelectorAll("*").forEach(function (el) {
      el.classList.remove(noTransition);
    });
}

const Header = (props) => {
  const [cookies, removeCookie] = useCookies([
    "token",
    "fr",
    "wd",
    "m_pixel_ratio",
    "spin",
    "xs",
    "c_user",
    "dpr",
    "datr",
    "sb",
  ]);
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [mobileMenuImg, setMobileMenuImg] = useState([
    {
      selectedCount: 1,
      display: true,
    },
    {
      selectedCount: 2,
      display: true,
    },
    {
      selectedCount: 3,
      display: true,
    },
    {
      selectedCount: 4,
      display: true,
    },
  ]);

  const query = new URLSearchParams(props.location.search);
  const category = query.get("category");
  const subCategory = query.get("subCategory");

  const handleSignOut = () => {
    window.FB.api("/me/permissions", "delete", null, () => window.FB.logout());
    removeCookie("token");
    removeCookie("wd");
    removeCookie("m_pixel_ratio");
    removeCookie("spin");
    removeCookie("xs");
    removeCookie("c_user");
    removeCookie("dpr");
    removeCookie("datr");
    removeCookie("sb");
    props.actions.loggedOut(true);
    props.actions.loggedIn(false);
  };

  useEffect(() => {
    getCategories().then((response) => {
      if (response.status === 200) {
        setCategories(
          response.data.data.map((category, index) => {
            return category;
          })
        );
      }
    });
    getSubCategories().then((response) => {
      if (response.status === 200) {
        setSubCategories(response.data.data);
      }
    });
  }, [cookies.token]);

  useEffect(() => {
    if (cookies.token !== undefined && cookies.token !== "undefined") {
      getUserByToken(cookies.token).then((responseUser) => {
        if (responseUser.status === 200) {
          setUser(responseUser.data.data);
        }
      });
    }
  }, [cookies.token]);

  const openOrCloseAccardionImg = (count) => {

    let newArr = [...mobileMenuImg];
    newArr.map((item, index) => {
      newArr[index] = {
        selectedCount: item.selectedCount,
        display: true,
      };
      if (item.selectedCount === count) {
        newArr[index] = {
          selectedCount: item.selectedCount,
          display: !item.display,
        };
      }
    });
    setMobileMenuImg(newArr);
  };

  return (
    <>
      <div className="mobile">
        <nav className="navbar">
          <div className="mobileNavbarInside">
            <div className="menuAndLogo">
              <div className="openMobileMenuDiv" onClick={() => openMobile()}>
                <img
                  src={menu}
                  aria-label="Open Mobile Menu"
                  className="open-mobile-menu"
                  alt=""
                />
              </div>
              <Link to="/" className="mobile-logo" onClick={(event) => {}}>
                <img src={payverLogo} alt="Logo" />
              </Link>
            </div>
            <div className="add_product light-btn d-flex align-items-center">
              <Link to="/add_product">
                <img src={plus} alt="Plus" />
                <span>Yeni elan</span>
              </Link>
            </div>
          </div>
          <div className="top-menu-wrapper">
            <div className="top-menu">
              <div className="mob-block">
                <Link
                  to="/"
                  onClick={() => closeMobile()}
                  className="mobile-logo"
                >
                  <img src={payverLogo} alt="Logo" />
                </Link>
                <div className="closeDiv" onClick={() => closeMobile()}>
                  <img
                    aria-label="Close Mobile Menu"
                    className="close-mobile-menu"
                    src={close}
                    alt=""
                  />
                </div>
              </div>
              <div className="mobileUserInfo">
                <div className="head right profile">
                  {cookies.token !== "undefined" &&
                  cookies.token !== undefined ? (
                    <>
                      <div
                        className="user-info-header"
                        onClick={() => closeMobile()}
                      >
                        <div className="user-info-header-inside">
                          <Link to="/user_info">
                            <img src={userPhoto} alt={userPhoto} />
                            <span>
                              {user.email && user.email.includes("@")
                                ? user.email.substring(
                                    0,
                                    user.email.lastIndexOf("@")
                                  )
                                : user.email}
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="logout" onClick={() => closeMobile()}>
                        <div className="logout-inside">
                          <Link to="/" onClick={() => handleSignOut()}>
                            <img src={logout} alt={logout} />
                            <span>Çıxış</span>
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="authDiv">
                        <Link to={"/signin"} onClick={() => closeMobile()}>
                          <div className="signin">
                            <img src={login} alt={login} />
                            <span>Daxil ol</span>
                          </div>
                        </Link>
                      </div>
                      <div className="authDiv">
                        <Link to="/signup" onClick={() => closeMobile()}>
                          <div className="signup">
                            <img src={register} alt={register} />
                            <span>Qeydiyyat</span>
                          </div>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Accordion>
                {categories.map((category, index) => (
                  <Card
                    key={index}
                    onClick={() => openOrCloseAccardionImg(index + 1)}
                  >
                    <Card.Header>
                      <Accordion.Toggle
                        className="accardionCardBtn"
                        as={Button}
                        variant="link"
                        eventKey={index + 1}
                      >
                        <div className="categoryMobile">
                          <div className="categoryLogo">
                            <img
                              src={`https://pricegroup.az/api/categoryimage/${category.photo}`}
                              alt=""
                            />
                          </div>
                          <span>{category.name}</span>
                        </div>
                        {mobileMenuImg.map((itemImg, itemImgIndex) => {
                          if (index === itemImgIndex) {
                            return (
                              <div key={itemImgIndex} className="categoryDown">
                                <img
                                  src={itemImg.display === true ? down : up}
                                  alt=""
                                />
                              </div>
                            );
                          }
                        })}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index + 1}>
                      <Card.Body>
                        <Link
                          key={index}
                          to={{
                            pathname: "/",
                            search: `category=${category.id}`,
                          }}
                          className="subCategoryMobile"
                          onClick={(event) => {
                            closeMobile();
                          }}
                        >
                          <div className="subCategoryMobileLeft">
                            <img src={subCategoryLogo} alt="" />
                            <span>Bütün elanlar</span>
                          </div>
                          <div className="subCategoryMobileRight">
                            <span>({category.productCount})</span>
                          </div>
                        </Link>
                        {subCategories.map((subCategory, index) => {
                          if (subCategory.categoryId === category.id) {
                            return (
                              <Link
                                key={index}
                                to={{
                                  pathname: "/",
                                  search: `subCategory=${subCategory.id}`,
                                }}
                                id={subCategory.id}
                                className="subCategoryMobile"
                                onClick={(event) => {
                                  closeMobile();
                                }}
                              >
                                <div className="subCategoryMobileLeft">
                                  <img src={subCategoryLogo} alt="" />
                                  <span>{subCategory.name}</span>
                                </div>
                                <div className="subCategoryMobileRight">
                                  <span>({subCategory.productCount})</span>
                                </div>
                              </Link>
                            );
                          }
                        })}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>

              <div className="mobile-navigation">
                <div className="mobile-navigation-inside">
                  <Link
                    onClick={(event) => {
                      closeMobile();
                    }}
                    to="/"
                  >
                    <div className="mobile-navigation-item">
                      <img src={home1} alt={home1} />
                      <p>Əsas</p>
                    </div>
                  </Link>
                </div>
                <div className="mobile-navigation-inside">
                  <Link onClick={() => closeMobile()} to="/blogs">
                    <div className="mobile-navigation-item">
                      <img src={news} alt={news} />
                      <p>Xəbərlər</p>
                    </div>
                  </Link>
                </div>
                <div className="mobile-navigation-inside">
                  <Link onClick={() => closeMobile()} to="/contact">
                    <div className="mobile-navigation-item">
                      <img src={contact} alt={contact} />
                      <p>Əlaqə</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <header className="header">
        <div className="inner-header">
          <div className="container">
            <div className="inside-inner">
              <div className="social">
                <Link
                  to={{ pathname: "https://www.instagram.com/payver.az/" }}
                  target="_blank"
                >
                  <img src={instagram} alt="" />
                </Link>
                <p>
                  Dəstək:{" "}
                  <a href="https://mail.google.com/mail/u/0/?view=cm&amp;fs=1&amp;tf=1&amp;to=info@payver.az">
                    info@payver.az
                  </a>
                </p>
              </div>
              <div className="pages">
                
                <Link to="/" onClick={(event) => {}}>
                <img src={home1} alt={home1} />
                  Əsas
                </Link>
                <Link to="/blogs">
                <img src={news} alt={news} />
                  Xəbərlər
                  </Link>
                
                <Link to="/contact">
                <img src={contact} alt={contact} />
                  Əlaqə</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="center-header">
          <div className="container">
            <div className="wrapper">
              <div className="logo" onClick={(event) => {}}>
                <Link to="/">
                  <img src={payverLogo} alt="Logo" />
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
                            <img src={userPhoto} alt={userPhoto} />
                            <span>
                              {user.email && user.email.includes("@")
                                ? user.email.substring(
                                    0,
                                    user.email.lastIndexOf("@")
                                  )
                                : user.email}
                            </span>
                          </Link>
                        </div>
                        <div className="logout light-btn d-flex align-items-center">
                          <Link to="/" onClick={() => handleSignOut()}>
                            <img src={logout} alt={logout} />
                            <span>Çıxış</span>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to="/signin">
                          <div className="signin">
                            <img src={login} alt={login} />
                            <span>Daxil ol</span>
                          </div>
                        </Link>
                        <Link to="/signup">
                          <div className="signup">
                            <img src={register} alt={register} />
                            <span>Qeydiyyat</span>
                          </div>
                        </Link>
                      </>
                    )}
                    <div className="add_product light-btn d-flex align-items-center">
                      <Link to="/add_product">
                        <img src={plus} alt="Plus" />
                        <span>Yeni elan</span>
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
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className={` dropdown ${category.active ? "active" : ""}`}
                    onClick={(event) => {}}
                  >
                    <Link
                      to={{ pathname: "/", search: `category=${category.id}` }}
                      className="dropbtn"
                    >
                      <div className="categoryLogo">
                        <img
                          src={`https://pricegroup.az/api/categoryimage/${category.photo}`}
                          alt=""
                        />
                      </div>
                      <div className="subCategoryLeft">
                        <span>{category.name}</span>
                      </div>
                      <div className="subCategoryRight ml-2">
                        <span>({category.productCount})</span>
                      </div>
                    </Link>
                    <div className="dropdown-content">
                      {subCategories.map((subCategory, index) => {
                        if (subCategory.categoryId === category.id) {
                          return (
                            <Link
                              key={index}
                              id={subCategory.id}
                              className={`subCategory ${
                                subCategory.active ? "active" : ""
                              }`}
                              to={{
                                pathname: "/",
                                search: `subCategory=${subCategory.id}`,
                              }}
                            >
                              <div className="subCategoryLeft">
                                <img src={subCategoryLogo} alt="" />
                                <span>{subCategory.name}</span>
                              </div>
                              <div className="subCategoryRight">
                                <span>({subCategory.productCount})</span>
                              </div>
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
        <nav aria-label="breadcrumb" className="breadcrumbNav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Bütün elanlar</Link>
              </li>

              {categories
                .filter(
                  (categoryItem) =>
                    categoryItem.id === Number(category) ||
                    categoryItem.id ===
                      (subCategories.find(
                        (subCategoryItem) =>
                          subCategoryItem.id === Number(subCategory)
                      ) &&
                        subCategories.find(
                          (subCategoryItem) =>
                            subCategoryItem.id === Number(subCategory)
                        ).categoryId)
                )
                .map((filtered, index) => (
                  <li key={index} className="breadcrumb-item">
                    <Link
                      to={{ pathname: "/", search: `category=${filtered.id}` }}
                    >
                      {filtered.name}
                    </Link>
                  </li>
                ))}

              {subCategories
                .filter(
                  (subCategoryItem) =>
                    subCategoryItem.id === Number(subCategory)
                )
                .map((filtered, index) => (
                  <li key={index} className="breadcrumb-item">
                    <Link
                      to={{
                        pathname: "/",
                        search: `subCategory=${filtered.id}`,
                      }}
                    >
                      {filtered.name}
                    </Link>
                  </li>
                ))}
            </ol>
          </div>
        </nav>
      </header>
    </>
  );
};




const mapDispatchToProps=(dispatch)=>{
  return {
    actions: {
        loggedOut : bindActionCreators(headerActions.loggedOut,dispatch),
        loggedIn : bindActionCreators(headerActions.loggedIn,dispatch),
    }
  }
}

export default connect(null,mapDispatchToProps)(Header);
