import React from 'react';
import {ScrollView, StyleSheet, Text, View, Dimensions} from "react-native";
import HTML from 'react-native-render-html';


export default class RecommendationScreen extends React.Component {
    state = {
        width: Dimensions.get('window').width
    }

    onLayout = event => {
        this.setState({width: event.nativeEvent.layout.width});
    }

    buildHtml(recommendation) {
        let html = `<div ${textCSS(this.state.width)}>${recommendation.description}</div>`;
        return html;
    }
    
    static navigationOptions = ({navigation}) => ({
        //Fixes Error where PCH Icon shifts to the right.
        headerRight: (
            <View></View>
        )

    });

    render() {
        const {navigation}   = this.props;
        const recommendation = navigation.getParam('recommendation', null);
        return (
            <ScrollView style={styles.container}>
                <View onLayout={this.onLayout}>
                    <Text style={styles.titleText}>{recommendation.title}</Text>
                    <HTML containerStyle={styles.descriptionText} 
                        html={this.buildHtml(recommendation)}
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
        return(``)
    }
}

const styles = StyleSheet.create({
    container      : {
        flex           : 1,
        backgroundColor: '#fff'
    },
    titleText      : {
        textAlign           : 'center',
        marginTop           : 20,
        marginBottom        : 20,
        paddingHorizontal   : 30,
        fontSize            : 30,
    },
    descriptionText: {
        paddingHorizontal   : 30,
        fontSize            : 20,
        flex                : 1
    }
});


