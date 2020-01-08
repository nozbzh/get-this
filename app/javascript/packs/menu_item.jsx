import React, { Component } from "react";
import Rating from "./rating";
import MenuItemInfo from "./menu_item_info";

// This component should be aware of a few things:
//  - The current selected rating, if any
//  - All of the current ratings (for the current user)
//  - The restaurant_id (so that Rating.rate() can send it to the server)
class MenuItem extends Component {
  render() {
    return(
      <div className='menu-item'>
        <MenuItemInfo item={this.props.item} />
        <Rating rating={'love'} item={this.props.item} restaurantId={this.props.restaurantId} />
        <Rating rating={'hate'} item={this.props.item} restaurantId={this.props.restaurantId} />
        <Rating rating={'okay'} item={this.props.item} restaurantId={this.props.restaurantId} />
        <Rating rating={'save'} item={this.props.item} restaurantId={this.props.restaurantId} />
        <Rating rating={'ignore'} item={this.props.item} restaurantId={this.props.restaurantId} />
      </div>
    );
  }
}

export default MenuItem;
