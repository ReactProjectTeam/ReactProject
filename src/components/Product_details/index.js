import React, { useState, useEffect } from "react";
import product_number_of_views from "../../img/product_details/product_number_of_views.png";
import product_update_date from "../../img/product_details/product_update_date.png";
import phoneImg from "../../img/product_details/phone.png";
import editImg from "../../img/product_details/edit.png";
import deleteImg from "../../img/product_details/delete.png";
import "./index.scss";
import ReactCarousel from "./ReactCarousel";
import getProductById from "../../API/getProductById";
import isEmpty from "lodash/isEmpty";
import { useCookies } from "react-cookie";
import deleteProductById from "../../API/deleteProductById";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Product_details = (props) => {
  const [data, setData] = useState({});
  const [cookies] = useCookies(["token"]);
  const history = useHistory();
  useEffect(() => {
    getProductById(props.match.params.id).then((response) => {
      if (response.status === 200) {
        setData(response.data.data);
      }
    });
  }, []);

  return (
    <>
      <section id="product_details">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="product_details_images">
                <div className="row">
                  <div className="col-md-12">
                    {/* <!-- Carousel Start --> */}
                    {!isEmpty(data.photos) ? (
                      <ReactCarousel
                        img={data.photos.map(
                          (x) =>
                            `http://aanar028-001-site3.dtempurl.com/api/productimage/${x.path}`
                        )}
                      />
                    ) : (
                      ""
                    )}
                    {/* <!-- Carousel End --> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product_details_info">
                <header className="product_details_info_header">
                  <h4>{data.title}</h4>
                </header>
                <div className="lot_info">
                  <div className="product_number_of_views">
                    <img src={product_number_of_views} alt="" />
                    <p>
                      Baxışların sayı: <span>{data.showCount}</span>
                    </p>
                  </div>
                  <div className="product_update_date">
                    <img src={product_update_date} alt="" />
                    <p>
                      Yeniləndi: <span>{new Date(data.publishDate).toLocaleDateString()}</span>
                      <span className="ml-2">
                              {new Date(data.publishDate).toLocaleTimeString()}
                            </span>
                    </p>
                  </div>
                </div>

                <div className="product_details_categories">
                  <ul className="product_details_categories_left">
                    <li>Şəhər</li>
                    <li>Kateqoriya</li>
                    <li>Alt kateqoriya</li>
                  </ul>
                  <ul className="product_details_categories_right">
                    <li>{data.city !== undefined && data.city.name}</li>
                    <li>{data.category !== undefined && data.category.name}</li>
                    <li>
                      {data.subCategory !== undefined && data.subCategory.name}
                    </li>
                  </ul>
                </div>
                <div className="product_details_description">
                  <p>{data.description}</p>
                </div>
                <div className="product_details_author_and_change">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="product_details_author">
                        <div className="product_details_author_left">
                          <div className="product_details_author_phone_number">
                            <a href="tel:+994502782268">
                              {data.ownerPhoneNumber}
                            </a>
                          </div>
                          <div className="product_details_author_name">
                            <p>{data.ownerName}</p>
                          </div>
                        </div>
                        <div className="product_details_author_right">
                          <img src={phoneImg} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      {cookies.token !== undefined &&
                        cookies.token !== "undefined" && (
                          <div className="product_details_change">
                            <div className="product_details_change_edit">
                              <a href="/">
                                <img src={editImg} alt="" />
                                <p>Düzəliş et</p>
                              </a>
                            </div>
                            <div className="product_details_change_delete">
                              <Link
                                to="/"
                                onClick={() =>
                                  deleteProductById(
                                    cookies.token,
                                    data.id
                                  ).then(() => {
                                    history.go(0)
                                  })
                                }
                                //   onClick={()=>{
                                //     return Redirect("/")
                                //   }}
                              >
                                <img src={deleteImg} alt="" />
                                <p>Elanı sil</p>
                              </Link>
                            </div>
                          </div>
                        )}
                    </div>
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

export default Product_details;
