import React from 'react';
import {ScrollView, StyleSheet, Text, View, Dimensions} from "react-native";
import HTML from 'react-native-render-html';


export default class RecommendationScreen extends React.Component {
    state = {
        width: Dimensions.get('window').width
    }

    onLayout = event => {
        this.setState({width: event.nativeEvent.layout.width});
    }
    
    static navigationOptions = ({navigation}) => ({
        //Fixes Error where PCH Icon shifts to the right.
        headerRight: (
            <View></View>
        )

    });

    render() {
        const {navigation}   = this.props;
        const recommendation = navigation.getParam('recommendation', null);
        return (
            <ScrollView style={styles.container}>
                <View onLayout={this.onLayout}>
                    <Text style={styles.titleText}>{recommendation.title}</Text>
                    <HTML containerStyle={styles.descriptionText} 
                          html={`<div ${textCSS(this.state.width)}>
                              ${recommendation.description}
                          </div>`}/>
                </View>
            </ScrollView>
        );
    }
}

const textCSS = function(width) {
    if (width > 1000) {
        return (`style='line-height: ${width * 0.02}'`)
    }
    else if (width > 750) {
        return (`style='line-height: ${width * 0.025}'`)
    }
    else {
        return(``)
    }
}

const styles = StyleSheet.create({
    container      : {
        flex           : 1,
        backgroundColor: '#fff'
    },
    titleText      : {
        textAlign   : 'center',
        marginTop   : 10,
        marginBottom: 10,
        fontSize    : 30,
    },
    descriptionText: {
        paddingHorizontal: 20,
        flex             : 1
    }
});


