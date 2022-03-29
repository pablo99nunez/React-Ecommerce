import React, { Component } from "react";

import Category from "./components/Product/Category.jsx";
import style from "./Home.module.scss";

import { connect } from "react-redux";

class Home extends Component {
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
export default connect(mapStateToProps)(Home);
