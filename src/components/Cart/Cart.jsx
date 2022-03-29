import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addToCart,
  clearCart,
  removeFromCart,
  changeAttributes,
} from "../../features/CartSlice";
import { Link } from "react-router-dom";
import getTotal from "../../utils/getTotal";
import style from "./Cart.module.scss";
import plus from "./assets/plus.svg";
import minus from "./assets/minus.svg";
import Attributes from "../Product/Attributes";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }
  componentDidMount() {
    this.setState({
      total: getTotal(this.props.cart, this.props.currency),
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        total: getTotal(this.props.cart, this.props.currency),
      });
    }
    if (prevProps.currency !== this.props.currency) {
      this.setState({
        total: getTotal(this.props.cart, this.props.currency),
      });
    }
  }
  render() {
    return (
      <div className={style.cart}>
        <h1 className={style.title}>CART</h1>
        {this.props.cart.length > 0 ? (
          this.props.cart.map((product, i) => (
            <div key={product.product.id + i} className={style.product}>
              <div className={style.info}>
                <h1>{product.product.brand}</h1>
                <Link to={"/" + product.product.id}>
                  <h1>{product.product.name}</h1>
                </Link>
                <h1>
                  {product.product.prices
                    .filter((price) => {
                      return (
                        price.currency.symbol === this.props.currency.symbol
                      );
                    })
                    .map(
                      (price) => `${this.props.currency.symbol} ${price.amount}`
                    )}
                </h1>
                <Attributes
                  attributes={product.product.attributes}
                  onSelect={(attributeIndex, valueIndex) => {
                    this.props.changeAttributes({
                      id: product.product.id,
                      value:
                        product.product.attributes[attributeIndex].items[
                          valueIndex
                        ].value,
                      index: i,
                      attributes: product.attributes,
                    });
                  }}
                  selected={product.attributes.map((e, i) => {
                    return product.product.attributes[i].items.findIndex(
                      (item, i) => item.value === e.active
                    );
                  })}
                  withTitle
                ></Attributes>
              </div>
              <div className={style.action}>
                <div>
                  <img
                    src={plus}
                    onClick={() =>
                      this.props.addToCart({
                        product: product.product,
                        attributes: product.attributes,
                      })
                    }
                    alt="Plus"
                  ></img>
                  {product.quantity}
                  <img
                    src={minus}
                    onClick={() => {
                      this.props.removeFromCart({
                        id: product.product.id,
                        attributes: product.attributes,
                      });
                    }}
                    alt="Minus"
                  ></img>
                </div>
                <div>
                  <img src={product.product.gallery[0]} alt="" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={style.empty}>
            <h1>Your cart is empty</h1>
            <h1>
              <Link to="/">Go to the shop</Link>
            </h1>
          </div>
        )}
        {this.props.cart.length > 0 ? (
          <>
            <div className={style.total}>
              <h1>Total</h1>
              <h1>
                {this.props.currency.symbol}
                {this.state.total.toFixed(2)}
              </h1>
            </div>
            <button>CHECK OUT</button>
          </>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.Cart.cart,
    currency: state.Currency.currency,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
    clearCart: () => dispatch(clearCart()),
    removeFromCart: (product) => dispatch(removeFromCart(product)),
    changeAttributes: (product) => dispatch(changeAttributes(product)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
