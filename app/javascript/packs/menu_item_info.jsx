import React, { Component } from "react";

class MenuItemInfo extends Component {
  onClick = e => {
    console.log("clicked!");
  };

  render() {
    return (
      <div className="menu-item-name" onClick={this.onClick}>
        {this.props.item.name}
      </div>
    );
  }
}

export default MenuItemInfo;
