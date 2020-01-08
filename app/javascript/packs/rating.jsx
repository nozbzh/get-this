import React, { Component } from "react";
import axios from "axios";

class Rating extends Component {
  getClasses() {
    switch (this.props.rating) {
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

  getId() {
    return `${this.props.item.name}-${this.props.rating}`;
  }

  rate = async () => {
    const { rating } = this.props;
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
        rating: rating
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
    const { rating } = this.props;
    const success = this.rate();
    let newClasses;

    switch (rating) {
      case 'love':
        newClasses = 'btn-rating push i fas fa-heart love';
        break;
      case 'okay':
        newClasses = 'btn-rating i fas fa-check-circle okay';
        break;
      case 'hate':
        newClasses = 'btn-rating i fas fa-thumbs-down hate';
        break;
      case 'save':
        newClasses = 'btn-rating i fas fa-bookmark save';
        break;
      case 'ignore':
        newClasses = 'btn-rating i fas fa-times-circle ignore';
        break;
      default:
        newClasses = '';
    }

    if (success){
      let node = document.getElementById(this.getId());
      node.className = newClasses;
    } else {
      alert('Something BAD happened');
    }
  }

  render() {
    return (
      <div
        className={this.getClasses()}
        id={this.getId()}
        onClick={this.onClick}
      >

      </div>
    );
  }
}

export default Rating;
