import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import BarChart2 from './BarChart2'
import VehicleData from './VehicleData'

class App extends Component {
  
  state = {
    data: VehicleData.items,
    width: 700,
    height: 500,
    //id: root
  }

  componentDidMount() {
    console.log("Dados do veiculo: "+ VehicleData.props)
  }

  render() {
    return (
      <div className="App">
        <BarChart2 
              data={this.state.data} 
              width={this.state.width} 
              height={this.state.height} />
        <VehicleData/>
      </div>
    );
  }
}

export default App; 

