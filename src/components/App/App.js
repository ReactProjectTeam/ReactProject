import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../Header";
import Footer from "../Footer";
import All_products from "../All_products";
import Product_details from "../Product_details";
import Blogs from '../Blogs';
import Blog_inside from '../Blog_inside';
import Add_product from '../Add_product';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // loading: true
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
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
           
            <Header/>
            <div id="content1">
              <Switch>
                <Route exact path="/" component={All_products}/>
                <Route path="/product_details" component={Product_details}/>
                <Route path="/blogs" component={Blogs}/>
                <Route path="/blog_inside" component={Blog_inside}/>
                <Route path="/add_product" component={Add_product}/>
              </Switch>
            </div>
            <Footer/>
            
          </div>
        </Router>
      </>
    )
  }
}

export default App
