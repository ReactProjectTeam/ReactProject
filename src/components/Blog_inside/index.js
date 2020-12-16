import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import date from "../../img/blog/date.png";
import axios from "axios";
import getBlogById from "../../API/getBlogById";
import { useCookies } from "react-cookie";
import Footer from "../../layout/Footer";

const Blogs = (props) => {
  const [data, setData] = useState({});
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    getBlogById(props.match.params.id).then((response) => {
      if (response.status === 200) {
        setData(response.data.data);
      }
    });
  }, []);

  return (
    <>
      <section id="blog_inside">
        <div className="container">
          <div className="blog_header">
            <h5>Xəbər haqqında ətraflı</h5>
          </div>
          <div className="blog">
            <div className="row">
              <div className="col-md-12">
                <div className="blog_top">
                  <img
                    src={`https://pricegroup.az/api/blogimage/${data.photo}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="blog_bottom">
                  <div className="blog_header">
                    <h3>{data.title}</h3>
                  </div>
                  <div className="blog_date">
                    <p>
                      <img src={date} alt="" />
                      {new Date(data.publishDate).toLocaleDateString()}
                      <span className="ml-2">
                        {new Date(data.publishDate).toLocaleTimeString()}
                      </span>
                    </p>
                  </div>
                  <div className="blog_description">
                    <p>{data.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Blogs;
