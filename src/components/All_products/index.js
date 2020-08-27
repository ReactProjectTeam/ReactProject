import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import getAllProducts from "../../API/getAllProducts";

const All_products = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryOrSubcategory, setSelectedCategoryOrSubcategory] = useState("");

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
    setSelectedCategoryOrSubcategory(props.selectedCategoryOrSubcategory)
  }, [props]);



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
              products.map((row, index) => {
                if (selectedCategoryOrSubcategory.type==="category"){
                    if(row.categoryId === selectedCategoryOrSubcategory.id){
                      return(
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
                                    <p>{row.city !== undefined && ( row.city.name)}</p>

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
                      )

                  }
                }else {
                  if (row.subCategoryId === selectedCategoryOrSubcategory.id){
                    return(
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
                                  <p>{row.city !== undefined && ( row.city.name)}</p>

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
                    )
                  }
                }
            })
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default All_products;
