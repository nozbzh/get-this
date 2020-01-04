import React from 'react'
import ReactDOM from 'react-dom'

import Autocomplete from "./restaurant_autocomplete";

document.addEventListener('DOMContentLoaded', () => {
  const submitNode = document.getElementById('search-submit')
  submitNode.disabled = true
  submitNode.style.cursor = 'not-allowed'

  ReactDOM.render(
    <Autocomplete />,
    document.getElementById('search-input-field')
  )
})
