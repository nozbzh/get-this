import React, { Component } from "react";
import axios from "axios";

class Rating extends Component {
  baseClasses() {
    return `btn-rating i ${this.props.faClassName} ${this.props.ratingValue}`;
  }

  getClasses() {
    if (this.isCurrentRating()) {
      return `${this.baseClasses()} fas`;
    } else {
      return `${this.baseClasses()} far`;
    }
  }

  isCurrentRating(){
    const { currentRating, ratingValue } = this.props;
    return (currentRating === ratingValue);
  }

  // TODO: extract function grabbing authenticityToken to a util file
  rate = async () => {
    const { ratingValue, item, restaurantId } = this.props;
    const metas = document.getElementsByTagName('meta');
    let authenticityToken;

    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === 'csrf-token') {
        authenticityToken = metas[i].getAttribute('content');
        break;
      }
    }

    let response = await axios.post('/api/ratings/rate', {
      rating: {
        restaurant_id: restaurantId,
        item_id: item.id,
        rating: ratingValue
      },
      authenticity_token: authenticityToken
    });

    const success = response.status === 200;

    if (!success){
      console.log(response)
    }

    return success;
  }

  onClick = () => {
    if (this.isCurrentRating()) {
      return;
    }

    const success = this.rate();

    if (success){
      const { updateCurrentRating, ratingValue } = this.props;
      updateCurrentRating(ratingValue);
    } else {
      alert('Something BAD happened');
    }
  }

  render() {
    return (
      <div className={this.getClasses()} onClick={this.onClick}></div>
    );
  }
}

export default Rating;
