import React, { Component } from "react";
import Rating from "./rating";
import MenuItemInfo from "./menu_item_info";

class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
      currentRating: ''
    };

    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.item !== prevState.item) {
      return { item: nextProps.item };
    } else if (nextProps.currentRating !== prevState.currentRating) {
      return { currentRating: nextProps.currentRating };
    }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.item !== this.props.item) {
      this.setState({ item: this.props.item });
    }
  }

  rerenderParentCallback(newRating) {
    this.setState({ currentRating: newRating, item: {id: 12345, name: 'a giant potato'}})
    this.forceUpdate();
  }

  render() {
    return(
      <div className='menu-item'>
        <MenuItemInfo item={this.state.item} />

        <Rating
          ratingValue={'love'}
          item={this.state.item}
          restaurantId={this.props.restaurantId}
          currentRating={this.state.currentRating}
          rerenderParentCallback={this.rerenderParentCallback}
        />

        <Rating
          ratingValue={'hate'}
          item={this.state.item}
          restaurantId={this.props.restaurantId}
          currentRating={this.state.currentRating}
          rerenderParentCallback={this.rerenderParentCallback}
        />

        <Rating
          ratingValue={'okay'}
          item={this.state.item}
          restaurantId={this.props.restaurantId}
          currentRating={this.state.currentRating}
          rerenderParentCallback={this.rerenderParentCallback}
        />

        <Rating
          ratingValue={'save'}
          item={this.state.item}
          restaurantId={this.props.restaurantId}
          currentRating={this.state.currentRating}
          rerenderParentCallback={this.rerenderParentCallback}
        />

        <Rating
          ratingValue={'ignore'}
          item={this.state.item}
          restaurantId={this.props.restaurantId}
          currentRating={this.state.currentRating}
          rerenderParentCallback={this.rerenderParentCallback}
        />
      </div>
    );
  }
}

export default MenuItem;
