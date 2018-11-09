import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import HeaderStyle from '../components/HeaderStyle';


class AlgorithmOption extends React.Component {
    render() {
        return (
            <View style={styles.algorithmContainer}>
                <Text style={styles.algorithmTitle}> 
                    {this.props.algTitle}
                </Text>
                <Text style={styles.algorithmDescription}>
                    {this.props.algDesc}
                </Text>
            </View>
        );
    }
}

export default class HomeScreen extends React.Component {
  static navigationOptions = HeaderStyle;

  render() {
    
    return (
      <ScrollView style={styles.container}>
          <View style={styles.welcomeContainer}>
              <AlgorithmOption algTitle='NOM BLSI' algDesc='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' />
              <AlgorithmOption algTitle='Algorithm2' algDesc='Etiam gravida est vehicula accumsan ultrices. Suspendisse potenti.' />
              <AlgorithmOption algTitle='Algorithm3' algDesc='Sed et dolor in neque pellentesque mollis. Nullam fermentum hendrerit maximus. Morbi dolor lacus, porttitor eu dapibus facilisis, iaculis aliquam tellus. Donec condimentum massa enim, non vehicula mi sodales eu. Praesent eu ultricies turpis.' />
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
        marginTop: 10,
        marginBottom: 20,
    },
    algorithmContainer: {
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderRadius: 5,
        margin: 5,
        padding: 10
    },
    algorithmTitle: {
        color: '#595959',
        fontSize: 30
    },
    algorithmDescription: {
        color: '#404040'
    }
});

