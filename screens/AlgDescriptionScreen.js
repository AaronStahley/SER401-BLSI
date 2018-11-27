import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AlgorithmData from '../components/AlgorithmData'
import {getName, getDescription} from '../components/AlgorithmData'

export default class AlgDescriptionScreen extends React.Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.titleText}>{getName(0)}</Text>
                    <Text style={styles.descriptionText}>{getDescription(0)}</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
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
