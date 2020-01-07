import React, { Component } from "react";
import Rating from "./rating";
import MenuItemInfo from "./menu_item_info";

class MenuItem extends Component {
  render() {
    return(
      <div className='menu-item'>
        <MenuItemInfo item={this.props.item} />
        <Rating rating={1} item={this.props.item} />
        <Rating rating={2} item={this.props.item} />
        <Rating rating={3} item={this.props.item} />
        <Rating rating={4} item={this.props.item} />
        <Rating rating={5} item={this.props.item} />
      </div>
    );
  }
}

export default MenuItem;
