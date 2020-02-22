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
          item={item}
          restaurantId={restaurantId}
          currentRating={this.state.currentRating}
          updateCurrentRating={this.updateCurrentRating}
        />

        <Rating
          ratingValue={"hate"}
          item={item}
          restaurantId={restaurantId}
          currentRating={this.state.currentRating}
          updateCurrentRating={this.updateCurrentRating}
        />

        <Rating
          ratingValue={"okay"}
          item={item}
          restaurantId={restaurantId}
          currentRating={this.state.currentRating}
          updateCurrentRating={this.updateCurrentRating}
        />

        <Rating
          ratingValue={"save"}
          item={item}
          restaurantId={restaurantId}
          currentRating={this.state.currentRating}
          updateCurrentRating={this.updateCurrentRating}
        />

        <Rating
          ratingValue={"ignore"}
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
