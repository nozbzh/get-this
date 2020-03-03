import React, { Component } from "react";
import Rating from "./rating";
import MenuItemInfo from "./menu_item_info";

class MenuItem extends Component {
  state = { currentRating: this.props.currentRating };

  updateCurrentRating = currentRating => {
    this.setState({ currentRating });
  };

  render() {
    const { item, restaurantId } = this.props;

    return (
      <div className="menu-item">
        <MenuItemInfo item={item} />

        <Rating
          ratingValue={"love"}
          faClassName={"fa-heart"}
          item={item}
          restaurantId={restaurantId}
          currentRating={this.state.currentRating}
          updateCurrentRating={this.updateCurrentRating}
        />

        <Rating
          ratingValue={"hate"}
          faClassName={"fa-thumbs-down"}
          item={item}
          restaurantId={restaurantId}
          currentRating={this.state.currentRating}
          updateCurrentRating={this.updateCurrentRating}
        />

        <Rating
          ratingValue={"okay"}
          faClassName={"fa-check-circle"}
          item={item}
          restaurantId={restaurantId}
          currentRating={this.state.currentRating}
          updateCurrentRating={this.updateCurrentRating}
        />

        <Rating
          ratingValue={"save"}
          faClassName={"fa-bookmark"}
          item={item}
          restaurantId={restaurantId}
          currentRating={this.state.currentRating}
          updateCurrentRating={this.updateCurrentRating}
        />

        <Rating
          ratingValue={"ignore"}
          faClassName={"fa-times-circle"}
          item={item}
          restaurantId={restaurantId}
          currentRating={this.state.currentRating}
          updateCurrentRating={this.updateCurrentRating}
        />
      </div>
    );
  }
}

export default MenuItem;
