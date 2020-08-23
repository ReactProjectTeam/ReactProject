import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../../img/031.jpg";
import img2 from "../../img/032.jpg";
import img3 from "../../img/033.jpg";
import "./index.scss";
import date from "../../img/blog/date.png";
import { allBlogsList } from "../../API/all_blogs";
import getAllBlogs from "../../API/getAllBlogs";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      getAllBlogs()
          .then((response) => {
              if (response.status === 200) {
                  setBlogs(response.data.data);
              }
          })
          .finally((response) => {
              setIsLoading(false)
          });
  }, []);

  return (
    <>
      <section id="blogs">
        <div className="container">
          <div className="blogs_header">
            <h5>Bütün Bloglar</h5>
          </div>
            {isLoading === true ? (
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                    <div className="spinner-border" style={{color: "#ff9466"}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                blogs.map((blog, index) => (
                    <div className="blog" key={index}>
                        <div className="row">
                            <div className="col-md-5">
                                <div className="blog_left">
                                    <img src={`http://aanar028-001-site3.dtempurl.com/api/blogimage/${blog.photo}`} alt="" />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="blog_right">
                                    <div className="blog_header">
                                        <h4>{blog.title}</h4>
                                    </div>
                                    <div className="blog_date">
                                        <p>
                                            <img src={date} alt="" /> {blog.date}
                                        </p>
                                    </div>
                                    <div className="blog_description">
                                        <p>{blog.description.substring(0,280)}...</p>
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
                ))
            )}

        </div>
      </section>
    </>
  );
};

export default Blogs;
