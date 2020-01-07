import React, { Component } from "react";
// import axios from "axios";

class Rating extends Component {
  getClasses() {
    switch (this.props.rating) {
      case 1:
        return 'btn-rating push i far fa-heart love';
      case 2:
        return 'btn-rating i far fa-check-circle okay';
      case 3:
        return 'btn-rating i far fa-thumbs-down hate';
      case 4:
        return 'btn-rating i far fa-bookmark save';
      case 5:
        return 'btn-rating i far fa-times-circle ignore';
      default:
        return '';
    }
  }

  getId() {
    return `${this.props.item.name}-${this.props.rating}`;
  }

  onClick = e => {
    // axios.post('/api/ratings')
    let newClasses

    switch (this.props.rating) {
      case 1:
        newClasses = 'btn-rating push i fas fa-heart love';
        break;
      case 2:
        newClasses = 'btn-rating i fas fa-check-circle okay';
        break;
      case 3:
        newClasses = 'btn-rating i fas fa-thumbs-down hate';
        break;
      case 4:
        newClasses = 'btn-rating i fas fa-bookmark save';
        break;
      case 5:
        newClasses = 'btn-rating i fas fa-times-circle ignore';
        break;
      default:
        newClasses = '';
    }

    let node = document.getElementById(this.getId());
    node.className = newClasses;
    // Find how to use newClasses and add them to the div
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
