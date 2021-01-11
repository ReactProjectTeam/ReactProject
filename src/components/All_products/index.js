import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./index.scss";
import getAllProducts from "../../API/getAllProducts";
import Context from "../../Context/context";
import Footer from "../../layout/Footer";
import getSubCategories from "../../API/getSubCategories";
import isEmpty from "lodash/isEmpty";
import qs from "query-string";
import InfiniteScroll from "react-infinite-scroll-component";

let pageProduct = 1;
const All_products = (props) => {
  const [products, setProducts] = useState([]);
  // const [nextProduct, setNextProduct] = useState(true);
  const [countProduct, setCountProduct] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  const [genders, setGenders] = useState([
    {
      id: "All",
      name: "Hamısı",
    },
    {
      id: "Man",
      name: "Kişi",
    },
    {
      id: "Woman",
      name: "Qadın",
    },
    {
      id: "Boy",
      name: "Uşaq (oğlan)",
    },
    {
      id: "Girl",
      name: "Uşaq (qız)",
    },
  ]);
  const [isLoadingMini, setIsLoadingMini] = useState(true);

  const { getProductCategoryAndSubcategory } = useContext(Context);

  const history = useHistory();

  const queryParam = qs.parse(props.location.search);
  const query = new URLSearchParams(props.location.search);
  const category = query.get("category");
  const subCategory = query.get("subCategory");
  const sort = query.get("sort");
  const sortGender = query.get("sortGender");

  useEffect(() => {
    pageProduct = 1
    setIsLoadingMini(true)
    getAllProducts(
      category,
      subCategory,
      4,
      countProduct,
      pageProduct,
      sort,
      sortGender
    )
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.length < 8) {
            // let loader = document.getElementById("loaderId")
            // loader.classList.add("loaderDisplayNone")
            setIsLoadingMini(false);
            pageProduct=1;
          }
          setProducts(response.data.data);
        }
      })
      .finally((response) => {
        setIsLoading(false);
      });
  }, [category, subCategory, sort, sortGender]);

  useEffect(() => {
    getSubCategories().then((response) => setSubCategories(response.data.data));
  }, []);


  const getAllProductsSortHandle = (e) => {
    const newQueryParam = {
      ...queryParam,
      sort: e.target.value,
    };

    history.push({
      pathname: `/`,
      search: qs.stringify(newQueryParam),
    });
    pageProduct = 1;
    // setNextProduct(true);
  };

  const getAllProductsSortGenderHandle = (e) => {
    const newQueryParam = {
      ...queryParam,
      sortGender: e.target.value,
    };

    history.push({
      pathname: `/`,
      search: qs.stringify(newQueryParam),
    });
  };

  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (products.length >= 500) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    pageProduct++;

    getAllProducts(
      category,
      subCategory,
      4,
      countProduct,
      pageProduct,
      sort,
      sortGender
    )
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.length < 8) {
            // let loader = document.getElementById("loaderId")
            // loader.classList.add("loaderDisplayNone")
            setIsLoadingMini(false);
            // pageProduct=1;
          }
          response.data.data.map((item) =>
            setProducts((oldProducts) => [...oldProducts, item])
          );
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
              {subCategories.length > 0 &&
                (category === "9" ||
                  (typeof subCategories.find(
                    (sub) => sub.id === Number(subCategory)
                  ) !== "undefined" &&
                    subCategories.find((sub) => sub.id === Number(subCategory))
                      .categoryId === Number(9))) && (
                  <>
                    <span>Cinsə görə</span>
                    <div className="select_date">
                      <select
                        id="exampleFormControlSelect1"
                        className="form-control"
                        name="productSortGender"
                        value={sortGender === null ? "All" : sortGender}
                        onChange={(e) => getAllProductsSortGenderHandle(e)}
                      >
                        {genders.map((genderItem) => (
                          <option key={genderItem.id} value={genderItem.id}>
                            {genderItem.name}
                          </option>
                        ))}
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
                  value={sort === null ? 1 : sort}
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
              <InfiniteScroll
                dataLength={products.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  isLoadingMini && (
                    <div
                      className="col-md-12 d-flex justify-content-center align-items-center"
                      style={{ height: "100px" }}
                      id="loaderId"
                    >
                      <div
                        className="spinner-border"
                        style={{ color: "#ff9466" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )
                }

              >
                <div className="container">
                  <div className="row">
                    {products.map((row, index) => (
                      <div
                        key={index}
                        className="col-lg-3 col-md-4 col-sm-4  col-6"
                      >
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
                                  {new Date(
                                    row.publishDate
                                  ).toLocaleDateString() ===
                                  new Date().toLocaleDateString() ? (
                                    <>
                                      <span>bugün</span>,
                                      <span className="ml-2">
                                        {new Date(row.publishDate).getHours()}:
                                        {new Date(
                                          row.publishDate
                                        ).getMinutes() < 10
                                          ? `0${new Date(
                                              row.publishDate
                                            ).getMinutes()}`
                                          : new Date(
                                              row.publishDate
                                            ).getMinutes()}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span>
                                        {new Date(
                                          row.publishDate
                                        ).toLocaleDateString()}
                                      </span>
                                    </>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </section>
      <Footer products={products} all_products={"all_products"} />
    </>
  );
};
export default All_products;
