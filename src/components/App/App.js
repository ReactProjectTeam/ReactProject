import React, { Component } from 'react'
import './App.scss';
// import Users from "../Users";
import Header from "../Header";
import Footer from "../Footer";

import All_products from "../All_products";
import Product_details from "../Product_details";

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
            <Switch>
              <Route exact path="/" component={All_products}/>
              <Route path="/product_details" component={Product_details}/>
            </Switch>
            <Footer/>
            
          </div>
        </Router>
      </>
    )
  }
}

export default App
