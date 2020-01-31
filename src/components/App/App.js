import React, { Component } from 'react'
import './App.scss';
// import Users from "../Users";
import Header from "../Header";
import Footer from "../Footer";

import All_products from "../All_products";
import Product_details from "../Product_details";
import Blogs from '../Blogs';
import Blog_inside from '../Blog_inside';

// import { globalState } from "../../common/globalState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// import './variables.scss';


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
    var origTopCoordinateMenu = menu.offsetTop;

   
    if (window.pageYOffset >= 154) {
        menu.classList.add("sticky");
        // console.log(content);
        
        content.classList.add("menu-padding")
    } else {
        menu.classList.remove("sticky");
        content.classList.remove("menu-padding")
    }
    
  }
  // async componentDidMount() {

  //   let response = await fetch("https://jsonplaceholder.typicode.com/users");
  //   let resData = await response.json();

  //   globalState.set(resData);
  //   setTimeout(() => {
  //     this.setState({
  //       loading: false
  //     });
  //   }, 2000);
  //   this.setState({
  //     loading: false
  //   });
  // }

  render() {
    return (
      <>
        {/* {this.state.loading ? 'Loading...' : <Users />} */}
        <Router>
          <div>
           
            <Header/>
            <div id="content1">
              <Switch>
                <Route exact path="/" component={All_products}/>
                <Route path="/product_details" component={Product_details}/>
                <Route path="/blogs" component={Blogs}/>
                <Route path="/blog_inside" component={Blog_inside}/>

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
