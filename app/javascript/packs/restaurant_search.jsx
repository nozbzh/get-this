import React from 'react'
import ReactDOM from 'react-dom'

import Autocomplete from "./restaurant_autocomplete";

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('restaurants_data')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(
    <Autocomplete suggestions={data} />,
    document.getElementById('search-input-field')
  )
})
