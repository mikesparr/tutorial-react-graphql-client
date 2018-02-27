import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Query, Subscription, Mutation} from './Messages';

class App extends Component {

  /**
   * Extended sample page to include subscription, mutation, query examples
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">GraphQL Client Example</h1>
        </header>
        <p className="App-intro"><strong>Notification (live subscription)</strong></p>
        <Subscription />

        <p className="App-intro">
          <strong>Add Message:</strong>
        </p>
        <Mutation />

        <p className="App-intro">
          <strong>Message List (refresh browser to reload):</strong>
        </p>
        <Query />
      </div>
    );
  }
}

export default App;
