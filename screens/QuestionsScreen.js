import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class QuestionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Questions',
      headerStyle: {
          backgroundColor: '#ee3e41',
      },headerTintColor: '#fff',

  };

  render() {
    return (
      <ScrollView style={styles.container}>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
