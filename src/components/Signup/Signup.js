import React, {useState} from 'react';
import "./Signup.scss"
import viewCopy from "../../img/login/view-copy.svg"
import {Link} from "react-router-dom";
import register from "../../API/register"
import { useFormik } from 'formik';
import * as yup from 'yup';

const Signup =()=> {

    const [inputTypePassword, setInputTypePassword] = useState('password');
    const [inputTypeConfirmPassword, setInputTypeConfirmPassword] = useState('password');

    const changeTypePassword = (e) => {
        inputTypePassword === 'password' ? setInputTypePassword('text') : setInputTypePassword('password')
    };
    const changeTypeConfirmPassword = (e) => {
        inputTypeConfirmPassword === 'password' ? setInputTypeConfirmPassword('text') : setInputTypeConfirmPassword('password')
    };

    // const handleSubmit =(event)=>{
    //     event.preventDefault()
    //     const user = {
    //         email: event.target.email.value,
    //         password: event.target.password.value,
    //         confirmPassword: event.target.confirmPassword.value,
    //         name: event.target.name.value,
    //         surname: event.target.surname.value,
    //         phonenumber: event.target.phonenumber.value,
    //         address: event.target.address.value
    //     }
    //
    //     register(user);
    // }

    const validateRegister = yup.object({
        email: yup
            .string()
            .email('Email incorrect')
            .required('Email required'),
        password: yup
            .string()
            .min(6,'Must be more than 6')
            .max(50, 'Too long')
            .required('No password provided'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Password must match')
            .required('No password confirmation provided'),
        name: yup
            .string()
            .min(3, 'Name length minimum 3 symbols')
            .max(50, 'too long Name')
            .required('Name required'),
        surname: yup
            .string()
            .min(3, 'Surname length minimum 3 symbols')
            .max(50, 'too long Surname')
            .required('Surname required'),
        phoneNumber: yup
            .string()
            .min(10, 'PhoneNumber length minimum 10 symbols')
            .max(50, 'too long PhoneNumber')
            .required('PhoneNumber required'),
        address: yup
            .string()
            .min(3, 'Address length minimum 3 symbols')
            .max(50,'too long Address')
            .required('Address required'),
    });

    const {handleSubmit,handleChange,values: {email,password,confirmPassword,name,surname,phoneNumber,address},errors} = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            surname: '',
            phoneNumber: '',
            address: '',
        },
        validationSchema: validateRegister,
        onSubmit: values => {
            console.log("values",values)
        },
    });

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
                                            <label htmlFor="">Email</label>
                                            <input type="text" placeholder="Your email" name="email" onChange={handleChange} value={email}/>
                                            {errors.email ? errors.email : null}
                                        </div>
                                        <div className="inputs">
                                            <label htmlFor="">Password</label>
                                            <div className="password">
                                                <input id="password_input" type={inputTypePassword} placeholder="Your password" name="password" onChange={handleChange} value={password}/>
                                                {errors.password ? errors.password : null}
                                                <button onClick={changeTypePassword} type="button" className="view">
                                                    <img
                                                        src={viewCopy} alt=""/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="inputs">
                                            <label htmlFor="">Confirm Password</label>
                                            <div className="password">
                                                <input id="password_input" type={inputTypeConfirmPassword} placeholder="Your confirm password" name="confirmPassword" onChange={handleChange} value={confirmPassword}/>
                                                {errors.confirmPassword ? errors.confirmPassword : null}
                                                <button onClick={changeTypeConfirmPassword} type="button" className="view">
                                                    <img
                                                        src={viewCopy} alt=""/>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="inputs">
                                            <label htmlFor="">Name</label>
                                            <input type="text" placeholder="Your name" name="name" onChange={handleChange} value={name}/>
                                            {errors.name ? errors.name : null}
                                        </div>
                                        <div className="inputs">
                                            <label htmlFor="">Surname</label>
                                            <input type="text" placeholder="Your surname" name="surname" onChange={handleChange} value={surname}/>
                                            {errors.surname ? errors.surname : null}
                                        </div>
                                        <div className="inputs">
                                            <label htmlFor="">PhoneNumber</label>
                                            <input type="text" placeholder="Your phoneNumber" name="phoneNumber" onChange={handleChange} value={phoneNumber}/>
                                            {errors.phoneNumber ? errors.phoneNumber : null}
                                        </div>
                                        <div className="inputs">
                                            <label htmlFor="">Address</label>
                                            <input type="text" placeholder="Your address" name="address" onChange={handleChange} value={address}/>
                                            {errors.address ? errors.address : null}
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
