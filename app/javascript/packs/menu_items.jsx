import ReactDOM from 'react-dom'
import React, { Component } from "react";
import MenuItem from "./menu_item";

class MenuItems extends Component {
  render() {
    return (
      <div className="menu-items">
        {this.props.items.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('items-data')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(
    <MenuItems items={data} />,
    document.getElementById('items')
  )
})
