import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import HeaderStyle from '../components/HeaderStyle';

export default class HistoryScreen extends React.Component {
    static navigationOptions = HeaderStyle;

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.welcomeContainer}>
                    <Text>
                        History Screen
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    }
});
