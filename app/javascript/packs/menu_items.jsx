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

  fetchItems() {
    let that = this

    axios.get(`/api/items/get_items_by_restaurant?restaurant_id=${this.props.restaurantId}`)
      .then(function (response) {
        that.setState({ items: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fetchRatings() {
    let that = this

    axios.get(`/api/ratings/get_restaurant_ratings_by_user?restaurant_id=${this.props.restaurantId}`)
      .then(function (response) {
        that.setState({ ratings: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchItems();
    this.fetchRatings();
  }

  render() {
    return (
      <div className="menu-items">
        {this.state.items.map(item => (
          <MenuItem
            key={item.id}
            // data={{ item: item, currentRating: this.state.ratings[item.id]}}
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
