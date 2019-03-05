import React from 'react';
import HTMLView from "react-native-htmlview";
import {ScrollView, StyleSheet, Text, View} from "react-native";


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
                    <Text style={styles.titleText}>{recommendation.Title}</Text>
                    <HTMLView style={styles.descriptionText} value={recommendation.Description}/>
                </View>
            </ScrollView>
        );
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


