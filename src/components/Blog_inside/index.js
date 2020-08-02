import React, { Component } from 'react'
import { Link } from "react-router-dom";
import img1 from "../../img/031.jpg"
import img2 from "../../img/032.jpg"
import img3 from "../../img/033.jpg"
import "./index.scss";
import date from "../../img/blog/date.png"
import axios from "axios";




class Blogs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id || "",
            title: "",
            description: "",
            date: "",
            img: "",
        };
        console.log("this.props.match.params.id",this.props.match.params.id )
    }

    componentDidMount =async()=>{
        let {id} = this.state;
        let response = await axios.get(`http://localhost:3000/blogs/${id}`)
        if (response.status === 200) {
            let {title,description,date,img} = response.data
            this.setState({
                title,
                description,
                date,
                img,
            })
        }
    }

    render() {
        let {title,description,date,img} = this.state;
        return (
            <>
                <section id="blog_inside">
                    <div className="container">
                        <div className="blog_header">
                            <h5>Blog haqqında ətraflı</h5>
                        </div>
                        <div className="blog">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="blog_top">
                                        <img src={img} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="blog_bottom">
                                        <div className="blog_header">
                                            <h3>{title}</h3>
                                        </div>
                                        <div className="blog_date">
                                            <p><img src={date} alt="" /> {date}</p>
                                        </div>
                                        <div className="blog_description">
                                            <p>{description}</p>
                                        </div>
                                        <div className="blog_button">
                                            <button className="btn">Davamını oxu</button>
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
