import React, { Component } from "react";
import style from "./Carrousel.module.scss";

export default class Carrousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      isHovering: false,
    };
  }

  render({ gallery } = this.props, { active, isHovering } = this.state) {
    return (
      <div
        className={style.carrousel}
        onMouseEnter={() => this.setState({ ...this.state, isHovering: true })}
        onMouseLeave={() => this.setState({ ...this.state, isHovering: false })}
      >
        {active > 0 && isHovering && (
          <span
            onClick={() => this.setState({ ...this.state, active: active - 1 })}
          >
            {"<"}
          </span>
        )}
        <img src={gallery[active]} alt="" />
        {active < gallery.length - 1 && isHovering && (
          <span
            onClick={() => this.setState({ ...this.state, active: active + 1 })}
          >
            {">"}
          </span>
        )}
      </div>
    );
  }
}
