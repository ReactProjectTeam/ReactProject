import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
// import Header from "../../layout/Header";
// import Footer from "../../layout/Footer";
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
import UserInfo from "../UserInfo";

const App = () => {
  const [cookies] = useCookies(["token"]);
  const isAuth =
    cookies.token === "undefined" || cookies.token === undefined ? false : true;

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

  return (
    <>
      <Router>
        <div>
          <div id="content1">
            <Layout>
              <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <Route exact path="/">
                  <All_products />
                </Route>
                <Route
                  path="/product_details/:id"
                  component={Product_details}
                />
                <Route path="/blogs" component={Blogs} />
                <Route path="/blog_inside/:id" component={Blog_inside} />
                <Route path="/user_info">
                  <PrivateRoute isAuth={isAuth}>
                    <UserInfo />
                  </PrivateRoute>
                </Route>
                <Route path="/add_product">
                  <PrivateRoute isAuth={isAuth}>
                    <Add_product />
                  </PrivateRoute>
                </Route>
                <Route path="/contact" component={Contact} />
                <Route component={NotFound}></Route>
              </Switch>
            </Layout>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
