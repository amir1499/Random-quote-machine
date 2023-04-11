import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const quotes = [
  {
    quote: "Life is too short to be serious all the time.",
    author: "Unknown"
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  // Add more quotes here...
];

// Action
const generateRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return {
    type: "GENERATE_RANDOM_QUOTE",
    quote: quotes[randomIndex].quote,
    author: quotes[randomIndex].author
  };
};

// Reducer
const quoteReducer = (state = {}, action) => {
  switch (action.type) {
    case "GENERATE_RANDOM_QUOTE":
      return {
        quote: action.quote,
        author: action.author
      };
    default:
      return state;
  }
};

// Store
const store = createStore(quoteReducer);

// React component
class QuoteMachine extends React.Component {
  render() {
    return (
      <div className="quote-machine">
        <p id="text">{this.props.quote}</p>
        <p id="author">{this.props.author}</p>
        <button id="new-quote" onClick={this.props.generateRandomQuote}>
          New quote
        </button>
      </div>
    );
  }
}

// Map state to props
const mapStateToProps = state => {
  return {
    quote: state.quote,
    author: state.author
  };
};

// Map dispatch to props
const mapDispatchToProps = dispatch => {
  return {
    generateRandomQuote: () => dispatch(generateRandomQuote())
  };
};

// Connect React component to Redux store
const ConnectedQuoteMachine = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteMachine);

// Render React component
ReactDOM.render(
  <Provider store={store}>
    <ConnectedQuoteMachine />
  </Provider>,
  document.getElementById("root")
);
