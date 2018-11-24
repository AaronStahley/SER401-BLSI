import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

var algData = require('../data/algorithms.json');
var index = 0;

export default class AlgDescription extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <Text style={styles.titleText}>{algData[index].name}</Text>
                <Text style={styles.descriptionText}>{algData[index].description}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 30,
    },
    descriptionText: {
        paddingHorizontal: 20
    }
});