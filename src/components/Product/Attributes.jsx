import React, { Component } from "react";
import style from "./Attributes.module.scss";

export default class Attributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected:
        this.props.selected ||
        Array.from(Array(this.props.attributes.length).keys()).map(() => 0),
    };
    this.onSelect = (attributeIndex, valueIndex) => {
      const { selected } = this.state;
      selected[attributeIndex] = valueIndex;
      this.setState({ selected });
      this.props.onSelect(attributeIndex, valueIndex);
    };
  }

  render() {
    return (
      <div className={style.attributes}>
        {this.props.attributes?.map((attribute, index) => {
          return (
            <div
              className={style.attribute}
              key={"att" + index}
              style={{ fontSize: this.props.fontSize || "1rem" }}
            >
              {this.props.withTitle && <h3>{attribute.name}</h3>}
              <div className={style.items}>
                {attribute.type === "swatch"
                  ? attribute.items?.map((item, i) => {
                      return (
                        <div
                          className={`${style.item} ${
                            this.state.selected[index] === i
                              ? style.selectedColor
                              : ""
                          }`}
                          style={{ backgroundColor: item.value }}
                          onClick={(e) => this.onSelect(index, i, e.target)}
                          key={attribute.type + item.value}
                        ></div>
                      );
                    })
                  : attribute.items?.map((item, i) => {
                      return (
                        <div
                          className={`${style.item} ${
                            this.state.selected[index] === i
                              ? style.selected
                              : ""
                          }`}
                          key={attribute.type + item.value}
                          onClick={(e) => this.onSelect(index, i, e.target)}
                        >
                          <p>{item.value}</p>
                        </div>
                      );
                    })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
