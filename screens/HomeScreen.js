import React from 'react';
import {ScrollView, StyleSheet, Text, View, Button, SectionList, FlatList, Image} from 'react-native';
import {Card} from 'react-native-elements'
import { ExpoLinksView } from '@expo/samples';
import HeaderStyle from '../components/HeaderStyle';
import AlgorithmBox from "../components/AlgorithmBox";
import Colors from "../constants/Colors";


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        headerTitle: (<Image
            style={{
                flex: 1,
                width: 40,
                height: 40,
                resizeMode: 'contain',
                alignSelf: 'center',
            }}

            source={require('../assets/images/WHITE_HAND_LOGO.png')}/>),
        headerStyle: {
            backgroundColor: Colors.navBarBackground,
            paddingBottom: 8,
        }
    };

    render() {
        const { navigate } = this.props.navigation;

        return (

        <ScrollView style={styles.container}>
          <View style={styles.welcomeContainer}>
              <Card
                  title='NOM BLSI'>
                  <Text style={{marginBottom: 10}}>
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                  </Text>
                  <Button
                      onPress={() => navigate('Questions')}
                      color= '#ee3e41'
                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='Start' />
              </Card>
              <Card
                  title='Other Algorithm'>
                  <Text style={{marginBottom: 10}}>
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                  </Text>
                  <Button
                      onPress={() => navigate('Questions')}
                      color= '#ee3e41'
                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='Start' />
              </Card>
              <Card
                  title='Other Algorithm'>
                  <Text style={{marginBottom: 10}}>
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                  </Text>
                  <Button
                      onPress={() => navigate('Questions')}
                      color= '#ee3e41'
                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='Start' />
              </Card>
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

