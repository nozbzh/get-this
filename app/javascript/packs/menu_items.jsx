import ReactDOM from 'react-dom'
import React, { Component } from "react";
import MenuItem from "./menu_item";
import axios from 'axios';

class MenuItems extends Component {
  state = { items: [], ratings: {} };

  fetchItems = async () => {
    let uri = `/api/items/get_items_by_restaurant?restaurant_id=${this.props.restaurantId}`;
    let response = await axios.get(uri);

    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
      return [];
    }
  }

  fetchRatings = async () => {
    let uri = `/api/ratings/get_restaurant_ratings_by_user?restaurant_id=${this.props.restaurantId}`;
    let response = await axios.get(uri);

    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
      return {};
    }
  }

  fetchData = () => {
    Promise.all([this.fetchRatings(), this.fetchItems()]).then((values) => {
      this.setState({ ratings: values[0], items: values[1] });
    });
  }

  componentDidMount() {
    this.fetchData();
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
