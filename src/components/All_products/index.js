import React, { Component } from "react";
import { Link } from "react-router-dom";
// import restangle1 from "../../img/popular_location/rectangle1.jpg";
// import restangle2 from "../../img/popular_location/rectangle2.jpg";
// import restangle3 from "../../img/popular_location/rectangle3.jpg";
// import restangle4 from "../../img/popular_location/rectangle4.jpg";
// import restangle5 from "../../img/popular_location/rectangle5.jpg";
// import restangle6 from "../../img/popular_location/rectangle6.jpg";
// import restangle7 from "../../img/popular_location/rectangle7.jpg";
// import restangle8 from "../../img/popular_location/rectangle8.jpg";
import "./index.scss";
import { allProductsList } from "../../API/all_products";

class All_products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount = async () => {
    let res = await allProductsList();
    if (res.status === 200) {
      this.setState({
        products: res.data
      });
    }
  };
  render() {
    let { products } = this.state;

    return (
      <>
        {/*<h1>All Products</h1>*/}
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
              {products.map((row, index) => (
                <div key={index} className="col-md-3">
                  <Link to={`/product_details/${row.id}`}>
                  <div
                    className="products_item"
                  >
                    <div className="item">
                      <div className="products_item_top">
                        <img src={row.img[0]} alt="" />
                      </div>
                      <div className="products_item_name">
                        <p>{row.title}</p>
                      </div>
                      <div className="products_item_bottom">
                        <p>{row.city} şəhəri</p>
                        <p>{row.date}</p>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default All_products;
