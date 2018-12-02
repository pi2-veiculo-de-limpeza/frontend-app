import React, { Component } from 'react'
import './App.css'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import VehicleData from './VehicleData'
import { array, number, object, string } from 'prop-types';

class BarChart2 extends Component {

  componentDidMount() {
    this.drawChart();
  }
    
  drawChart() {
    const data = this.props;
    var w = 700;
    var h = 300;

    console.log("Dados no Barchart: " + data)
    
    const svg = select("#myChart")
    .append("svg")
    .attr("width", this.props.width)
    .attr("height", this.props.height)
    .style("margin-left", 100);
                  
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")

  }
        
  render(){
    return <div id={"#" + this.props.id}></div>
  }
}
    
export default BarChart2;