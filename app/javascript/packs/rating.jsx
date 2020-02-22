import React, { Component } from "react";
import axios from "axios";

// TODO: make this a functional component
class Rating extends Component {
  getClasses(isFilled) {
    if (isFilled) {
      switch (this.props.ratingValue) {
        case 'love':
          return 'btn-rating push i fas fa-heart love';
        case 'okay':
          return 'btn-rating i fas fa-check-circle okay';
        case 'hate':
          return 'btn-rating i fas fa-thumbs-down hate';
        case 'save':
          return 'btn-rating i fas fa-bookmark save';
        case 'ignore':
          return 'btn-rating i fas fa-times-circle ignore';
        default:
          return '';
      }
    } else {
      switch (this.props.ratingValue) {
        case 'love':
          return 'btn-rating push i far fa-heart love';
        case 'okay':
          return 'btn-rating i far fa-check-circle okay';
        case 'hate':
          return 'btn-rating i far fa-thumbs-down hate';
        case 'save':
          return 'btn-rating i far fa-bookmark save';
        case 'ignore':
          return 'btn-rating i far fa-times-circle ignore';
        default:
          return '';
      }
    }
  }

  isCurrentRating(){
    const { currentRating, ratingValue } = this.props;
    return (currentRating === ratingValue);
  }

  getId() {
    const { item, ratingValue } = this.props;
    return `${item.name}-${ratingValue}`;
  }

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

    const { updateCurrentRating, ratingValue } = this.props;
    const success = this.rate();

    if (success){
      const node = document.getElementById(this.getId());
      node.className = this.getClasses(true);
      updateCurrentRating(ratingValue);
    } else {
      alert('Something BAD happened');
    }
  }

  render() {
    return (
      <div
        className={this.getClasses(this.isCurrentRating())}
        id={this.getId()}
        onClick={this.onClick}
      >

      </div>
    );
  }
}

export default Rating;
