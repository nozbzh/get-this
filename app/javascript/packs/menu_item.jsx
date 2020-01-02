import React, { Component } from "react";

class MenuItem extends Component {
  render() {
    return(
      <div className='menu-item'>
        <div className='menu-item-name'>{this.props.item.name}</div>
        <div className='rating push i far fa-thumbs-up'></div>
        <div className='rating i far fa-thumbs-down'></div>
        <div className='rating i fas fa-times'></div>
        <div className='rating i far fa-question-circle'></div>
      </div>
    );
  }
}

export default MenuItem;
