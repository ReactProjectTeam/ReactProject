import React, { Component } from "react";
import product_number_of_views from "../../img/product_details/product_number_of_views.png";
import product_update_date from "../../img/product_details/product_update_date.png";
import phoneImg from "../../img/product_details/phone.png";
import editImg from "../../img/product_details/edit.png";
import deleteImg from "../../img/product_details/delete.png";
import "./index.scss";
import ReactCarousel from "./ReactCarousel";
import axios from "axios";

class Product_details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id || "",
      title: "",
      city: "",
      name: "",
      phone: "",
      description: "",
      date: "",
      img: "",
    };

  }

  componentDidMount =async()=>{
    let {id} = this.state;
    let response = await axios.get(`http://localhost:3000/products/${id}`)
    if (response.status === 200) {
      let {title,city,name,phone,description,date,img} = response.data
      this.setState({
        title,
        city,
        name,
        phone,
        description,
        date,
        img,
      })
    }
  }

  render() {
    let {title,city,name,phone,description,date,img} = this.state;

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
                      <ReactCarousel img={img}/>
                      {/* <!-- Carousel End --> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="product_details_info">
                  <header className="product_details_info_header">
                    <h4>{title}</h4>
                  </header>
                  <div className="lot_info">
                    <div className="product_number_of_views">
                      <img src={product_number_of_views} alt="" />
                      <p>
                        Baxışların sayı: <span>29</span>
                      </p>
                    </div>
                    <div className="product_update_date">
                      <img src={product_update_date} alt="" />
                      <p>
                        Yeniləndi: <span>{date}</span>
                      </p>
                    </div>
                  </div>

                  <div className="product_details_categories">
                    <ul className="product_details_categories_left">
                      <li>Şəhər</li>
                      <li>Geyim tipi</li>
                      <li>Geyim növü</li>
                    </ul>
                    <ul className="product_details_categories_right">
                      <li>{city}</li>
                      <li>Kişi geyimləri</li>
                      <li>Ayaqqabılar</li>
                    </ul>
                  </div>
                  <div className="product_details_description">
                    <p>
                      {description}
                    </p>
                  </div>
                  <div className="product_details_author_and_change">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="product_details_author">
                          <div className="product_details_author_left">
                            <div className="product_details_author_phone_number">
                                <a href="tel:+994502782268">{phone}</a>
                            </div>
                            <div className="product_details_author_name">
                              <p>{name}</p>
                            </div>
                          </div>
                          <div className="product_details_author_right">
                            <img src={phoneImg} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
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
  }
}

export default Product_details;
