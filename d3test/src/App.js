import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import BarChart2 from './BarChart2'

class App extends Component {
  
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 700,
    height: 500,
    //id: root
  }

  render() {
    return (
      <div className="App">
        <BarChart2 
              data={this.state.data} 
              width={this.state.width} 
              height={this.state.height} />
      </div>
    );
  }
}

export default App; 

