import React from 'react';
import {Button, View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Colors from '../../common/Colors';

export default class ProceedButton extends React.Component {

    render() {
        return (

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                    <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    proceedButton: {
        alignContent: 'center',
        marginTop   : 10,
        marginBottom: 10,
        borderRadius: 0
    },
    button: {
        flex: 1,
        backgroundColor: '#ee3e41',
        borderWidth: 0,
        borderRadius: 5,
        alignItems: 'center',
        margin: 5
    },
    buttonText:{
        color: '#fff',
        fontSize: 16,
        margin: 5
    },
    buttonContainer:{
        flexDirection: 'row',

    }
});