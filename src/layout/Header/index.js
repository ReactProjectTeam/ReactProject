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
                  {/*<Link to="https://www.instagram.com/runtime.az/">*/}
                    <a href="https://www.instagram.com/runtime.az/">
                      <img src={instagram} alt="" />
                    </a>
                  {/*</Link>*/}
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
                    {/*<Link to="/signin">*/}
                    {/*  <button className="light-btn">*/}
                    {/*    <img src={login} alt="Login" />*/}
                    {/*    Giriş*/}
                    {/*  </button>*/}
                    {/*</Link>*/}
                    <div className="head right profile">
                      <Link to="/signin">
                      <div className="signin">
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAV9JREFUOBFjZMAColLatjIw/PfCIoUixMjIsJ0FRQTOAWpmZ1dYNrXkIVwIjZGQ0a7w68+/+0xo4nCumqjxUzgHC8PLSfkxSBinAVj0YBUiaEBCQb8AVp1QQRwGMDUwMDj8A6n5/eX73KjU1g6oejh17VrofxAHqwHL5lQ2NjQwgg34z8qYwvCf0SUqpbUJrhuJwRKd2poLjA5hJDFU5t9/DP8ZGI8yMDJUR6e1/1w6q7IVWQFWFyArALOZGP79/8/4n+H/fw6YXH090FwgYIQJ4KLT0jr4v/7/txMof3Dp7KpymLr/QBOjU9v+YXVBdEprS0PDf7Dcl/9/5wK9cAJZM8wQEI3VAKDbqhkYDoDl2FhZc5bNrixA1gRiMzICvQQEWA0AScDAgmllL2BsbDRBA7BpQhbDacCt12elkRWis6NTOmVAYjhyI+M2hp8/HwATD7o+OP8/wx9gODBsBwBeoGOV7j5MmAAAAABJRU5ErkJggg=="
                          alt=""/>
                          Login
                      </div>
                      </Link>
                      <Link to="/signup">
                      <div className="signup"><img src="/static/media/avatar.ab1f5bd8.svg" alt=""/>
                       Register
                      </div>
                    </Link>
                    </div>
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
                    <Link to="/">Xüsusi yardım</Link>
                  </li>
                  <li className="dropdown">
                    <Link to="/" className="dropbtn">
                      Geyim
                    </Link>
                    <div className="dropdown-content">
                      <Link to="/">Papaq</Link>
                      <Link to="/">Kurtka</Link>
                      <Link to="/">Şalvar</Link>
                      <Link to="/">Ayaqqabı</Link>
                      <Link to="/">Köynək</Link>
                      <Link to="/">Aksesuar</Link>
                      <Link to="/">Digər</Link>
                    </div>
                  </li>
                  <li className="dropdown">
                    <Link to="/" className="dropbtn">
                      Ev üçün
                    </Link>
                    <div className="dropdown-content">
                      <Link to="/">Mebel</Link>
                      <Link to="/">Elektronika</Link>
                      <Link to="/">Mətbəx ləvazimatı</Link>
                      <Link to="/">Digər</Link>
                      <Link to="/">Köynək</Link>
                    </div>
                  </li>

                  <li>
                    <Link to="/">Heyvanlar</Link>
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
