import React from 'react';
import HTMLView from 'react-native-htmlview';
import {ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import RefreshButton from "../components/ui/RefreshButton.js"
import email from 'react-native-email'

export default class AlgDescriptionScreen extends React.Component {
    
    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;

        //Fixes Error where PCH Icon shifts to the right.
        return {headerRight: <RefreshButton algorithmId={params.algorithm.Id}/>}
    };

    /**
     * Opens email app and sends through that.
     * 
     */
    handleEmail = () => {
        const to = ['stahleyaaron@yahoo.com'] // string or array of email addresses
        email(to, {
            cc: [],
            subject: 'TEST',
            body: 'TEST EMAIL'
        }).catch(console.error)
    }

    render() {
        const {navigation} = this.props;
        const algorithm    = navigation.getParam('algorithm', null);

        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.titleText}>{algorithm.Name}</Text>
                    <HTMLView style={styles.descriptionText} value={`<div>${algorithm.Description}</div>`}/>
                </View>

                <View >
                    <Button title="Send Mail" onPress={this.handleEmail} />
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
