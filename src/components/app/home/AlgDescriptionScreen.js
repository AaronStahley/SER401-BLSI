import React from 'react';
import {ScrollView, StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import RefreshButton from "../../ui/RefreshButton.js"
import email from 'react-native-email'
import HTML from 'react-native-render-html';

export default class AlgDescriptionScreen extends React.Component {
    
    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;

        //Fixes Error where PCH Icon shifts to the right.
        return {headerRight: <RefreshButton algorithmId={params.algorithm.id}/>}
    };

    render() {
        const {navigation} = this.props;
        const algorithm    = navigation.getParam('algorithm', null);

        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.titleText}>{algorithm.name}</Text>
                    <HTML containerStyle={styles.descriptionText} html={`<div ${textCSS()}>${algorithm.description}</div>`}/>
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
