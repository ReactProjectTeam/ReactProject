import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import menu from "../../img/header/menu.svg";
import close from "../../img/header/close.svg";
import payverLogo from "../../img/header/payverLogo.jpg";
import login from "../../img/header/login.png";
import register from "../../img/header/register.png";
import plus from "../../img/header/plus.png";
import facebook from "../../img/contact/facebook.svg";
import instagram from "../../img/contact/instagram.svg";
import userPhoto from "../../img/header/userPhoto.png";
import logout from "../../img/header/logout.png";
import userLogo from "../../img/header/user.png";
import subCategoryLogo from "../../img/header/subCategory.png";
import down from "../../img/header/down.png";
import up from "../../img/header/up.png";
import clothes from "../../img/header/clothes.png";
import home from "../../img/header/home.png";
import home1 from "../../img/header/home1.png";
import news from "../../img/header/news.png";
import contact from "../../img/header/contact.png";
import cat from "../../img/header/cat.png";
import help from "../../img/header/help.png";
import "./index.scss";
import { useCookies } from "react-cookie";
import getUserByToken from "../../API/getUserByToken";
import getCategories from "../../API/getCategories";
import getSubCategories from "../../API/getSubCategories";
import Context from "../../Context/context";
import { Accordion, Card, Button } from "react-bootstrap";
import isEmpty from "lodash/isEmpty";
// import AccordionCustom from "../../utils/Accardion/Accardion";


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
  const [cookies, removeCookie] = useCookies(["token","fr","wd","m_pixel_ratio","spin","xs","c_user","dpr","datr","sb"]);
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
  const [rendering, setRendering] = useState(false);

  const { renderingHandle } = useContext(Context);
  // console.log("linki goturmek",props.match)
  const { getProductsById, selectedProduct } = useContext(Context);
  const history = useHistory();

  const handleSignOut = () => {
    window.FB.api("/me/permissions", "delete", null, () => window.FB.logout());
    // accountSubject.next(null);
    // history.push('/login');

    removeCookie("token");
    removeCookie("wd");
    removeCookie("m_pixel_ratio");
    removeCookie("spin");
    removeCookie("xs");
    removeCookie("c_user");
    removeCookie("dpr");
    removeCookie("datr");
    removeCookie("sb");
    props.getLoggedOut(true);
  };




  useEffect(() => {
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

  useEffect(() => {
    if (cookies.token !== undefined && cookies.token !== "undefined") {
      getUserByToken(cookies.token).then((responseUser) => {
        if (responseUser.status === 200) {
          setUser(responseUser.data.data);
        }
      });
    }
  }, [props.rendering, cookies.token]);

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

  const openOrCloseAccardionImg = (count) => {
    let newArr = [...mobileMenuImg];
    newArr.map((item, index) => {
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
              <Link
                to="/"
                className="mobile-logo"
                onClick={(event) => {
                  addClickedCategoryOrSubcategory(null, "", event);
                  setSelected({
                    categoryId: null,
                    type: "",
                  });
                }}
              >
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
                            {/*<img*/}
                            {/*  src={*/}
                            {/*    user.photo &&*/}
                            {/*    `http://aanar028-001-site3.dtempurl.com/api/userimage/${user.photo}`*/}
                            {/*  }*/}
                            {/*  alt={user.photo}*/}
                            {/*/>*/}
                            <img src={userPhoto} alt={userPhoto} />
                            <span>{
                              user.email && user.email.includes("@") ? user.email.substring(0, user.email.lastIndexOf("@")) : user.email
                            }
                            </span>
                            {/*<span>{user.userName && user.userName}</span>*/}
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
                          <div className="signin" >
                            <img src={login} alt={login} />
                            <span>Daxil ol</span>
                          </div>
                        </Link>
                      </div>
                      <div className="authDiv">
                        <Link to="/signup" onClick={() => closeMobile()}>
                          <div className="signup" >
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
                            <img src={`https://pricegroup.az/api/categoryimage/${category.photo}`} alt="" />
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
                          // id={subCategory.id}
                          // className={subCategory.active ? "active" : ""}
                          to={`/categoryId/${category.id}`}
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
                            history.push("/");
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
                                to={`/subCategoryId/${subCategory.id}`}
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
                                  history.push("/");
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
                      addClickedCategoryOrSubcategory(null, "", event);
                      setSelected({
                        categoryId: null,
                        type: "",
                      });
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
                  to={{ pathname: "https://www.facebook.com/" }}
                  target="_blank"
                >
                  <img src={facebook} alt="" />
                </Link>
                <Link
                  to={{ pathname: "https://www.instagram.com/runtime.az/" }}
                  target="_blank"
                >
                  <img src={instagram} alt="" />
                </Link>
                <p>
                  Dəstək: <a href="https://mail.google.com/mail/u/0/?view=cm&amp;fs=1&amp;tf=1&amp;to=info@payver.az">info@payver.az</a>
                  {/*<a href="tel:+994502782268">+994502782268</a>*/}
                </p>
              </div>
              <div className="pages">
                <img src={home1} alt={home1} />
                <Link
                  to="/"
                  onClick={(event) => {
                    addClickedCategoryOrSubcategory(null, "", event);
                    setSelected({
                      categoryId: null,
                      type: "",
                    });
                  }}
                >
                  Əsas
                </Link>
                <img src={news} alt={news} />
                <Link to="/blogs">Xəbərlər</Link>
                <img src={contact} alt={contact} />
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
                            {/*<img*/}
                            {/*  src={*/}
                            {/*    user.photo &&*/}
                            {/*    `http://aanar028-001-site3.dtempurl.com/api/userimage/${user.photo}`*/}
                            {/*  }*/}
                            {/*  alt={user.photo}*/}
                            {/*/>*/}
                            <img src={userPhoto} alt={userPhoto} />
                            <span>{
                              user.email && user.email.includes("@") ? user.email.substring(0, user.email.lastIndexOf("@")) : user.email
                            }</span>
                            {/*<span>{user.userName && user.userName}</span>*/}
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
                    {/*{console.log("category.name",category.name.split(" ").join(""))}*/}
                    <Link to={`/categoryId/${category.id}`} className="dropbtn">
                      <div className="categoryLogo">
                        <img src={`https://pricegroup.az/api/categoryimage/${category.photo}`} alt="" />
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
                              to={`/subCategoryId/${subCategory.id}`}
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
                  {categories.map(
                    (category, index) =>
                      category.id === selected.categoryId && (
                        <Link key={index} to={`/categoryId/${category.id}`}>
                          {category.name}
                        </Link>
                      )
                  )}
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
                    {categories.map(
                      (category, index) =>
                        category.id === selected.categoryId && (
                          <Link key={index} to={`/categoryId/${category.id}`}>
                            {category.name}
                          </Link>
                        )
                    )}
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
                    {subCategories.map(
                      (subCategory, index) =>
                        subCategory.id === selected.subCategoryId && (
                          <Link
                            key={index}
                            to={`/subCategoryId/${subCategory.id}`}
                          >
                            {/*{console.log("subCategory",subCategory)}*/}
                            {subCategory.name}
                          </Link>
                        )
                    )}
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
