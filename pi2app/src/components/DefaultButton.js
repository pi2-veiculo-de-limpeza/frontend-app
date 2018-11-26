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
        ButtonStyle = this.props.type ? this.props.type : "green"

        if(ButtonStyle == "green"){
            ButtonStyle = styles.greenButton;
        }else if(ButtonStyle == "red") {
            ButtonStyle = styles.redButton;
        }else if(ButtonStyle == "gray"){
            ButtonStyle = styles.grayButton;
        }else{
            ButtonStyle = styles.grayButton;
        }

        return (
        <View style={{ flex: 1, alignItems: align, paddingVertical: padding }}>
            <TouchableOpacity
            style={ButtonStyle}
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