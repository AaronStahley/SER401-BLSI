import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AlgDescription from '../components/AlgDescription'

export default class AlgDescriptionScreen extends React.Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <AlgDescription />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
