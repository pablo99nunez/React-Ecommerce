import React, { Component } from "react";
import { Switch, Route } from "react-router";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import Product from "./components/Product/Product";
import Home from "./Home";

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/cart" component={Cart}></Route>
          <Route
            exact
            path="/:id"
            render={(match) => <Product match={match.match} />}
          ></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </>
    );
  }
}
