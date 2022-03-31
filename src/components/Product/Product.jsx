import React, { Component } from "react";
import style from "./Product.module.scss";
import { addToCart } from "../../features/CartSlice";
import { connect } from "react-redux";
import Attributes from "./Attributes";
import { getProduct } from "../../features/PLP/PLPSlice";
import { sanitize } from "dompurify";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.props.getProduct(this.props.match.params.id);
  };
  componentDidUpdate() {
    if (
      this.props.loading === false &&
      this.props.product.name &&
      this.state.loading
    ) {
      this.setState({
        picture: this.props.product.gallery[0],
        loading: false,
        attributes: this.props.product.attributes.map((attribute) => ({
          active: attribute.items[0].value,
          name: attribute.name,
        })),
      });
    }
  }

  render() {
    return this.state.loading ? (
      <div>loading</div>
    ) : (
      <div className={style.product}>
        <div className={style.carrousel}>
          {this.props.product.gallery.map((image, index) => (
            <img
              onClick={() => this.setState({ ...this.state, picture: image })}
              className={`${this.state.picture === image ? style.active : ""}`}
              src={image}
              alt=""
              key={"image" + index}
            />
          ))}
        </div>
        <div
          className={`${style.mainPicture} ${
            !this.props.product.inStock && style.offStock
          }`}
        >
          <img src={this.state.picture} alt="" />
        </div>
        <div className={style.info}>
          <div>
            <h1>{this.props.product.brand}</h1>
            <h1 className={style.name}>{this.props.product.name}</h1>
          </div>

          <Attributes
            attributes={this.props.product.attributes}
            onSelect={(attributeIndex, valueIndex) =>
              this.setState({
                ...this.state,
                attributes: this.props.product.attributes.map(
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
              {this.props.product.prices
                .filter((price) => {
                  return price.currency.symbol === this.props.currency.symbol;
                })
                .map(
                  (price) => `${this.props.currency.symbol} ${price.amount}`
                )}
            </h2>
          </div>
          <button
            className={`${
              !this.props.product.inStock ? style.disable : style.button
            }`}
            disabled={!this.props.product.inStock}
            title={!this.props.product.inStock ? "Out of stock" : ""}
            onClick={() => {
              this.props.addToCart({
                product: this.props.product,
                attributes: this.state.attributes,
              });
            }}
          >
            Add to cart
          </button>
          <div
            className={style.description}
            dangerouslySetInnerHTML={{
              __html: sanitize(this.props.product.description),
            }}
          ></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currency: state.Currency.currency,
    product: state.PLP.product,
    loading: state.PLP.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
    getProduct: (id) => dispatch(getProduct(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
