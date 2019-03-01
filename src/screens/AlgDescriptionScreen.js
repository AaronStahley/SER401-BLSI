import React from 'react';
import HTMLView from 'react-native-htmlview';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import RefreshButton from "../components/ui/RefreshButton.js"

export default class AlgDescriptionScreen extends React.Component {
    algorithm = this.props.algorithm
    
    static navigationOptions = ({navigation}) => ({
        //Fixes Error where PCH Icon shifts to the right.
        headerRight: <RefreshButton algorithm={this.algorithm}></RefreshButton>
    });

    render() {
        const {navigation} = this.props;
        const algorithm    = navigation.getParam('algorithm', null);

        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.titleText}>{algorithm.Name}</Text>
                    <HTMLView style={styles.descriptionText} value={`<div>${algorithm.Description}</div>`}/>
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
