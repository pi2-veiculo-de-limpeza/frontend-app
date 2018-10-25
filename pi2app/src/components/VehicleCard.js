import React from 'react';
import { 
  Text,
  TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';


function shortDate(date) {
    return ('' + date.getHours() + ':' + date.getMinutes());
}
  
function getColorForBattery(battery_state, battery_capacity) {

    var color = 'green'
    var ratio = battery_state/battery_capacity

    if ( ratio < 0.35 ){
        color = 'red'
    }else if ( ratio < 0.67) {
        color = 'orange'
    }else{
        color = 'green'
    }

    return color;
}

class VehicleCard extends React.Component {
    render() {
      return (
        <TouchableHighlight onPress={ () => { this.props.navigation.navigate("VehicleDetail") }}>
          <Card
            title={
              this.props.vehicle.name + ' - ' + 
              shortDate(this.props.vehicle.elapsed_time) }
            // image={require('../images/sand.jpg')}
            >
  
            <Text style={{color: 'gray'}}>
              Battery
              <Text style={{color: getColorForBattery(this.props.vehicle.battery_state, this.props.vehicle.battery_capacity)}}>
                {' ' +  this.props.vehicle.battery_state + '/' + this.props.vehicle.battery_capacity}
              </Text>
            </Text>
  
            <Text style={{color: 'gray'}}>
              Distance 
              <Text style={{color: 'black'}}> {this.props.vehicle.distance} </Text>
            </Text>
  
            <Text style={{color: 'gray'}}>
              Weight 
              <Text style={{color: 'black'}}> {this.props.vehicle.weight} </Text>
            </Text>
  
            <Text style={{color: 'gray'}}>
              Finishes mission at
              <Text style={{color: 'black'}}> { shortDate(this.props.vehicle.estimated_time)} </Text>
            </Text>
  
          </Card>
        </TouchableHighlight>
      );
    }
}

export default VehicleCard;