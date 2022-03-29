import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrencies, setCurrency } from "../../features/CurrencySlice";
import style from "./Currency.module.scss";
import arrow from "../../arrow.svg";

class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  componentDidMount() {
    this.props.getCurrencies();
  }
  render() {
    return (
      <div className={style.currency}>
        <div
          onClick={() =>
            this.setState({ ...this.state, isOpen: !this.state.isOpen })
          }
          className={style.currency__button}
        >
          <h1>{this.props.currency.symbol}</h1>
          <img
            style={{
              transform: `${
                this.state.isOpen ? "rotateZ(180deg)" : "rotateZ(0)"
              }`,
            }}
            src={arrow}
            alt="expand"
          />
        </div>
        {this.state.isOpen ? (
          <div className={style.options}>
            {this.props.currencies?.map((currency) => (
              <h2
                className={style.options__item}
                onClick={() => {
                  this.props.setCurrency(currency);
                  this.setState({ ...this.state, isOpen: false });
                }}
              >
                {`${currency.symbol} ${currency.label}`}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currency: state.Currency.currency,
    currencies: state.Currency.currencies,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setCurrency: (currency) => dispatch(setCurrency(currency)),
    getCurrencies: () => dispatch(getCurrencies()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Currency);
