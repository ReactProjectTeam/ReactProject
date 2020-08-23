import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import getAllProducts from "../../API/getAllProducts";
import getCities from "../../API/getCities";
// import { allProductsList } from "../../API/all_products";

const All_products = (props) => {
  const [products, setProducts] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.data);
        }
      })
      .finally((response) => {
        setIsLoading(false)
      });
    getCities().then((response) => {
      if (response.status === 200) {
        // const city = response.data.data.find(city=>city.id == response.data.data.cityId)
        setCities(response.data.data);
      }
    });
  }, []);
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
            {isLoading === true ? (
              <div className="col-md-12 d-flex justify-content-center align-items-center">
                <div className="spinner-border" style={{color: "#ff9466"}} role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              products.map((row, index) => (
                <div key={index} className="col-md-3">
                  <Link to={`/product_details/${row.id}`}>
                    <div className="products_item">
                      <div className="item">
                        <div className="products_item_top">
                          {row.photos.length > 0 && (
                            <img
                              src={`http://aanar028-001-site3.dtempurl.com/api/productimage/${row.photos[0].path}`}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="products_item_name">
                          <p>{row.title}</p>
                        </div>
                        <div className="products_item_bottom">
                          {cities.map(
                            (city, index) =>
                              city.id === row.cityId && (
                                <p>
                                  <span>{city.name}</span> şəhəri
                                </p>
                              )
                          )}

                          <p>
                            {new Date(row.addedDate).toLocaleDateString()}
                            <span className="ml-2">
                              {new Date(row.addedDate).toLocaleTimeString()}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default All_products;
