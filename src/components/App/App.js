import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../../layout";
import Signup from "../Signup/Signup";
import Signin from "../Signin/Signin";
import All_products from "../All_products";
import Product_details from "../Product_details";
import Blogs from "../Blogs";
import Blog_inside from "../Blog_inside";
import Add_product from "../Add_product";
import Contact from "../Contact";
import NotFound from "../NotFound";
// import getUserByToken from "../../API/getUserByToken";
import { useCookies } from "react-cookie";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PrivateRouteSignUpSignIn from "../PrivateRoute/PrivateRouteSignUpSignIn";
import UserInfo from "../UserInfo";
import Context from "../../Context/context";
import Confirm from "../Confirm";
import ForgotPassword from "../ForgotPassword";
import ConfirmPassword from "../ConfirmPassword";
import Swal from "../Swal";
import getUserByToken from "../../API/getUserByToken";
import isEmpty from "lodash/isEmpty";
import Test from "../Test/Test";
import Update_product from "../Update_product";

const App = () => {
  const [cookies] = useCookies(["token"]);
  const [
    selectedCategoryOrSubcategory,
    setSelectedCategoryOrSubcategory,
  ] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const isAuth =
    cookies.token === "undefined" || cookies.token === undefined ? false : true;
  const [user, setUser] = useState({});
  const [rendering, setRendering] = useState(null);

  useEffect(() => {
    if (cookies.token !== undefined && cookies.token !== "undefined") {
      getUserByToken(cookies.token).then((responseUser) => {
        if (responseUser.status === 200) {
          setUser(responseUser.data.data);
        }
      });
    }
  }, []);

  const handleScroll = () => {
    let content = document.getElementById("content1");
    let menu = document.getElementById("menu");

    if (window.pageYOffset >= 154) {
      menu.classList.add("sticky");

      content.classList.add("menu-padding");
    } else {
      menu.classList.remove("sticky");
      content.classList.remove("menu-padding");
    }
  };

  const getProductsById = (id, type) => {
    const newObj = { id, type };
    setSelectedCategoryOrSubcategory(newObj);
  };

  const getProductCategoryAndSubcategory = (
    categoryId,
    subCategoryId,
    type
  ) => {
    const newObj = { categoryId, subCategoryId, type };
    setSelectedProduct(newObj);
  };

  const renderingHandle =(rendering)=>{
    setRendering(rendering)
  }

  return (
    <Context.Provider
      value={{
        getProductsById,
        getProductCategoryAndSubcategory,
        selectedProduct,
        renderingHandle,
      }}
    >
      <>
        <Router>
          <div id="content1">
            <Route path="/confirm" component={Confirm} />
            <Layout rendering={rendering}>
              <Switch>
                <Route path="/test" component={Test} />
                <Route path="/confirmpassword" component={ConfirmPassword} />
                <Route path="/forgotpassword" component={ForgotPassword} />
                <Route path="/swal" component={Swal} />

                <Route path="/signup" component={Signup}>
                  <PrivateRouteSignUpSignIn isAuth={isAuth}>
                    <Signup />
                  </PrivateRouteSignUpSignIn>
                </Route>
                <Route path="/signin" component={Signin}>
                  <PrivateRouteSignUpSignIn isAuth={isAuth}>
                    <Signin />
                  </PrivateRouteSignUpSignIn>
                </Route>

                <Route exact path="/">
                  <All_products
                    selectedCategoryOrSubcategory={
                      selectedCategoryOrSubcategory
                    }
                  />
                </Route>
                <Route
                  path="/product_details/:id"
                  component={Product_details}
                />
                <Route path="/blogs" component={Blogs} />
                <Route path="/blog_inside/:id" component={Blog_inside} />
                <Route path="/user_info">
                  <PrivateRoute isAuth={isAuth}>
                    <UserInfo user={user} />
                  </PrivateRoute>
                </Route>
                <Route path="/add_product">
                  <PrivateRoute isAuth={isAuth}>
                    <Add_product />
                  </PrivateRoute>
                </Route>
                <Route path="/update_product/:id" component={Update_product}>
                  {/*<PrivateRoute isAuth={isAuth}>*/}
                  {/*  <Update_product />*/}
                  {/*</PrivateRoute>*/}
                </Route>
                <Route path="/contact" component={Contact} />
                <Route component={NotFound} />
              </Switch>
            </Layout>
          </div>
        </Router>
      </>
    </Context.Provider>
  );
};

export default App;
