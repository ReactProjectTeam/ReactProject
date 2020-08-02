import React, {useState} from 'react';
import "./Signup.scss"
import viewCopy from "../../img/login/view-copy.svg"
import {Link} from "react-router-dom";
import register from "../../API/register"

const Signup =()=> {

    const [inputTypePassword, setInputTypePassword] = useState('password');
    const [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState('password');

    const changeTypePassword = (e) => {
        inputTypePassword === 'password' ? setInputTypePassword('text') : setInputTypePassword('password')
    };
    const changeTypeConfirmPassword = (e) => {
        inputTypeConfirmPassword === 'password' ? setInputTypeConfirmPassword('text') : setInputTypeConfirmPassword('password')
    };

    const handleSubmit =(event)=>{
        event.preventDefault()
        const user = {
            name: event.target.name.value,
            surname: event.target.surname.value,
            phonenumber: event.target.phonenumber.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value
        }

        register(user);
    }

    return (
            <section id="login_register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className="wrapper">
                                <div className="header">
                                    <h3>Register</h3>
                                </div>
                                <div className="form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="inputs">
                                            <label htmlFor="">Name</label>
                                            <input type="text" placeholder="Your name" name="name"/>
                                        </div>
                                        <div className="inputs">
                                            <label htmlFor="">Surname</label>
                                            <input type="text" placeholder="Your surname" name="surname"/>
                                        </div>
                                        <div className="inputs">
                                            <label htmlFor="">Phonenumber</label>
                                            <input type="text" placeholder="Your phonenumber" name="phonenumber"/>
                                        </div>
                                        <div className="inputs">
                                            <label htmlFor="">Password</label>
                                            <div className="password">
                                                <input id="password_input" type={inputTypePassword} placeholder="Your password" name="password"/>
                                                <button onClick={changeTypePassword} type="button" className="view">
                                                    <img
                                                        src={viewCopy} alt=""/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="inputs">
                                            <label htmlFor="">Confirm Password</label>
                                            <div className="password">
                                                <input id="password_input" type={inputTypeConfirmPassword} placeholder="Your confirm password" name="confirmPassword"/>
                                                <button onClick={changeTypeConfirmPassword} type="button" className="view">
                                                    <img
                                                        src={viewCopy} alt=""/>
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

export default Signup;
