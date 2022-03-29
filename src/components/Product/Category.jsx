import React, { Component } from "react";
import { connect } from "react-redux";
import CardProduct from "./CardProduct";
import style from "./Category.module.scss";

class Category extends Component {
  render({ name, products } = this.props) {
    return (
      <div className={`${style.category}`}>
        <h1 className={style.title}>
          {name[0].toUpperCase() + name.substr(1).toLowerCase()}
        </h1>
        <div className={style.products}>
          {products?.map((product) => (
            <CardProduct
              key={product.id}
              id={product.id}
              brand={product.brand}
              inStock={product.inStock}
              name={product.name}
              prices={product.prices}
              attributes={product.attributes}
              gallery={product.gallery}
            />
          ))}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    name: state.PLP.category,
  };
}
export default connect(mapStateToProps)(Category);
