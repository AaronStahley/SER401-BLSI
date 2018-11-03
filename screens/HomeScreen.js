import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import HeaderStyle from '../components/HeaderStyle';


export default class HomeScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
          <View style={styles.welcomeContainer}>
              <Text>
                  Home Screen
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

