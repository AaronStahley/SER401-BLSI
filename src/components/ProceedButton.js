import React from 'react';
import {Button, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

export default class ProceedButton extends React.Component {

    render() {
        return (
            <Button onPress={this.props.onPress}
                    color={Colors.proceedButton}
                    buttonStyle={styles.proceedButton}
                    title={this.props.title}
            />
        );
    }
}

const styles = StyleSheet.create({
    proceedButton: {
        alignContent: 'center',
        marginTop   : 10,
        marginBottom: 10,
        borderRadius: 0
    }
});