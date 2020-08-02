import React, { Component } from 'react'
import { Link } from "react-router-dom";
import img1 from "../../img/031.jpg"
import img2 from "../../img/032.jpg"
import img3 from "../../img/033.jpg"
import "./index.scss"
import date from "../../img/blog/date.png"
import {allBlogsList} from "../../API/all_blogs";




class Blogs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
        }
    }

    componentDidMount = async () => {
        let res = await allBlogsList();
        if (res.status === 200) {
            this.setState({
                blogs: res.data
            });
        }
    };

    render() {
        console.log("this.state.blogs",this.state.blogs)
        let { blogs } = this.state;
        return (
            <>
                <section id="blogs">
                    <div className="container">
                        <div className="blogs_header">
                            <h5>Bütün Bloglar</h5>
                        </div>
                        {blogs.map((blog,index)=>(
                            <div className="blog" key={index}>
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="blog_left">
                                            <img src={blog.img} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="blog_right">
                                            <div className="blog_header">
                                                <h3>{blog.title}</h3>
                                            </div>
                                            <div className="blog_date">
                                                <p><img src={date} alt="" /> {blog.date}</p>
                                            </div>
                                            <div className="blog_description">
                                                <p>{blog.description}</p>
                                            </div>
                                            <div className="blog_button">
                                                <Link to={`/blog_inside/${blog.id}`}>
                                                    <button className="btn">Davamını oxu</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </>
        )
    }
}

export default Blogs
