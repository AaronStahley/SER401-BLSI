import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Simple Button to be used on the home screen. 
 * @author Aaron S
 */
const Button = (props) => {
    return (
      <TouchableOpacity 
      onPress={props.onPress}
      style={styles.buttonBody}>
        <Text style={styles.buttonText}>
            {props.children}
        </Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({ 

    buttonBody: {
        flex: 1,
        backgroundColor: "#ee3e41",
        borderWidth: 0,
        borderRadius: 5,
        alignItems: "center",
        margin: 5
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        margin: 5
    }
})

export { Button }