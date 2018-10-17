import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { ScrollView, StyleSheet } from 'react-native';

export default class HistoryScreen extends React.Component {
    static navigationOptions = {
        title: 'History',
        headerStyle: {
            backgroundColor: '#ee3e41',
        },headerTintColor: '#fff',

    };

    render() {
        return (
            <ScrollView style={styles.container}>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});