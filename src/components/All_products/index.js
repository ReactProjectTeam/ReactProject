import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.scss";
import getAllProducts from "../../API/getAllProducts";
import Context from "../../Context/context";
import isEmpty from "lodash/isEmpty";
import Footer from "../../layout/Footer";

let pageProduct = 1;
const All_products = (props) => {
  const [products, setProducts] = useState([]);
  const [nextProduct, setNextProduct] = useState(true);
  const [countProduct, setCountProduct] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  // const [
  //   selectedCategoryOrSubcategory,
  //   setSelectedCategoryOrSubcategory,
  // ] = useState("");
  const [selectedSort, setSelectedSort] = useState(1);
  const [genders, setGenders] = useState([
    {
      id: "All",
      name: "Hamısı"
    },
    {
      id: "Man",
      name: "Kişi"
    },
    {
      id: "Woman",
      name: "Qadın"
    },
    {
      id: "Boy",
      name: "Uşaq(oğlan)"
    },
    {
      id: "Girl",
      name: "Uşaq(qiz)"
    },
  ]);


  const { getProductCategoryAndSubcategory } = useContext(Context);
  let { categoryId, subCategoryId } = useParams();

  useEffect(() => {
    setNextProduct(true);
    pageProduct = 1;
    props.selectedCategoryOrSubcategory.type == "category"
      ? getAllProducts(
          props.selectedCategoryOrSubcategory.id,
          null,
          4,
          countProduct,
          pageProduct,
        selectedSort
        )
          .then((response) => {
            if (response.status === 200) {
              setProducts(response.data.data);
              props.getProducts(response.data.data);
            }
          })
          .finally((response) => {
            setIsLoading(false);
          })
      : props.selectedCategoryOrSubcategory.type == "subCategory"
      ? getAllProducts(
          null,
          props.selectedCategoryOrSubcategory.id,
          4,
          countProduct,
          pageProduct,
            selectedSort
        )
          .then((response) => {
            if (response.status === 200) {
              setProducts(response.data.data);
              props.getProducts(response.data.data);
            }
          })
          .finally((response) => {
            setIsLoading(false);
          })
      : getAllProducts(categoryId, subCategoryId, 4, countProduct, pageProduct,selectedSort)
          .then((response) => {
            if (response.status === 200) {
              setProducts(response.data.data);
              props.getProducts(response.data.data);
            }
          })
          .finally((response) => {
            setIsLoading(false);
          });
  }, [props.selectedCategoryOrSubcategory, categoryId, subCategoryId]);

  // useEffect(() => {
  //   setSelectedCategoryOrSubcategory(props.selectedCategoryOrSubcategory);
  // }, [props]);

  useEffect(() => {
    const onScroll = (e) => {
      let content = document.getElementById("content");
      let contentHeight = content.offsetHeight;
      let yOffset = window.pageYOffset + 1;
      let y = yOffset + window.innerHeight;
      if (y >= contentHeight) {
        if (nextProduct) {
          pageProduct++;
          getAllProductsHandle();
        }
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [nextProduct,props,pageProduct]);

  const getAllProductsHandle = () => {
    props.selectedCategoryOrSubcategory.type == "category"
      ? getAllProducts(
          props.selectedCategoryOrSubcategory.id,
          null,
          4,
          countProduct,
          pageProduct
        )
          .then((response) => {
            if (response.status === 200) {
              response.data.data.length === 0 && setNextProduct(false);
              response.data.data.map((item) =>
                setProducts((oldProducts) => [...oldProducts, item])
              );
            }
          })
          .finally((response) => {
            setIsLoading(false);
          })
      : props.selectedCategoryOrSubcategory.type === "subCategory"
      ? getAllProducts(
          null,
          props.selectedCategoryOrSubcategory.id,
          4,
          countProduct,
          pageProduct
        )
          .then((response) => {
            if (response.status === 200) {
              response.data.data.length === 0 && setNextProduct(false);
              response.data.data.map((item) =>
                setProducts((oldProducts) => [...oldProducts, item])
              );
            }
          })
          .finally((response) => {
            setIsLoading(false);
          })
      : getAllProducts(null, null, 4, countProduct, pageProduct)
          .then((response) => {
            if (response.status === 200) {
              response.data.data.length === 0 && setNextProduct(false);
              response.data.data.map((item) =>
                setProducts((oldProducts) => [...oldProducts, item])
              );
            }
          })
          .finally((response) => {
            setIsLoading(false);
          });
  };

  const getAllProductsSortHandle = (e) => {
    setSelectedSort(e.target.value)
    props.selectedCategoryOrSubcategory.type == "category"
      ? getAllProducts(
          props.selectedCategoryOrSubcategory.id,
          null,
          4,
          countProduct,
          pageProduct,
          e.target.value
        )
          .then((response) => {
            if (response.status === 200) {
              setProducts(response.data.data);
            }
          })
          .finally((response) => {
            setIsLoading(false);
          })
      : props.selectedCategoryOrSubcategory.type == "subCategory"
      ? getAllProducts(
          null,
            props.selectedCategoryOrSubcategory.id,
          4,
          countProduct,
          pageProduct,
          e.target.value
        )
          .then((response) => {
            if (response.status === 200) {
              setProducts(response.data.data);
            }
          })
          .finally((response) => {
            setIsLoading(false);
          })
      : getAllProducts(null, null, 4, countProduct, pageProduct, e.target.value)
          .then((response) => {
            if (response.status === 200) {
              setProducts(response.data.data);
            }
          })
          .finally((response) => {
            setIsLoading(false);
          });
  };

  return (
    <>
      <section id="all_products">
        <div className="container">
          <div className="all_products_header">
            <div className="all_products_header_left">
              {console.log(props.selectedCategoryOrSubcategory)}
              
              {props.selectedCategoryOrSubcategory.id == 9 && (
                  <>
                    <span>Cinsə görə</span>
                    <div className="select_date">
                      <select
                          id="exampleFormControlSelect1"
                          className="form-control"
                          name="productSort"
                          onChange={(e) => getAllProductsSortHandle(e)}
                      >
                        {
                          genders.map(genderItem=>(
                              <option key={genderItem.id} value={genderItem.id}>{genderItem.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </>
              )}

            </div>
            <div className="all_products_header_right">
              <span>Tarixə görə</span>
              <div className="select_date">
                <select
                  id="exampleFormControlSelect1"
                  className="form-control"
                  name="productSort"
                  onChange={(e) => getAllProductsSortHandle(e)}
                >
                  <option value="1">əvvəlcə yenilər</option>
                  <option value="2">əvvəlcə köhnələr</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
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
            ) : products.length == 0 ? (
              <div className="col-md-12 d-flex justify-content-center align-items-center">
                <div className="notProduct">
                  <h2>0 elan tapıldı</h2>
                  <p>Sizin sorğunuza uyğun heçnə tapılmadı</p>
                </div>
              </div>
            ) : (
              products.map((row, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-4  col-6">
                  <Link to={`/product_details/${row.id}`}>
                    <div
                      className="products_item"
                      onClick={() =>
                        getProductCategoryAndSubcategory(
                          row.categoryId,
                          row.subCategoryId,
                          "subCategory"
                        )
                      }
                    >
                      <div className="item">
                        <div className="products_item_top">
                          {row.photos.length > 0 && (
                            <img
                              src={`https://pricegroup.az/api/productimage/${
                                row.photos.filter(
                                  (x) => x.status === "Created"
                                )[0].path
                              }`}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="products_item_name">
                          <p>{row.title}</p>
                        </div>
                        <div className="products_item_bottom">
                          <p>{row.city !== undefined && row.city.name}</p>
                          <p>
                            {new Date(row.publishDate).toLocaleDateString() ===
                            new Date().toLocaleDateString() ? (
                              <>
                                <span>bugün</span>,
                                <span className="ml-2">
                                  {new Date(row.publishDate).getHours()}:
                                  {new Date(row.publishDate).getMinutes() < 10
                                    ? `0${new Date(row.publishDate).getMinutes()}`
                                    : new Date(row.publishDate).getMinutes()}
                                </span>
                              </>
                            ) : (
                              <>
                                <span>
                                  {new Date(row.publishDate).toLocaleDateString()}
                                </span>
                              </>
                            )}
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
      <Footer products={products} all_products={"all_products"}/>
    </>
  );
};
export default All_products;
