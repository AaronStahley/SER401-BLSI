import React from 'react';
import {ScrollView, StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import RefreshButton from "../../ui/RefreshButton.js"
import email from 'react-native-email'
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
        return {headerRight: <RefreshButton algorithmId={params.algorithm.id}/>}
    };

    render() {
        const {navigation} = this.props;
        const algorithm    = navigation.getParam('algorithm', null);

        return (
            <ScrollView style={styles.container} onLayout={this.onLayout}>
                <View>
                    <Text style={styles.titleText}>{algorithm.name}</Text>
                    <HTML containerStyle={styles.descriptionText} html={`<div ${textCSS(this.state.width)}'>${algorithm.description}</div>`}/>
                </View>
            </ScrollView>
        );
    }
}

const textCSS = function(width) {
    if (width > 1000) {
        return (`style='line-height: ${width * 0.02}`)
    }
    else if (width > 750) {
        return (`style='line-height: ${width * 0.025}`)
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
