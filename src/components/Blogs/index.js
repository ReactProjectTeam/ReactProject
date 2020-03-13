import React, { Component } from 'react'
import { Link } from "react-router-dom";
import img1 from "../../img/031.jpg"
import img2 from "../../img/032.jpg"
import img3 from "../../img/033.jpg"
import "./index.scss"
import date from "../../img/blog/date.png"




class Blogs extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                <section id="blogs">
                    <div className="container">
                        <div className="blogs_header">
                            <h5>Bütün Bloglar</h5>
                        </div>
                        <div className="blog">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="blog_left">
                                        <img src={img1} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="blog_right">
                                        <div className="blog_header">
                                            <h3>First Blog</h3>
                                        </div>
                                        <div className="blog_date">
                                            <p><img src={date} alt="" /> 03 dekabr 2019</p>
                                        </div>
                                        <div className="blog_description">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                        </div>
                                        <div className="blog_button">
                                            <Link to="/blog_inside">
                                                <button className="btn">Davamını oxu</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="blog">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="blog_left">
                                        <img src={img2} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="blog_right">
                                        <div className="blog_header">
                                            <h3>Second Blog</h3>
                                        </div>
                                        <div className="blog_date">
                                            <p><img src={date} alt="" /> 29 noyabr 2019</p>
                                        </div>
                                        <div className="blog_description">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                        </div>
                                        <div className="blog_button">
                                            <Link to="/blog_inside">
                                                <button className="btn">Davamını oxu</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="blog">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="blog_left">
                                        <img src={img3} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="blog_right">
                                        <div className="blog_header">
                                            <h3>Third Blog</h3>
                                        </div>
                                        <div className="blog_date">
                                            <p><img src={date} alt="" /> 22 noyabr 2019</p>
                                        </div>
                                        <div className="blog_description">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                        </div>
                                        <div className="blog_button">
                                            <Link to="/blog_inside">
                                                <button className="btn">Davamını oxu</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Blogs
