import React from 'react';
import {ScrollView, StyleSheet, Text, View, Button, SectionList, FlatList, Image} from 'react-native';
import {Card} from 'react-native-elements'
import {observer} from 'mobx-react/native'
import { ExpoLinksView } from '@expo/samples';
import AlgorithmBox from "../components/AlgorithmBox";
import Colors from "../constants/Colors";
import {getShortDesc} from '../components/AlgorithmData'

@observer
export default class HomeScreen extends React.Component {

    render() {
        const { navigate } = this.props.navigation;

        return (

        <ScrollView style={styles.container}>
          <View >
              <Card
                  title='NOM BLSI'>
                  <Text style={{marginBottom: 10}}>
                      {getShortDesc(0)}
                  </Text>
                  <Button
                      onPress={() => this.props.navigation.navigate('AlgDescription')}                    
                      color='#b3b3b3'
                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='Learn More' />
                  <Button
                      onPress={() => this.props.navigation.navigate('Conversation')}
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
    },
    algorithmContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 300,
		padding: 15,
		marginBottom: 10,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#ccc',
		backgroundColor: '#f2f2f2'
	}
});

