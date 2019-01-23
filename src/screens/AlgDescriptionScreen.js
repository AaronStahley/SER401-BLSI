import React from 'react';
import HTMLView from 'react-native-htmlview';
import { Icon } from 'expo';
import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


export default class AlgDescriptionScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        //Fixes Error where PCH Icon shifts to the right.
        headerRight: (
            <View>
                <TouchableOpacity
                    onPress={() => Alert.alert(
                        'Update Algorithm?  ',
                        'Do you want to upgrade to the newest version ?',
                        [
                            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Yes', onPress: () => navigation.navigate('Home')}

                        ])}>
                <Icon.Ionicons
                    style={{marginRight: 8, marginTop: 5}}
                    color={'#fff'}
                    size={28}
                    name='ios-settings'/>
                </TouchableOpacity>
            </View>
        )

    });

    render() {
        const {navigation} = this.props;
        const algorithm    = navigation.getParam('algorithm', null);

        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.titleText}>{algorithm.Name}</Text>
                    <HTMLView style={styles.descriptionText} value={algorithm.Description}/>
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
