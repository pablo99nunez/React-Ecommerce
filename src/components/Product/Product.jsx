import React, { Component } from "react";
import { client } from "../..";
import { GET_PRODUCT } from "../../queries/products";
import style from "./Product.module.scss";
import { addToCart } from "../../features/CartSlice";
import { connect } from "react-redux";
import Attributes from "./Attributes";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loading: true,
      picture: "",
      attributes: [
        {
          active: "",
          name: "",
        },
      ],
    };
  }
  componentDidMount = () => {
    client
      .query({
        query: GET_PRODUCT,
        variables: { id: this.props.match.params.id },
      })
      .then((res) => {
        this.setState({
          product: res.data.product,
          loading: false,
          picture: res.data.product.gallery[0],
          attributes: res.data.product.attributes.map((attribute) => {
            return {
              active: attribute.items[0].value,
              name: attribute.name,
            };
          }),
        });
      });
  };
  render() {
    return this.state.loading ? (
      <div>loading</div>
    ) : (
      <div className={style.product}>
        <div className={style.carrousel}>
          {this.state.product.gallery.map((image, index) => (
            <img
              onClick={() => this.setState({ ...this.state, picture: image })}
              className={`${this.state.picture === image ? style.active : ""}`}
              src={image}
              alt=""
              key={"image" + index}
            />
          ))}
        </div>
        <div className={style.mainPicture}>
          <img src={this.state.picture} alt="" />
        </div>
        <div className={style.info}>
          <div>
            <h1>{this.state.product.brand}</h1>
            <h1 style={{ fontWeight: 400 }}>{this.state.product.name}</h1>
          </div>

          <Attributes
            attributes={this.state.product.attributes}
            onSelect={(attributeIndex, valueIndex) =>
              this.setState({
                ...this.state,
                attributes: this.state.product.attributes.map(
                  (attribute, index) => {
                    if (index === attributeIndex) {
                      return {
                        name: attribute.name,
                        active: attribute.items[valueIndex].value,
                      };
                    } else return this.state.attributes[index];
                  }
                ),
              })
            }
            withTitle
          />

          <div>
            <h2>PRICE:</h2>
            <h2 className={style.price}>
              {this.state.product.prices
                .filter((price) => {
                  console.log(price);
                  return price.currency.symbol === this.props.currency.symbol;
                })
                .map((price) => (
                  <h3>{`${this.props.currency.symbol} ${price.amount}`}</h3>
                ))}
            </h2>
          </div>
          <button
            className={`${
              !this.state.product.inStock ? style.disable : style.button
            }`}
            disabled={!this.state.product.inStock}
            title={!this.state.product.inStock ? "Out of stock" : ""}
            onClick={() => {
              this.props.addToCart({
                product: this.state.product,
                attributes: this.state.attributes,
              });
            }}
          >
            Add to cart
          </button>
          <div
            dangerouslySetInnerHTML={{ __html: this.state.product.description }}
          ></div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);
