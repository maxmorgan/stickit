import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Art from './Art.js';

var artCheck = localStorage.getItem('stickitArt');
var art = null;
if ( artCheck ) {
  art = JSON.parse(artCheck);
}
console.log(10);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="art-list">
          <Art art={art}></Art>
        </div>
      </div>
    );
  }
}

export default App;
