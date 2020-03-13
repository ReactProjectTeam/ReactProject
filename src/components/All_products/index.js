import React, { Component } from "react";
import { Link } from "react-router-dom";
import restangle1 from "../../img/popular_location/rectangle1.jpg";
import restangle2 from "../../img/popular_location/rectangle2.jpg";
import restangle3 from "../../img/popular_location/rectangle3.jpg";
import restangle4 from "../../img/popular_location/rectangle4.jpg";
import restangle5 from "../../img/popular_location/rectangle5.jpg";
import restangle6 from "../../img/popular_location/rectangle6.jpg";
import restangle7 from "../../img/popular_location/rectangle7.jpg";
import restangle8 from "../../img/popular_location/rectangle8.jpg";
import "./index.scss";

class All_products extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <section id="all_products">
          <div className="container">
            <div className="all_products_header">
              <div className="all_products_header_left">
                <h5>Bütün elanlar</h5>
              </div>
              <div className="all_products_header_right">
                <div className="select_date">
                  <label htmlFor="exampleFormControlSelect1">Tarixə görə</label>
                  <select id="exampleFormControlSelect1">
                    <option value="date_asc">A-Z</option>
                    <option value="date_desc">Z-A</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <Link to="/product_details">
                  <div className="products_item">
                    <div className="item">
                      <div className="products_item_top">
                        <img src={restangle1} alt="" />
                      </div>
                      <div className="products_item_name">
                        <p>Riyaziyyat Kitabı</p>
                      </div>
                      <div className="products_item_bottom">
                        <p>Bakı şəhəri</p>
                        <p>27 noyabr 2019</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-3">
                <Link to="/product_details">
                  <div className="products_item">
                    <div className="item">
                      <div className="products_item_top">
                        <img src={restangle2} alt="" />
                      </div>
                      <div className="products_item_name">
                        <p>Uşaq paltarları</p>
                      </div>
                      <div className="products_item_bottom">
                        <p>Bakı şəhəri</p>
                        <p>25 noyabr 2019</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-3">
                <Link to="/product_details">
                  <div className="products_item">
                    <div className="item">
                      <div className="products_item_top">
                        <img src={restangle3} alt="" />
                      </div>
                      <div className="products_item_name">
                        <p>Toyuğ</p>
                      </div>
                      <div className="products_item_bottom">
                        <p>Sumqayıt şəhəri</p>
                        <p>22 noyabr 2019</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-3">
                <Link to="/product_details">
                  <div className="products_item">
                    <div className="item">
                      <div className="products_item_top">
                        <img src={restangle4} alt="" />
                      </div>
                      <div className="products_item_name">
                        <p>Gödəkcə</p>
                      </div>
                      <div className="products_item_bottom">
                        <p>Bakı şəhəri</p>
                        <p>20 noyabr 2019</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-3">
                <Link to="/product_details">
                  <div className="products_item">
                    <div className="item">
                      <div className="products_item_top">
                        <img src={restangle5} alt="" />
                      </div>
                      <div className="products_item_name">
                        <p>Uşaq Kurtkası</p>
                      </div>
                      <div className="products_item_bottom">
                        <p>Bakı şəhəri</p>
                        <p>19 noyabr 2019</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-3">
                <Link to="/product_details">
                  <div className="products_item">
                    <div className="item">
                      <div className="products_item_top">
                        <img src={restangle6} alt="" />
                      </div>
                      <div className="products_item_name">
                        <p>Ayaqqabı</p>
                      </div>
                      <div className="products_item_bottom">
                        <p>Bakı şəhəri</p>
                        <p>17 noyabr 2019</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-3">
                <Link to="/product_details">
                  <div className="products_item">
                    <div className="item">
                      <div className="products_item_top">
                        <img src={restangle7} alt="" />
                      </div>
                      <div className="products_item_name">
                        <p>Saat</p>
                      </div>
                      <div className="products_item_bottom">
                        <p>Sumqayıt şəhəri</p>
                        <p>15 noyabr 2019</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-3">
                <Link to="/product_details">
                  <div className="products_item">
                    <div className="item">
                      <div className="products_item_top">
                        <img src={restangle8} alt="" />
                      </div>
                      <div className="products_item_name">
                        <p>Pulsuz yemək</p>
                      </div>
                      <div className="products_item_bottom">
                        <p>Bakı şəhəri</p>
                        <p>20 noyabr 2019</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default All_products;
