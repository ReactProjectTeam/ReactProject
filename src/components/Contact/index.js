import React from 'react';
import location from '../../img/contact/pin.svg';
import telephone from '../../img/contact/phone.png';
import message from '../../img/contact/mail.svg';
import facebook from '../../img/contact/facebook.svg';
import instagram from '../../img/contact/instagram.svg';
import social from '../../img/contact/social.png';


import { Link } from "react-router-dom";
import "./index.scss";
import SignupEmail from "../Signup/SignupEmail";

const Contact =()=> {

        return (
            <section id="page-body" className="contact">
            <div className="container">
                <h3 className="secondary-section-title">Bizimlə əlaqə</h3>
            </div>

            <div className="rate-form">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="left">
                                <div className="contact-info">
                                    <div className="contact-items">
                                        <div className="contact-image">
                                            <img src={location} alt="" />
                                        </div>
                                        <div className="contact-text">
                                            <h3>Ünvan</h3>
                                            <p>Həsən Əliyev 9</p>
                                        </div>
                                    </div>
                                    <div className="contact-items">
                                        <div className="contact-image">
                                            <img src={telephone} alt="" />
                                        </div>
                                        <div className="contact-text">
                                            <h3>Bizimlə əlaqə</h3>
                                            <p>+994502782268</p>
                                        </div>
                                    </div>
                                    <div className="contact-items">
                                        <div className="contact-image">
                                            <img src={message} alt="" />
                                        </div>
                                        <div className="contact-text">
                                            <h3>E-mail</h3>
                                            <p>info@payver.az</p>
                                        </div>
                                    </div>

                                    <div className="contact-items">
                                        <div className="contact-image">
                                            <img src={social} alt="" />
                                        </div>
                                        <div className="contact-text">
                                            <h3>Sosial media</h3>
                                            <div className="contact-social-icon">
                                                <Link to={{ pathname: "https://www.facebook.com/" }} target="_blank">
                                                    <img src={facebook} alt="" />
                                                </Link>

                                                <Link to={{ pathname: "https://www.instagram.com/runtime.az/" }} target="_blank">
                                                    <img src={instagram} alt="" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="right">
                                <form>
                                    <div className="input">
                                        <input type="text" name="fullName" inputtype="text" placeholder="Ad" />
                                    </div><p></p>
                                    <div className="input">
                                        <input type="email" name="email" inputtype="email" placeholder="E-mail" />
                                    </div><p></p>
                                    <textarea name="message" placeholder="Mesaj" id="">
                            </textarea><p></p>
                                    <input type="submit" value="Göndər"/></form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </section>
        )

}

export default Contact;
