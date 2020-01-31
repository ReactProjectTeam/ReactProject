import React, { Component } from 'react'
import { Link } from "react-router-dom";
import logo from '../../img/header/logo.svg';

// import '../../scss/main.scss';



class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

 
       

    render() {
        return (
                <>
                <header  className="header">
                    <div className="inner-header">
                        <div className="container">
                            <div className="inside-inner">
                                <Link to="/blogs">Blog</Link>
                                <Link to="/contact">Əlaqə</Link>
                            </div>
                        </div>
                    </div>
                    <div className="center-header">
                        <div className="container">
                            <div className="wrapper">
                                <div className="logo">
                                    <Link to="/">
                                        <img src= {logo} alt="Logo"/>
                                    </Link>
                                 </div>
                                    <div className="right-side-header">
                                        <div className="buttons">
                                            <button className="light-btn">Giriş</button>
                                            <button className="dark-btn">Elan yerləşdir</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    <div className="menu" id="menu">
                            <div className="container">
                                <nav>
                                    <ul>
                                        <li className="active"><a href="index.html">Ana Səhifə</a></li>
                                        <li className="dropdown">
                                            <a href="/" className="dropbtn">Geyim</a>
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
                                            <a href="/" className="dropbtn">Ev üçün</a>
                                            <div className="dropdown-content">
                                                <a href="/">Mebel</a>
                                                <a href="/">Elektronika</a>
                                                <a href="/">Mətbəx ləvazimatı</a>
                                                <a href="/">Digər</a>
                                                <a href="/">Köynək</a>
                                            </div>
                                        </li>
                                        <li><a href="/">Xüsusi yardım</a></li>
                                        <li><a href="/">Heyvanlar</a></li>

                                    </ul>
                                </nav>
                            </div>
                        </div>
                </header>
                </>
                )
            }
        }
        
export default Header
