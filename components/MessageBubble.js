import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import {Svg, Rect, Circle} from 'react-native-svg'
import { Icon, Screen} from 'expo';

export default class MessageBubble extends React.Component {

    constructor(props) {
        super(props);
    }

    createIcon(props) {
        switch(props.type) {
            case "recommendation":
                return(<Icon.Ionicon style={[styles.recommedationIcon]}/>);

            case "question":
                return(<Icon.Ionicon style={[styles.questionIcon]}/>);
        }
    }
    /**
     * Used to break down any props to decide values to be applied to the message bubble. 
     * @param {*} props properties provided from the usage in parent classes.
     */
    createBalloon(props) {
        switch(props.type) {
            case "recommendation":
                return(<Text style={[styles.text]}>{props.text}</Text>);

            case "question":
                return(<Text style={[styles.text]}>{props.text}</Text>);
        }      
    }

    setBalloonStyle(props) {
        switch(props.type) {
            case "recommendation":
                return(styles.questionBubble);

            case "question":
                return(styles.responseBubble);
            default:
                return(styles.bubble);
        }  
    }

    render() {
        return (
            <View style={this.setBalloonStyle(this.props)}>
                {this.createIcon(this.props)}
                {this.createBalloon(this.props)}  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    questionBubble: [bubble, {
        backgroundColor: '#bbb',
        borderRadius: 10,
        marginRight: Dimensions.get('window').width / 9,
        marginLeft: 10
    }],
    responseBubble: [bubble, {
        backgroundColor: '#f004',
        borderRadius: 10,
        marginLeft: Dimensions.get('window').width / 9,
        marginRight: 10
    }],  
    bubble: {
        backgroundColor: '#333',
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 15,
        maxWidth: Dimensions.get('window').width,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10
    },
    container: {
        position: 'absolute',        
        zIndex: -1
    },
    questionImage: [image, {
        color: '#f00'
    }],
    recommedationImage: [image, {
        color: '#333'
    }],
    image: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 20,
        color: '#000'
    },
    text: {
        paddingTop: 5,
        paddingBottom: 5,
        color: '#000',
        textAlign: 'auto'
    }
});