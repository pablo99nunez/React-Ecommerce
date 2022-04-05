import React, { Component } from "react";
import { fetchProducts } from "../../features/PLP/PLPSlice";
import { connect } from "react-redux";
import logo from "../../logo.svg";
import style from "./Navbar.module.scss";
import { client } from "../..";
import { GET_CATEGORIES } from "../../queries/category";
import { Link } from "react-router-dom";
import CartOverlay from "../Cart/CartOverlay";
import Currency from "./Currency";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "ALL",
      categories: [],
    };
  }

  componentDidMount = async () => {
    client.query({ query: GET_CATEGORIES }).then((res) => {
      this.setState({ categories: res.data.categories.map((e) => e.name) });
    });
  };

  handleClick = (e) => {
    this.setState({ active: e.target.innerText });
    this.props.setProducts(e.target.innerText.toLowerCase());
  };
  render() {
    return (
      <nav className={style.nav}>
        <div>
          {this.state.categories.map((category) => (
            <Link
              to="/"
              className={`${style.category} ${
                this.state.active === category.toUpperCase() && style.active
              } `}
              key={"category" + category}
            >
              <h2 onClick={this.handleClick}>{category.toUpperCase()}</h2>
            </Link>
          ))}
        </div>
        <img src={logo} alt="logo"></img>

        <div>
          <Currency></Currency>
          <CartOverlay></CartOverlay>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    cart: state.Cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setProducts: (category) => dispatch(fetchProducts(category)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
