import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/header/logo1.png";
import login from "../../img/header/login.png";
import plus from "../../img/header/plus.png";
import facebook from '../../img/contact/facebook.svg';
import instagram from '../../img/contact/instagram.svg';
import "./index.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
                  <Link to="/blogs">
                  <img src={instagram} alt="" />
                  </Link>
                  <p>Dəstək: <span>(+994)502782268</span></p>
                </div>
                <div className="pages">
                  <Link to="/">Ana Səhifə</Link>
                  <Link to="/blogs">Blog</Link>
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
                            <img src={logo} alt="Logo" />
                            {/* <p>Sənin olsun</p> */}
                          </span>
                        </span>
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="right-side-header">
                  <div className="buttons">
                    <Link to="/add_product">
                      <button className="light-btn">
                        <img src={login} alt="Login" />
                        Giriş
                      </button>
                    </Link>
                    <Link to="/add_product">
                      <button className="light-btn">
                        <img src={plus} alt="Plus" />
                        Elan yerləşdir
                      </button>
                    </Link>
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
                    <a href="/">Xüsusi yardım</a>
                  </li>
                  <li className="dropdown">
                    <a href="/" className="dropbtn">
                      Geyim
                    </a>
                    <div className="dropdown-content">
                      <a href="/">Papaq</a>
                      <a href="/">Kurtka</a>
                      <a href="/">Şalvar</a>
                      <a href="/">Ayaqqabı</a>
                      <a href="/">Köynək</a>
                      <a href="/">Aksesuar</a>
                      <a href="/">Digər</a>
                    </div>
                  </li>
                  <li className="dropdown">
                    <a href="/" className="dropbtn">
                      Ev üçün
                    </a>
                    <div className="dropdown-content">
                      <a href="/">Mebel</a>
                      <a href="/">Elektronika</a>
                      <a href="/">Mətbəx ləvazimatı</a>
                      <a href="/">Digər</a>
                      <a href="/">Köynək</a>
                    </div>
                  </li>

                  <li>
                    <a href="/">Heyvanlar</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
