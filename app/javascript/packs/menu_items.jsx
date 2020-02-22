import ReactDOM from 'react-dom'
import React, { Component } from "react";
import MenuItem from "./menu_item";
import axios from 'axios';

class MenuItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      ratings: {}
    };
  }

  fetchItems = () => {
    axios.get(`/api/items/get_items_by_restaurant?restaurant_id=${this.props.restaurantId}`)
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchRatings = () => {
    axios.get(`/api/ratings/get_restaurant_ratings_by_user?restaurant_id=${this.props.restaurantId}`)
      .then((response) => {
        this.setState({ ratings: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchRatings();
    this.fetchItems();
  }

  render() {
    return (
      <div className="menu-items">
        {this.state.items.map(item => (
          <MenuItem
            key={item.id}
            item={item}
            restaurantId={this.props.restaurantId}
            currentRating={this.state.ratings[item.id]}
          />
        ))}
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const restaurantNode = document.getElementById('restaurant-id')
  const restaurantId = JSON.parse(restaurantNode.getAttribute('data'))

  ReactDOM.render(
    <MenuItems restaurantId={restaurantId} />,
    document.getElementById('items')
  )
})
