import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import date from "../../img/blog/date.png";
import axios from "axios";
import getBlogById from "../../API/getBlogById";
import { useCookies } from "react-cookie";

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

  console.log(data)
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
                  <img src={`http://aanar028-001-site3.dtempurl.com/api/blogimage/${data.photo}`} alt="" />
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
    </>
  );
};

export default Blogs;
