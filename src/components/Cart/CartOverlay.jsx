import React, { Component } from "react";
import { connect } from "react-redux";
import style from "./CartOverlay.module.scss";
import shop from "../../shop.svg";
import plus from "./assets/plus.svg";
import minus from "./assets/minus.svg";
import { Link } from "react-router-dom";
import {
  addToCart,
  changeAttributes,
  removeFromCart,
} from "../../features/CartSlice";
import Attributes from "../Product/Attributes";
import getTotal from "../../utils/getTotal";

export class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      total: 0,
    };
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      total: getTotal(this.props.cart, this.props.currency),
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        ...this.state,
        total: getTotal(this.props.cart, this.props.currency),
      });
    }
    if (prevProps.currency !== this.props.currency) {
      this.setState({
        ...this.state,
        total: getTotal(this.props.cart, this.props.currency),
      });
    }
  }

  render() {
    return (
      <div className={style.cartOverlay}>
        <img
          onClick={() => {
            this.setState({ isOpen: !this.state.isOpen });
          }}
          src={shop}
          alt=""
        />
        {this.props.cart.length ? (
          <span className={style.number}>{this.props.cart.length}</span>
        ) : null}
        {this.state.isOpen && (
          <>
            <div className={style.miniCart}>
              <h1>
                <strong>My Bag</strong>, {this.props.cart.length} items
              </h1>
              <div className={style.miniCartItems}>
                {this.props.cart.map((product, i) => (
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
                              price.currency.symbol ===
                              this.props.currency.symbol
                            );
                          })
                          .map(
                            (price) =>
                              `${this.props.currency.symbol} ${price.amount}`
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
                ))}
              </div>
              <div className={style.total}>
                <h1>Total</h1>
                <h1>
                  {this.props.currency.symbol}
                  {this.state.total.toFixed(2)}
                </h1>
              </div>
              <div className={style.buttons}>
                <Link to="/cart">
                  <button
                    onClick={() => {
                      this.setState({
                        isOpen: false,
                      });
                    }}
                  >
                    View Bag
                  </button>
                </Link>
                <button className={style.primary}>Check out</button>
              </div>
            </div>
            <span
              className={style.background}
              onClick={() => {
                this.setState({ isOpen: false });
              }}
            ></span>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.Cart.cart,
  total: state.Cart.total,
  currency: state.Currency.currency,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(addToCart(product)),
  removeFromCart: (product) => dispatch(removeFromCart(product)),
  changeAttributes: (product) => dispatch(changeAttributes(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
