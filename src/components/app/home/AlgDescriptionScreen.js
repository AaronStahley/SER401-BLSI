import React from 'react';
import HTMLView from 'react-native-htmlview';
import {ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import RefreshButton from "../../ui/RefreshButton.js"

export default class AlgDescriptionScreen extends React.Component {
    
    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;

        //Fixes Error where PCH Icon shifts to the right.
        return {headerRight: <RefreshButton algorithmId={params.algorithm.id}/>}
    };

    buildHtml(algorithm) {
        let html = `<div>${algorithm.description}</div>`

        let img = "";
        return html;
    }

    render() {
        const {navigation} = this.props;
        const algorithm    = navigation.getParam('algorithm', null);

        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.titleText}>{algorithm.name}</Text>
                    <HTMLView style={styles.descriptionText} 
                        value={this.buildHtml(algorithm)}/>
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
