import React from 'react';
import HTMLView from 'react-native-htmlview';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import RefreshButton from "../components/ui/RefreshButton.js"
import {Button} from 'react-native';

export default class AlgDescriptionScreen extends React.Component {
    
    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;

        //Fixes Error where PCH Icon shifts to the right.
        return {headerRight: <RefreshButton algorithmId={params.algorithm.Id}/>}
    };

    render() {
        const {navigation} = this.props;
        const algorithm    = navigation.getParam('algorithm', null);

        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.titleText}>{algorithm.Name}</Text>
                    <HTMLView style={styles.descriptionText} value={`<div>${algorithm.Description}</div>`}/>
                    <Card
                        containerStyle={{padding: 30}}>
                            <Button
                                onPress={() => this.props.navigation.navigate('DischargeScreen')}
                                color='#b3b3b3'
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                title='Discharge Instructions'/>
                    </Card>
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
    button: {
        backgroundColor: '#ee3e41',
        width: 300,
        height: 45,
        borderWidth: 0,
        borderRadius: 5
    },
    descriptionText: {
        paddingHorizontal: 20,
        flex             : 1
    }
});
