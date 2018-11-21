import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class AlgDescription extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <Text style={styles.titleText}>Test Title</Text>
                <Text style={styles.descriptionText}>Test description</Text>            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 30,
    },
    descriptionText: {
        paddingHorizontal: 20
    }
});