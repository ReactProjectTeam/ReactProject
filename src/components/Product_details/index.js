import React, { useState, useEffect } from "react";
import product_number_of_views from "../../img/product_details/product_number_of_views.png";
import product_update_date from "../../img/product_details/product_update_date.png";
import phoneImg from "../../img/product_details/phone.png";
import editImg from "../../img/product_details/edit.png";
import deleteImg from "../../img/product_details/delete.png";
import "./index.scss";
import ReactCarousel from "./ReactCarousel";
import getProductById from "../../API/getProductById";
import getCities from "../../API/getCities";
import isEmpty from "lodash/isEmpty";
import getCategories from "../../API/getCategories";
import getSubCategories from "../../API/getSubCategories";
import { useCookies } from "react-cookie";

const Product_details = (props) => {
  const [data, setData] = useState({});
  const [city, setCity] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    getProductById(props.match.params.id).then((response) => {
      if (response.status === 200) {
        setData(response.data.data);
        getCategories().then((response2) => {
          if (response2.status === 200) {
            const category = response2.data.data.find(
              (category) => category.id == response.data.data.categoryId
            );
            setCategory(category);
          }
        });
        getSubCategories().then((response2) => {
          if (response2.status === 200) {
            const subCategory = response2.data.data.find(
              (subCategory) =>
                subCategory.id == response.data.data.subCategoryId
            );
            setSubCategory(subCategory);
          }
        });
        getCities().then((response2) => {
          if (response2.status === 200) {
            const city = response2.data.data.find(
              (city) => city.id == response.data.data.cityId
            );
            setCity(city);
          }
        });
      }
    });
  }, []);

  console.log("wwwwwwww",data.city)
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
                      Yeniləndi: <span>{data.date}</span>
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
                    <li>{city.name}</li>
                    <li>{category.name}</li>
                    <li>{subCategory.name}</li>
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
                      {(cookies.token !== undefined && cookies.token !== "undefined") && (
                        <div className="product_details_change">
                          <div className="product_details_change_edit">
                            <a href="/">
                              <img src={editImg} alt="" />
                              <p>Düzəliş et</p>
                            </a>
                          </div>
                          <div className="product_details_change_delete">
                            <a href="/">
                              <img src={deleteImg} alt="" />
                              <p>Elanı sil</p>
                            </a>
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
