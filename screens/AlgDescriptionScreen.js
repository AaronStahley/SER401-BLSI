import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class AlgDescriptionScreen extends React.Component {
    render() {
        const {navigation} = this.props;
        const algorithm    = navigation.getParam('algorithm', null);
        
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.titleText}>{algorithm.Name}</Text>
                    <HTMLView style={styles.descriptionText} value={algorithm.Description} />
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
        flex: 1
    }
});
