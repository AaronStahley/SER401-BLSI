import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import HeaderStyle from '../components/HeaderStyle';

export default class HomeScreen extends React.Component {
  static navigationOptions = HeaderStyle;

  render() {
    
    return (
      <ScrollView style={styles.container}>
          <View style={styles.welcomeContainer}>
              <Text>
                  Select algorithm
              </Text>
          </View>
          <View style={styles.algorithmContainer}>
            <View style={styles.algorithmIcon} />
            <View style={styles.algorithmIcon} />
            <View style={styles.algorithmIcon} />
            <View style={styles.algorithmIcon} />
            <View style={styles.algorithmIcon} />
            <View style={styles.algorithmIcon} />
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
    },
    algorithmContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    algorithmIcon: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        marginBottom: 20
    }
});

