import ReactDOM from 'react-dom'
import React, { Component } from "react";
import MenuItem from "./menu_item";

// TODO: use componentDidMount to fetch:
//  - The restaurant_id
//  - All ratings for this user and this restaurant
//  - The current user?
class MenuItems extends Component {
  render() {
    return (
      <div className="menu-items">
        {this.props.items.map(item => (
          <MenuItem key={item.id} item={item} restaurantId={this.props.restaurantId} />
        ))}
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const itemsNode = document.getElementById('items-data')
  const data = JSON.parse(itemsNode.getAttribute('data'))

  const restaurantNode = document.getElementById('restaurant-id')
  const restaurantId = JSON.parse(restaurantNode.getAttribute('data'))

  ReactDOM.render(
    <MenuItems items={data} restaurantId={restaurantId} />,
    document.getElementById('items')
  )
})
