// From https://alligator.io/react/react-autocomplete/
//
import React, { Component, Fragment } from "react";
import axios from 'axios'

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // The full set of suggestions
      suggestions: [],
      // Flag when suggestions haven't loaded yet
      isFetching: true,
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  fetchRestaurants = () => {
    axios.get('/api/restaurants')
      .then((response) => {
        this.setState({ suggestions: response.data, isFetching: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.state;
    const userInput = e.currentTarget.value;
    const submitNode = document.getElementById('search-submit')

    if (userInput === '') {
      submitNode.disabled = true
      submitNode.style.cursor = 'not-allowed'
    } else {
      submitNode.disabled = false
      submitNode.style.cursor = ''
    }

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });

    const form = document.getElementById('restaurant-form')
    const idField = document.getElementById('restaurant-id')
    idField.value = e.currentTarget.dataset.id
    form.submit()
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions, then submit the form
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion].name
      });

      const form = document.getElementById('restaurant-form')
      const idField = document.getElementById('restaurant-id')
      idField.value = filteredSuggestions[activeSuggestion].id
      form.submit()
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        isFetching,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (isFetching) {
        // TODO: there is bug here because filteredSuggestions do not get updated once data has been
        // fetched, which takes it directly to `No suggestions, you're on your own!`
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>Fetching data...</em>
          </div>
        );
      } else {
        if (filteredSuggestions.length) {
          suggestionsListComponent = (
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                let className;

                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }

                return (
                  <li
                    className={className}
                    key={suggestion.id}
                    data-id={suggestion.id}
                    onClick={onClick}
                  >
                    {suggestion.name}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          suggestionsListComponent = (
            <div className="no-suggestions">
              <em>No suggestions, you're on your own!</em>
            </div>
          );
        }
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          name="restaurant_name"
          placeholder="Find a Restaurant..."
          className="search"
          autoComplete="off"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }

  componentDidMount() {
    this.fetchRestaurants();
  }
}

export default Autocomplete;
