import React, {Component} from 'react';
import "./Signin.scss"
import { Link } from "react-router-dom";


class Signup extends Component {
    constructor() {
        super();

    }
    render() {
        return (
            <section id="login_register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className="wrapper">
                                <div className="header">
                                    <h3>Login</h3>
                                </div>
                                <div className="form">
                                    <form>
                                        <div className="inputs">
                                            <label htmlFor="">Username</label>
                                            <input type="text" placeholder="Your username"/>
                                        </div>
                                        <div className="inputs">
                                            <label htmlFor="">Password</label>
                                            <div className="password">
                                                <input id="password_input" type="password" placeholder="Your password"/>
                                                <button type="button" className="view">
                                                    <img
                                                        src="img/login/view-copy.svg" alt=""/>
                                                </button>

                                            </div>
                                        </div>
                                        <div className="remember_forgot">
                                            <label className="checkbox_container">Remember me
                                                <input type="checkbox" defaultChecked={true}/>
                                                <span className="checkmark"></span>
                                            </label>
                                            {/*<a href="">Forgot password?</a>*/}
                                        </div>
                                        <div className="g-recaptcha"
                                             data-sitekey="6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ"></div>
                                        <input className="submit" type="submit" value="Login"/>
                                        <div className="have_acc">
                                            {/*<a href="">Don’t have an Account? Register</a>*/}

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Signup;