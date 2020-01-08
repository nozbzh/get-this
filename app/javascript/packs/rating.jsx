import React, { Component } from "react";
import axios from "axios";

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
    const { currentRating, ratingValue } = this.props
    console.log(`${this.props.item.name}. currentRating: ${currentRating}. ratingValue: ${ratingValue}`)
    // console.log(this.props)
    return (currentRating === ratingValue);
  }

  getId() {
    return `${this.props.item.name}-${this.props.ratingValue}`;
  }

  rate = async () => {
    const { ratingValue } = this.props;
    const metas = document.getElementsByTagName('meta');
    let authenticityToken

    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === 'csrf-token') {
        authenticityToken = metas[i].getAttribute('content');
      }
    }

    let response = await axios.post('/api/ratings/rate', {
      rating: {
        restaurant_id: this.props.restaurantId,
        item_id: this.props.item.id,
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

  onClick = e => {
    if (this.isCurrentRating()) {
      return;
    }

    const success = this.rate();
    const newClasses = this.getClasses(true);

    if (success){
      let node = document.getElementById(this.getId());
      node.className = newClasses;
      this.props.rerenderParentCallback(this.props.ratingValue);
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
