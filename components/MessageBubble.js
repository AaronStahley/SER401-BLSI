import React from 'react';
import { View, Text } from 'react-native';

export default class MessageBubble extends React.Component {

    /**
     * Used to break down any props to decide values to be applied to the message bubble. 
     * @param {*} props properties provided from the usage in parent classes.
     */
    setTypeBallon(props) {
        if(props.type){
            switch(props.type) {
                case "recommendation":
            }
        }
        if(props.func) {

        }
        
    }

    render() {
        return (
            <View
                name={this.props.name}
                size={26}
                style={{ marginBottom: -3 }}
                color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            >
             <Text style={styles.bubble}>{this.props.text}</Text>
             {this.setTypeBallon(this.props)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bubble: {
        borderRadius: 20
    }
});