import React, { Component } from "react";

import Category from "./components/Product/Category.jsx";
import style from "./Home.module.scss";

import { connect } from "react-redux";
import { fetchProducts } from "./features/PLP/PLPSlice.js";

class Home extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.setProducts("all");
  }
  render() {
    return (
      <div className={`${style.home}`}>
        {this.props.loading ? (
          <div>Loading...</div>
        ) : (
          <Category products={this.props.products} />
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    products: state.PLP.products,
    loading: state.PLP.loading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setProducts: (category) => dispatch(fetchProducts(category)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
