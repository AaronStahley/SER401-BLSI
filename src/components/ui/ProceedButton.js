import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class ProceedButton extends React.Component {

    render() {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                    <Text style={styles.buttonText}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    buttonContainer: {
        flex:1,
        flexDirection: 'row',
    }
});