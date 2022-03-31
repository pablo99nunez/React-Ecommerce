import React, { Component } from "react";
import style from "./CardProduct.module.scss";
import shop from "../../shop.svg";
import { addToCart } from "../../features/CartSlice";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CardProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
    };
  }

  render({ name, prices, gallery, inStock, brand, attributes } = this.props) {
    return (
      <div
        className={`${style.card} `}
        onMouseEnter={() => {
          this.setState({
            isHovering: true,
          });
        }}
        onMouseLeave={() => {
          this.setState({
            isHovering: false,
          });
        }}
      >
        <Link
          to={"/" + this.props.id}
          className={`${!inStock && style.offStock}`}
        ></Link>
        <Link to={"/" + this.props.id} className={style.image}>
          <img src={gallery[0]} alt="" />
        </Link>
        {this.state.isHovering && inStock && (
          <div
            className={style.hover}
            onClick={() => {
              this.props.addToCart({
                product: {
                  name,
                  prices,
                  brand,
                  gallery,
                  attributes,
                  id: this.props.id,
                },
              });
            }}
          >
            <img src={shop} title="Add to cart" alt="Add to cart" />
          </div>
        )}
        <Link to={"/" + this.props.id} className={style.info}>
          <h5>{brand}</h5>
          <h4>{name}</h4>
          {prices
            .filter((price) => {
              return price.currency.symbol === this.props.currency.symbol;
            })
            .map((price, i) => (
              <h3
                key={`${name}-price-${i}`}
              >{`${this.props.currency.symbol} ${price.amount}`}</h3>
            ))}
        </Link>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    currency: state.Currency.currency,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardProduct);
