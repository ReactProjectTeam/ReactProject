import React, { Component } from 'react'
import logo from '../../img/footer/logo.svg';
import facebook from '../../img/footer/facebook-letter-logo.svg';
import instagram from '../../img/footer/instagram.svg';
import twitter from '../../img/footer/twitter-logo-silhouette.svg';
import linkedin from '../../img/footer/linkedin-letters.svg';
import send from '../../img/footer/send.svg';

// import '../../scss/main.scss';

class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                <footer>
                    <div className="container">
                        <div className="wrapper">
                            <div className="row">
                                <div className="col-md-4 col-sm-6">
                                    <div className="social">
                                        <div className="logo">
                                            <a href="index.html"><img src={logo} alt="" /></a>
                                        </div>
                                        <div className="description">
                                            <p>Yalnız pulsuz paylaşımlar</p>
                                        </div>
                                        <div className="follow-us">
                                            <ul>
                                                <li><a href="/"><img src={facebook} alt="" /></a></li>
                                                <li><a href="/"><img src={instagram} alt="" /></a></li>
                                                <li><a href="/"><img src={twitter} alt="" /></a></li>
                                                <li><a href="/"><img src={linkedin} alt="" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <div className="site-map">
                                        <p className="header-text">Səhifələr</p>
                                        <ul>
                                            <li><a href="/">Ana Səhifə</a></li>
                                            <li><a href="/">Blog</a></li>
                                            <li><a href="/">Əlaqə</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <div className="contact-subscribe">
                                        <div className="contact">
                                            <p className="header-text">Əlaqə</p>
                                            <ul>
                                                <li><a href="/">info@xususiyardim.com</a></li>
                                                <li><a href="/">+994 50 278 22 68</a></li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        )
    }
}

export default Footer
