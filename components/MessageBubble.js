import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image} from 'react-native';


export default class MessageBubble extends React.Component {

    constructor(props) {
        super(props);
    }

    createIcon(props) {
        switch(props.type) {
            case "recommendation":
                return(<Image style={styles.recommedationImage}
                    source={require('../assets/images/WHITE_HAND_LOGO.png')}
                />);

            case "question":
                return(<Image style={styles.recommedationImage}
                    source={require('../assets/images/WHITE_HAND_LOGO.png')}
                />);
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
                return(styles.recommendationBubble);
            default:
                return(styles.bubble);
        }  
    }

    render() {
        return (
            <View style={this.setBalloonStyle(this.props)}>
                <View>
                    {this.createIcon(this.props)}
                </View>
                <View>
                    {this.createBalloon(this.props)}  
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    questionBubble: {
        backgroundColor: '#bbb',
        borderRadius: 10,
        marginRight: Dimensions.get('window').width / 9,
        marginLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 15,
        maxWidth: Dimensions.get('window').width,
        alignSelf: 'flex-start',
    },
    recommendationBubble: {
        backgroundColor: '#f004',
        borderRadius: 10,
        marginLeft: Dimensions.get('window').width / 9,
        marginRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 15,
        maxWidth: Dimensions.get('window').width
    },
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
    questionImage: {
        backgroundColor: '#f00',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 20,
        alignSelf: 'flex-end',
        width: 40,
        height: 40,
        flex: 1
    },
    recommedationImage: {
        backgroundColor: '#333',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 20
    },
    image: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 20,
        backgroundColor: '#000'
    },
    text: {
        paddingTop: 5,
        paddingBottom: 5,
        color: '#000',
        textAlign: 'auto'
    }
});