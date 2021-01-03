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
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import getUserByToken from "../../API/getUserByToken";
import swal from "sweetalert";
import { Carousel } from "react-bootstrap";

import LocationOn from "@material-ui/icons/LocationOn";
import Home from "@material-ui/icons/Home";
import Category from "@material-ui/icons/Category";
import SubdirectoryArrowRight from "@material-ui/icons/SubdirectoryArrowRight";
import Footer from "../../layout/Footer";

const Product_details = (props) => {
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  const history = useHistory();

  useEffect(() => {
    getProductById(props.match.params.id)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.data);
        }
      })
      .finally((response) => {
        setIsLoading(false);
      });

    !isEmpty(cookies) &&
      getUserByToken(cookies.token).then((res) => setUser(res.data.data));
  }, []);

  return (
    <>
      <section id="product_details">
        <div className="container">
          {isLoading === true ? (
            <div
              className="col-md-12 d-flex justify-content-center align-items-center"
              style={{ height: "55vh" }}
            >
              <div
                className="spinner-border"
                style={{ color: "#ff9466" }}
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) :
              data.status == "Created" ||
              data.status == "Updated" ||
            data.status == "Blocked" ||
            data.status == "Disabled" ||
            data.status == "Deleted" ? (
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                  <div className="notProduct">
                    <h2>0 elan tapıldı</h2>
                    <p>Sizin sorğunuza uyğun heçnə tapılmadı</p>
                  </div>
                </div>
          ) : (
            <div className="row">
              <div className="col-md-6">
                <div className="product_details_images">
                  <div className="row">
                    <div className="col-md-12">
                      {!isEmpty(data.photos) ? (
                        <ReactCarousel
                          img={data.photos
                            .filter((x) => x.status === "Created")
                            .map(
                              (x) =>
                                `https://pricegroup.az/api/productimage/${x.path}`
                            )}
                        />
                      ) : (
                        ""
                      )}
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
                        Yeniləndi:{" "}
                        <span>
                          {new Date(data.publishDate).toLocaleDateString()}
                        </span>
                        <span className="ml-2">
                          {new Date(data.publishDate).toLocaleTimeString()}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="product_details_categories">
                    <ul className="product_details_categories_left">
                      <li>
                        <LocationOn /> Şəhər
                      </li>
                      <li>
                        <Home />
                        Ünvan
                      </li>
                      <li>
                        <Category />
                        Kateqoriya
                      </li>

                      {data.subCategory !== undefined &&
                        data.subCategory !== null && (
                          <li>
                            <SubdirectoryArrowRight /> Alt kateqoriya
                          </li>
                        )}
                    </ul>
                    <ul className="product_details_categories_right">
                      <li>{data.city !== undefined && data.city.name}</li>
                      <li>{data.ownerAddress}</li>
                      <li>
                        {data.category !== undefined && data.category.name}
                      </li>
                      {data.subCategory !== undefined &&
                        data.subCategory !== null && (
                          <li>{data.subCategory.name}</li>
                        )}
                    </ul>
                  </div>
                  <div className="product_details_description">
                    <p>{data.description}</p>
                  </div>
                  <div className="product_details_author_and_change">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="product_details_author">
                          <div className="product_details_author_left">
                            <div className="product_details_author_phone_number">
                              <a href={`tel:${data.ownerPhoneNumber}`}>
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
                      <div className="col-lg-6">
                        {!isEmpty(data) && user.id === data.userId ? (
                          <div className="product_details_change">
                            <div className="product_details_change_edit">
                              <Link to={`/update_product/${data.id}`}>
                                <img src={editImg} alt="" />
                                <p>Düzəliş et</p>
                              </Link>
                            </div>
                            <div className="product_details_change_delete">
                              <Link
                                // to="/"
                                to={() => false}
                                onClick={() =>
                                  swal({
                                    title: "Silmək istiyirsiz ?",
                                    // text: "Silmək istiyirsiz ?",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                  }).then((willDelete) => {
                                    if (willDelete) {
                                      deleteProductById(
                                        cookies.token,
                                        data.id
                                      ).then(() => {
                                        history.push("/");
                                      });
                                    }
                                  })
                                }
                              >
                                <img src={deleteImg} alt="" />
                                <p>Elanı sil</p>
                              </Link>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Product_details;
