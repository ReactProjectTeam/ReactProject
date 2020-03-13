import React, { Component } from 'react';
import location from '../../img/contact/pin.svg';
import telephone from '../../img/contact/phone.png';
import message from '../../img/contact/mail.svg';
import facebook from '../../img/contact/facebook.svg';
import instagram from '../../img/contact/instagram.svg';
import youtube from '../../img/contact/youtube.svg';
import "./index.scss";

export default class Contact extends Component {
    render() {
        return (
            <section id="page-body" className="contact">
            <div className="container">
                <h3 className="secondary-section-title">Bizimlə əlaqə</h3>
            </div>

            <div className="rate-form">
                    <div className="left">
                        <div className="contact-info">
                            <div className="contact-items">
                                <div className="contact-image">
                                    <img src={location} alt="" />
                                </div>
                                <div className="contact-text">
                                    <h3>Ünvan</h3>
                                    <p >Yasamal Rayonu 2 ci alatava</p>
                                </div>
                            </div>
                            <div className="contact-items">
                                <div className="contact-image">
                                    <img src={telephone} alt="" />
                                </div>
                                <div className="contact-text">
                                    <h3>Bizimlə əlaqə</h3>
                                    <p>+994558085245</p>
                                </div>
                            </div>
                            <div className="contact-items">
                                <div className="contact-image">
                                    <img src={message} alt="" />
                                </div>
                                <div className="contact-text">
                                    <h3>E-mail</h3>
                                    <p>bedelov.tebriz@gmail.com</p>
                                </div>
                            </div>
                            {/* <div className="contact-items">
                                <div className="contact-image">
                                    <img src={clock} alt="" />
                                </div>
                                <div className="contact-text">
                                    <h3>{t("Contact.workDate")}</h3>
                                    <p>{t("Contact.workDate1")}</p>
                                    <p>{t("Contact.workTime")}</p>
                                </div>
                            </div> */}
                            <div className="contact-items">
                                <div className="contact-image">
                                </div>
                                <div className="contact-text">
                                    <h3>Sosial media</h3>
                                    <div className="contact-social-icon">
                                        <div>
                                            <img src={facebook} alt="" />
                                        </div>
                                        <div>
                                            <img src={instagram} alt="" />
                                        </div>
                                        <div>
                                            <img src={youtube} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
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
        </section>
        )
    }
}
