import React from 'react';
import {ScrollView, StyleSheet, Text, View,Button} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import HeaderStyle from '../components/HeaderStyle';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: '#fff', elevation:0
        }

    };
    render() {
        const { navigate } = this.props.navigation;
        return (

        <ScrollView style={styles.container}>
          <View style={styles.welcomeContainer}>
              <Text style={styles.titleText}>
                  Welcome What are we doing today?
              </Text>
              <Button
                  onPress={() => navigate('Questions')}
                  title="BLSI Algorithm"
                  color= '#ee3e41'
              />
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
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    titleText: {
        fontSize: 20,
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#ee3e41',
        width: 300,
        height: 45,
        borderWidth: 0,
        borderRadius: 5
    }
});

