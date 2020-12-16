import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import date from "../../img/blog/date.png";
import { allBlogsList } from "../../API/all_blogs";
import getAllBlogs from "../../API/getAllBlogs";
import Footer from "../../layout/Footer";

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
            <h5>Bütün Xəbərlər</h5>
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
                                    <img src={`https://pricegroup.az/api/blogimage/${blog.photo}`} alt="" />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="blog_right">
                                    <div className="blog_header">
                                        <h4>{blog.title}</h4>
                                    </div>
                                    <div className="blog_date">
                                        <p>
                                            <img src={date} alt="" />
                                            {new Date(blog.publishDate).toLocaleDateString()}
                                            <span className="ml-2">
                                            {new Date(
                                                blog.publishDate
                                            ).toLocaleTimeString()}
                                          </span>
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
        <Footer/>
    </>
  );
};

export default Blogs;
