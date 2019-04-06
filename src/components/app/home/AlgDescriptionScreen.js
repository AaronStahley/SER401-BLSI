import React from 'react';
import {ScrollView, StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import RefreshButton from "../../ui/RefreshButton.js"
import HTML from 'react-native-render-html';

export default class AlgDescriptionScreen extends React.Component {
    
    state = {
        width: Dimensions.get('window').width
    }

    onLayout = event => {
        this.setState({width: event.nativeEvent.layout.width});
    }

    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;

        //Fixes Error where PCH Icon shifts to the right.
        return {headerRight: <View></View>}
    };

    buildHtml(algorithm) {
        let html = `<div ${textCSS(this.state.width)}>${algorithm.description}</div>`
        return html;
    }

    render() {
        const {navigation} = this.props;
        const algorithm    = navigation.getParam('algorithm', null);

        return (
            <ScrollView style={styles.container}>
                <View onLayout={this.onLayout}>
                    <Text style={styles.titleText}>{algorithm.name}</Text>
                    <HTML containerStyle={styles.descriptionText} 
                        html={this.buildHtml(algorithm)}
                    />
                </View>
            </ScrollView>
        );
    }
}

const textCSS = function(width) {
    if (width > 1000) {
        return (`style='line-height: ${width * 0.02}'`)
    }
    else if (width > 750) {
        return (`style='line-height: ${width * 0.025}'`)
    }
    else {
        return (``)
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
        flex             : 1,
    }
});
