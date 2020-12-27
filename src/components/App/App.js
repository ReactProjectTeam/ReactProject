import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../../layout";
import Signin from "../Signin/Signin";
import All_products from "../All_products";
import Product_details from "../Product_details";
import Blogs from "../Blogs";
import Blog_inside from "../Blog_inside";
import Add_product from "../Add_product";
import Contact from "../Contact";
import NotFound from "../NotFound";
import { useCookies } from "react-cookie";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PrivateRouteSignUpSignIn from "../PrivateRoute/PrivateRouteSignUpSignIn";
import UserInfo from "../UserInfo";
import Context from "../../Context/context";
import Confirm from "../Confirm";
import ForgotPassword from "../ForgotPassword";
import ConfirmPassword from "../ConfirmPassword";
import getUserByToken from "../../API/getUserByToken";
import Update_product from "../Update_product";
import SnackbarCustom from "../../utils/Snackbar/Snackbar";
import Signup from "../Signup/Signup";

const App = () => {
  const [cookies, setCookie] = useCookies(["token"]);

  const [
    selectedCategoryOrSubcategory,
    setSelectedCategoryOrSubcategory,
  ] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const isAuth = cookies.token === "undefined" || cookies.token === undefined ? false : true;
  const [user, setUser] = useState({});
  const [rendering, setRendering] = useState(null);
  const [confirmed, setConfirmed] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [product, setProduct] = useState([]);



  useEffect(() => {
    if (cookies.token !== undefined && cookies.token !== "undefined") {
        getUserByToken(cookies.token).then((responseUser) => {
          if (responseUser.status === 200) {
            setUser(responseUser.data.data);
          }
        });
      }

  }, [cookies.token]);


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

  const getConfirmed=(confirmedData)=>{
    setConfirmed(confirmedData)
  }

  const getLoggedOut=(loggedOutData)=>{
    setLoggedOut(loggedOutData)
    setLoggedIn(false)
  }

  const getLoggedIn=(loggedInData)=>{
    setLoggedIn(loggedInData)
    setLoggedOut(false)
  }

  const getProducts=(productData)=>{
    setProduct(productData)
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
          {confirmed && (
              <SnackbarCustom title="Qeydiyyatınız uğurla tamamlandı"/>
          )}
          {loggedOut && (
              <SnackbarCustom title="Çıxış etdiniz"/>
          )}
          {loggedIn && (
              <SnackbarCustom title="Sayta daxil oldunuz"/>
          )}
          <Router>
            <div id="content">
              <Layout rendering={rendering} getLoggedOut={getLoggedOut} >
                <Switch>
                  <Route path="/confirm" component={(props) => <Confirm {...props} getConfirmed={getConfirmed}/> } />
                  <Route path="/confirmpassword" component={ConfirmPassword} />
                  <Route path="/forgotpassword" component={ForgotPassword} />
                  <Route path="/signup" component={Signup}>
                    <PrivateRouteSignUpSignIn isAuth={isAuth}>
                      <Signup  />
                    </PrivateRouteSignUpSignIn>
                  </Route>
                  <Route path="/signin" component={Signin}>
                    <PrivateRouteSignUpSignIn isAuth={isAuth}>
                      <Signin getLoggedIn={getLoggedIn}/>
                    </PrivateRouteSignUpSignIn>
                  </Route>
                  <Route exact path="/">
                    <All_products
                        selectedCategoryOrSubcategory={selectedCategoryOrSubcategory}
                        getProducts={getProducts}
                    />
                  </Route>
                  <Route path="/categoryId/:categoryId" children={<All_products
                      selectedCategoryOrSubcategory={selectedCategoryOrSubcategory}
                      getProducts={getProducts}
                  />}/>
                  <Route path="/subCategoryId/:subCategoryId" children={<All_products
                      selectedCategoryOrSubcategory={selectedCategoryOrSubcategory}
                      getProducts={getProducts}
                  />}/>

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

