import React from 'react';
import {ScrollView, StyleSheet, Text, View, Dimensions} from "react-native";
import HTML from 'react-native-render-html';


export default class RecommendationScreen extends React.Component {
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
                <View>
                    <Text style={styles.titleText}>{recommendation.title}</Text>
                    <HTML containerStyle={styles.descriptionText} html={`<div ${textCSS()}>${recommendation.description}</div>`}/>
                </View>
            </ScrollView>
        );
    }
}

const textCSS = function() {
    if (Dimensions.get('window').width > 1000) {
        return (`style='line-height: 20'`)
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


