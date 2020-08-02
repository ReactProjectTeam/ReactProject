import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Header from "../../layout/Header";
// import Footer from "../../layout/Footer";
import Layout from "../../layout";
import Signup from "../Signup/Signup";
import Signin from "../Signin/Signin";
import All_products from "../All_products";
import Product_details from "../Product_details";
import Blogs from '../Blogs';
import Blog_inside from '../Blog_inside';
import Add_product from '../Add_product';
import Contact from '../Contact';
import NotFound from '../NotFound';





class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // loading: true
    }
  }
  componentDidMount = async()=> {
    // window.addEventListener('scroll', this.handleScroll);
    
  }

 
  handleScroll = () =>{
    var content = document.getElementById("content1")
    var menu = document.getElementById("menu");

    if (window.pageYOffset >= 154) {
        menu.classList.add("sticky");
        
        content.classList.add("menu-padding")
    } else {
        menu.classList.remove("sticky");
        content.classList.remove("menu-padding")
    }
    
  }


  render() {
    return (
      <>
        <Router>
          <div>

            <div id="content1">
              <Layout>
              <Switch>
                <Route path="/signup" component={Signup}/>
                <Route path="/signin" component={Signin}/>
                <Route exact path="/" component={All_products}/>
                <Route path="/product_details/:id" component={Product_details}/>
                <Route path="/blogs" component={Blogs}/>
                <Route path="/blog_inside/:id" component={Blog_inside}/>
                <Route path="/add_product" component={Add_product}/>
                <Route path="/contact" component={Contact}/>
                <Route component={NotFound}>
              </Route>
              </Switch>
              </Layout>
            </div>

            
          </div>
        </Router>
      </>
    )
  }
}

export default App
