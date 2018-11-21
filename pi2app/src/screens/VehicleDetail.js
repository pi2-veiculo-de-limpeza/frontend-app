import React from 'react';
import { 
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Alert } 
from 'react-native';
import MapView, { MAP_TYPES, Polygon, ProviderPropType } from 'react-native-maps';
import CreateMissionMapStyle from '../styles/CreateMissionMapStyle';
import styles from '../styles/GeneralStyles';
import { INITIAL_BACKGROUND_IMG, MAP_HELP_MESSAGE } from '../constants/GeneralConstants';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0013; // Used to set initial map zoon
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class VehicleDetail extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      token: '',
      vehicle: {},
      isLoading: true,
      region: {
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      polygons: [],
      editing: null,
      creatingHole: false,
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        region: {
          ...this.state.region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        isLoading: false
      })
    },
    (error) => console.log("error: " + error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  // Call when user finishes to drawn the polygon
  finish() {
    const { polygons, editing } = this.state;
    this.setState({
      polygons: [...polygons, editing],
      editing: null,
      creatingHole: false,
    });
  }

  createHole() {
    const { editing, creatingHole } = this.state;
    if (!creatingHole) {
      this.setState({
        creatingHole: true,
        editing: {
          ...editing,
          holes: [
            ...editing.holes,
            [],
          ],
        },
      });
    } else {
      const holes = [...editing.holes];
      if (holes[holes.length - 1].length === 0) {
        holes.pop();
        this.setState({
          editing: {
            ...editing,
            holes,
          },
        });
      }
      this.setState({ creatingHole: false });
    }
  }

  deletePolygon(){
    this.setState({
      editing: null,
      creatingHole: false,
      polygons: [],
    });
  }

  onPress(e) {
    const { editing, creatingHole } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: [],
        },
      });
    } else if (!creatingHole) {
      this.setState({
        editing: {
          ...editing,
          coordinates: [
            ...editing.coordinates,
            e.nativeEvent.coordinate,
          ],
        },
      });
    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate,
      ];
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [
            ...editing.coordinates,
          ],
          holes,
        },
      });
    }
  }

  static navigationOptions = {
    header: null,
  };

  // General alert
  showAlert(title, body){
    Alert.alert(
      title,
      body,
      [
        {text: 'Ok', onPress: () => console.log('Ok pressed')},
      ],
      { cancelable: false }
    )
  }

  render() {
    const mapOptions = {
      scrollEnabled: true,
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = e => this.onPress(e);
    }

    // While getting user actual location, displays loadind
    if(this.state.isLoading == true){
      return (
        <ImageBackground style={styles.initialBackgroundImage} source={INITIAL_BACKGROUND_IMG}>
          <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator}/>
        </ImageBackground>
      )
    } else {
      return (
        <View style={CreateMissionMapStyle.container}>
          <MapView
            provider={this.props.provider}
            initialRegion={this.state.region}
            style={CreateMissionMapStyle.map}
            mapType={MAP_TYPES.HYBRID}
            onPress={e => this.onPress(e)}
            {...mapOptions}
          >
            {this.state.polygons.map(polygon => (
              <Polygon
                key={polygon.id}
                coordinates={polygon.coordinates}
                holes={polygon.holes}
                fillColor="rgba(255, 0, 0, 0.3)"
                strokeColor="#eeff00"
                strokeWidth={2}
              />
            ))}
            {this.state.editing && (
              <Polygon
                key={this.state.editing.id}
                coordinates={this.state.editing.coordinates}
                holes={this.state.editing.holes}
                fillColor="rgba(255, 0, 0, 0.3)"
                strokeColor="#eeff00"
                strokeWidth={2}
              />
            )}
          </MapView>
          <View style={CreateMissionMapStyle.buttonContainer}>
            {this.state.editing && !this.state.creatingHole && (
              <TouchableOpacity
                onPress={() => this.createHole()}
                style={[CreateMissionMapStyle.bubble, CreateMissionMapStyle.button]}
              >
                <Text>Delimitar área</Text>
              </TouchableOpacity>
            )}
            {this.state.editing && !this.state.creatingHole && (
              <TouchableOpacity
                onPress={() => this.showAlert('Ajuda', MAP_HELP_MESSAGE)}
                style={[CreateMissionMapStyle.bubble, CreateMissionMapStyle.button]}
              >
                <Text>Ajuda</Text>
              </TouchableOpacity>
            )}
            {this.state.creatingHole && (
              <TouchableOpacity
                onPress={() => this.finish()}
                style={[CreateMissionMapStyle.bubble, CreateMissionMapStyle.button]}
              >
                <Text>Finalizar</Text>
              </TouchableOpacity>
            )}
            {this.state.creatingHole && (
              <TouchableOpacity
                onPress={() => this.deletePolygon()}
                style={[CreateMissionMapStyle.bubble, CreateMissionMapStyle.button]}
              >
                <Text>Excluir</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }
  }
}

VehicleDetail.propTypes = {
  provider: ProviderPropType,
};

export default VehicleDetail;
