import React from 'react';
import {ScrollView, StyleSheet, Text, View, Button, TouchableOpacity,SectionList, FlatList, Image} from 'react-native';
import {Card} from 'react-native-elements'
import {inject, observer} from 'mobx-react/native'
import {ExpoLinksView} from '@expo/samples';
import AlgorithmBox from "../components/AlgorithmBox";
import Colors from "../constants/Colors";
import {getShortDesc} from '../components/AlgorithmData'

@inject("rootStore")
@observer
export default class HomeScreen extends React.Component {

    state = {
        algorithms: []
    };

    componentDidMount() {
        this.props.rootStore.algorithmStore.findAll()
            .then(res => {
                this.setState({
                    algorithms: res
                });
            })
    }


    render() {
        const {algorithms} = this.state;
        const {navigate}   = this.props.navigation;

        return (
            /**
             * TODO Need to move all of this into its own component so that
             * TODO Data from the model can be accepted into the header and body.
             *
             * Styling is mostly done/ Created custom buttons for the cards.
             */
        <ScrollView style={styles.container}>
          <View >
              <Card title='NOM BLSI'>
                  <Text style={styles.bodyText}>
                      Nonoperative management of blunt liver and spleen injury
                      in children (NOMBLSI) helps prevent unnecessary surgeries in children when
                      there may or may not be internal bleeding.
                  </Text>
                  <View style={styles.buttonContiner}>
                      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Conversation')}>
                          <Text style={styles.buttonText}>Info</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Conversation')}>
                          <Text style={styles.buttonText}>Start</Text>
                      </TouchableOpacity>
                  </View>
              </Card>
              <Card
                  title='Other Algorithm'>
                  <Text style={{marginBottom: 10}}>
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                  </Text>
                  <View style={styles.buttonContiner}>
                      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Conversation')}>
                          <Text style={styles.buttonText}>Info</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Conversation')}>
                          <Text style={styles.buttonText}>Start</Text>
                      </TouchableOpacity>
                  </View>
              </Card>
              <Card
                  title='Other Algorithm'>
                  <Text style={{marginBottom: 10}}>
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                  </Text>
                  <View style={styles.buttonContiner}>
                      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Conversation')}>
                          <Text style={styles.buttonText}>Info</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Conversation')}>
                          <Text style={styles.buttonText}>Start</Text>
                      </TouchableOpacity>
                  </View>
              </Card>
          </View>
      </ScrollView>
    );

    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    },
    titleText: {
        fontSize    : 20,
        marginBottom: 30,
    },


    button: {
        flex: 1,
        backgroundColor: '#ee3e41',
        borderWidth: 0,
        borderRadius: 5,
        alignItems: 'center',
        margin: 5
    },
    buttonText:{
        color: '#fff',
        fontSize: 18,
        margin: 5
    },
    buttonContiner:{
        flexDirection: 'row',

    },bodyText:{
        fontSize: 16,
        marginBottom: 15,
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

