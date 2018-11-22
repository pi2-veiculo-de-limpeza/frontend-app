import React from 'react';
import { 
    View,
    Text,
    TouchableOpacity } from 'react-native';
import styles from '../styles/GeneralStyles';


class DefaultButton extends React.Component {

    render() {
        align = this.props.align ? this.props.align : 'center'
        opacity = this.props.opacity ? this.props.opacity : 0.7
        padding = this.props.padding ? this.props.padding : 30
        ButtonPress = this.props.onPress ? this.props.onPress : () => console.log("Hello from Button")
        text = this.props.text ? this.props.text : "Button"

        return (
        <View style={{ flex: 1, alignItems: align, paddingVertical: padding }}>
            <TouchableOpacity
            style={styles.registerVehicleButton}
            activeOpacity={opacity}
            onPress={ButtonPress}
            >
            <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

export default DefaultButton;