import React, { Component } from 'react'
import './App.css'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import VehicleData from './VehicleData'

class BarChart2 extends Component {
  componentDidMount() {
    this.drawChart();
  }
    
  drawChart() {
    const data = this.props.data;
    var w = 700;
    var h = 300;
    
    const svg = select("#myChart")
    .append("svg")
    .attr("width", this.props.width)
    .attr("height", this.props.height);
                  
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")

    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - (10 * d) - 3)

    // svg.selectAll("bar-label")
    // 	.data(data)
    // 	.enter()
    // 	.
  }
        
  render(){
    return <div id={"#" + this.props.id}></div>
  }
}
    
export default BarChart2;