import React from 'react'
import ReactDOM from 'react-dom'

import Autocomplete from "./restaurant_autocomplete";

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('restaurants-data')
  const data = JSON.parse(node.getAttribute('data'))

  const submitNode = document.getElementById('search-submit')
  submitNode.disabled = true
  submitNode.style.cursor = 'not-allowed'

  ReactDOM.render(
    <Autocomplete suggestions={data} />,
    document.getElementById('search-input-field')
  )
})
