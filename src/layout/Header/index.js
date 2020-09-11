import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import menu from "../../img/header/menu.svg";
import close from "../../img/header/close.svg";
import payverLogo from "../../img/header/payverLogo.jpg";
import login from "../../img/header/login.png";
import register from "../../img/header/register.png";
import plus from "../../img/header/plus.png";
import facebook from "../../img/contact/facebook.svg";
import instagram from "../../img/contact/instagram.svg";
import logout from "../../img/header/logout.png";
import userLogo from "../../img/header/user.png";
import subCategoryLogo from "../../img/header/subCategory.png";
import down from "../../img/header/down.png";
import up from "../../img/header/up.png";
import clothes from "../../img/header/clothes.png";
import home from "../../img/header/home.png";
import cat from "../../img/header/cat.png";
import help from "../../img/header/help.png";
import "./index.scss";
import { useCookies } from "react-cookie";
import getUserByToken from "../../API/getUserByToken";
import getCategories from "../../API/getCategories";
import getSubCategories from "../../API/getSubCategories";
import Context from "../../Context/context";
import { Accordion, Card, Button } from "react-bootstrap";

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
  const [cookies, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoriesLogo, setCategoriesLogo] = useState([
    clothes,
    home,
    cat,
    help,
  ]);
  const [subCategories, setSubCategories] = useState([]);
  const [selected, setSelected] = useState({});
  // console.log("linki goturmek",props.match)
  const { getProductsById, selectedProduct } = useContext(Context);

  const handleSignOut = () => {
    removeCookie("token");
  };

  useEffect(() => {
    if (cookies.token !== undefined && cookies.token !== "undefined") {
      getUserByToken(cookies.token).then((responseUser) => {
        if (responseUser.status === 200) {
          setUser(responseUser.data.data);
        }
      });
    }
    getCategories().then((response) => {
      if (response.status === 200) {
        setCategories(
          response.data.data.map((category, index) => {
            category.img = categoriesLogo[index];
            return category;
          })
        );
        // setCategories(response.data.data);
      }
    });
    getSubCategories().then((response) => {
      if (response.status === 200) {
        setSubCategories(response.data.data);
      }
    });
    setSelected(selectedProduct);
  }, [selectedProduct, cookies.token]);

  const addClickedCategoryOrSubcategory = (id, type, event) => {
    event.stopPropagation();
    if (type === "category") {
      setCategories(
        categories.map((category) => {
          category.active = false;
          if (category.id === id) {
            category.active = true;
          }
          return category;
        })
      );
    } else {
      setSubCategories(
        subCategories.map((subCategory) => {
          subCategory.active = false;
          if (subCategory.id === id) {
            subCategory.active = true;
          }
          return subCategory;
        })
      );
    }
    getProductsById(id, type);
  };

  return (
    <>
      <div className="mobile">
        <nav className="navbar">
          <div className="mobileNavbarInside">
            <div className="menuAndLogo">
              <img
                src={menu}
                aria-label="Open Mobile Menu"
                onClick={() => openMobile()}
                className="open-mobile-menu"
                alt=""
              />
              <Link to="/" className="mobile-logo">
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
                <Link to="/" className="mobile-logo">
                  <img src={payverLogo} alt="Logo" />
                </Link>
                <img
                  aria-label="Close Mobile Menu"
                  onClick={() => closeMobile()}
                  className="close-mobile-menu"
                  src={close}
                  alt=""
                />
              </div>
              <div className="mobileUserInfo">
                <div className="head right profile">
                  {cookies.token !== "undefined" &&
                  cookies.token !== undefined ? (
                    <>
                      <div
                        className="user-info-header light-btn d-flex align-items-center"
                        onClick={() => closeMobile()}
                      >
                        <Link to="/user_info">
                          <img
                            src={`http://aanar028-001-site3.dtempurl.com/api/userimage/${user.photo}`}
                            alt={user.photo}
                          />
                          <span>{user.name}</span>
                        </Link>
                      </div>
                      <div
                        className="logout light-btn d-flex align-items-center"
                        onClick={() => closeMobile()}
                      >
                        <Link to="/" onClick={() => handleSignOut()}>
                          <img src={logout} alt={logout} />
                          <span>Çixiş</span>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link to="/signin">
                        <div className="signin" onClick={() => closeMobile()}>
                          <img src={login} alt={login} />
                          <span>Daxil ol</span>
                        </div>
                      </Link>
                      <Link to="/signup">
                        <div className="signup" onClick={() => closeMobile()}>
                          <img src={register} alt={register} />
                          <span>Qeydiyyat</span>
                        </div>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <Accordion>
                {categories.map((category, index) => (
                  <Card
                    key={index}
                    // className={` dropdown ${category.active ? "active" : ""}`}
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
                            <img src={category.img} alt="" />
                          </div>
                          <span>{category.name}</span>
                        </div>
                        <div className="categoryDown">
                          <img src={down} alt="" />
                        </div>
                        <div className="categoryUp">
                          <img src={up} alt="" />
                        </div>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index + 1}>
                      <Card.Body>
                        <div
                          key={index}
                          // id={subCategory.id}
                          // className={subCategory.active ? "active" : ""}
                          className="subCategoryMobile"
                          onClick={(event) => {
                            addClickedCategoryOrSubcategory(
                              category.id,
                              "category",
                              event
                            );
                            closeMobile();
                            setSelected({
                              categoryId: category.id,
                              type: "category",
                            });
                          }}
                        >
                          <img src={subCategoryLogo} alt="" />
                          <span>Bütün elanlar</span>
                        </div>
                        {subCategories.map((subCategory, index) => {
                          if (subCategory.categoryId === category.id) {
                            return (
                              <div
                                key={index}
                                id={subCategory.id}
                                // className={subCategory.active ? "active" : ""}
                                className="subCategoryMobile"
                                // onClick={() => closeMobile()}
                                onClick={(event) => {
                                  addClickedCategoryOrSubcategory(
                                    subCategory.id,
                                    "subCategory",
                                    event
                                  );
                                  closeMobile();
                                  setSelected({
                                    categoryId: category.id,
                                    subCategoryId: subCategory.id,
                                    type: "subCategory",
                                  });
                                }}
                              >
                                <img src={subCategoryLogo} alt="" />
                                <span>{subCategory.name}</span>
                              </div>
                            );
                          }
                        })}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </div>
          </div>
        </nav>
      </div>

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
              <div
                className="logo"
                onClick={(event) => {
                  addClickedCategoryOrSubcategory(null, "", event);
                  setSelected({
                    categoryId: null,
                    type: "",
                  });
                }}
              >
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
                            <img
                              src={`http://aanar028-001-site3.dtempurl.com/api/userimage/${user.photo}`}
                              alt={user.photo}
                            />
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
                    onClick={(event) => {
                      addClickedCategoryOrSubcategory(
                        category.id,
                        "category",
                        event
                      );
                      setSelected({
                        categoryId: category.id,
                        type: "category",
                      });
                    }}
                  >
                    <div className="categoryLogo">
                      <img src={category.img} alt="" />
                    </div>
                    <Link to="/" className="dropbtn">
                      {category.name}
                    </Link>
                    <div className="dropdown-content">
                      {subCategories.map((subCategory, index) => {
                        if (subCategory.categoryId === category.id) {
                          return (
                            <Link
                              key={index}
                              id={subCategory.id}
                              className={subCategory.active ? "active" : ""}
                              to="/"
                              onClick={(event) => {
                                addClickedCategoryOrSubcategory(
                                  subCategory.id,
                                  "subCategory",
                                  event
                                );
                                setSelected({
                                  categoryId: category.id,
                                  subCategoryId: subCategory.id,
                                  type: "subCategory",
                                });
                              }}
                            >
                              <img src={subCategoryLogo} alt="" />
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
        <nav aria-label="breadcrumb" className="breadcrumbNav">
          <div className="container">
            <ol className="breadcrumb">
              <li
                className="breadcrumb-item"
                onClick={(event) => {
                  addClickedCategoryOrSubcategory(null, "", event);
                  setSelected({
                    categoryId: null,
                    type: "",
                  });
                }}
              >
                <Link to="/">Bütün elanlar</Link>
              </li>
              {selected.type === "category" && (
                <li
                  className="breadcrumb-item"
                  onClick={(event) => {
                    addClickedCategoryOrSubcategory(
                      selected.categoryId,
                      "category",
                      event
                    );
                    setSelected({
                      categoryId: selected.categoryId,
                      type: "category",
                    });
                  }}
                >
                  <Link to="/">
                    {categories.map(
                      (category) =>
                        category.id === selected.categoryId && category.name
                    )}
                  </Link>
                </li>
              )}
              {selected.type === "subCategory" && (
                <>
                  <li
                    className="breadcrumb-item"
                    onClick={(event) => {
                      addClickedCategoryOrSubcategory(
                        selected.categoryId,
                        "category",
                        event
                      );
                      setSelected({
                        categoryId: selected.categoryId,
                        type: "category",
                      });
                    }}
                  >
                    <Link to="/">
                      {categories.map(
                        (item) => item.id === selected.categoryId && item.name
                      )}
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item"
                    onClick={(event) => {
                      addClickedCategoryOrSubcategory(
                        selected.subCategoryId,
                        "subCategory",
                        event
                      );
                      setSelected({
                        categoryId: selected.categoryId,
                        subCategoryId: selected.subCategoryId,
                        type: "subCategory",
                      });
                    }}
                  >
                    <Link to="/">
                      {subCategories.map(
                        (subCategory) =>
                          subCategory.id === selected.subCategoryId &&
                          subCategory.name
                      )}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
