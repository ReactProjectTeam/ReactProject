import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
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
import ForgotPassword from "../ForgotPassword";
import ConfirmPassword from "../ConfirmPassword";
import Update_product from "../Update_product";
import SnackbarCustom from "../../utils/Snackbar/Snackbar";
import Signup from "../Signup/Signup";
import Header from "../../layout/Header";
import {connect} from "react-redux";

const App = (props) => {
  const [cookies] = useCookies(["token"]);
  const isAuth = cookies.token === "undefined" || cookies.token === undefined ? false : true;

  return (
        <>
          {props.loggedOut && (
              <SnackbarCustom title="Çıxış etdiniz"/>
          )}
          {props.loggedIn && (
              <SnackbarCustom title="Sayta daxil oldunuz"/>
          )}
          <Router>
            <div id="content">
              <Route render={(props)=> <Header {...props}/>}/>
                <Switch>
                  <Route path="/confirmpassword" component={ConfirmPassword} />
                  <Route path="/forgotpassword" component={ForgotPassword} />
                  <Route path="/signup" component={Signup}>
                    <PrivateRouteSignUpSignIn isAuth={isAuth}>
                      <Signup/>
                    </PrivateRouteSignUpSignIn>
                  </Route>
                  <Route path="/signin" component={Signin}>
                    <PrivateRouteSignUpSignIn isAuth={isAuth}>
                      <Signin/>
                    </PrivateRouteSignUpSignIn>
                  </Route>
                  <Route exact path="/" component={All_products}/>
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
                  <Route path="/update_product/:id" component={Update_product}>
                  </Route>
                  <Route path="/contact" component={Contact} />
                  <Route component={NotFound} />
                </Switch>
            </div>
          </Router>
        </>
  );
};


const mapStateToProps=(state)=>{
  return {
    loggedOut: state.loggedOutReducer,
    loggedIn: state.loggedInReducer,
  }
}

export default connect(mapStateToProps)(App);

