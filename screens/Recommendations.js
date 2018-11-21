import React from 'react';
import {ScrollView, StyleSheet, Text, View, Button, SectionList, FlatList, Image} from 'react-native';
import {Card} from 'react-native-elements'
import { ExpoLinksView } from '@expo/samples';
import AlgorithmBox from "../components/AlgorithmBox";
import Colors from "../constants/Colors";


export default class HomeScreen extends React.Component {

    render() {
        const { navigate } = this.props.navigation;

        return (

        <ScrollView style={styles.container}>
          <View >
              <Card
                  title='Critical'>
                  <Text style={{marginBottom: 10}}>
                      An abbreviated period of bed rest of one day or less for stable patients is unequivocally
                      supported for children whose hemoglobin has been documented to be stable. The use of bed
                      rest on the day of admission will be discretionary until data is available.
                  </Text>
              </Card>
              <Card
                  title='Major'>
                  <Text style={{marginBottom: 10}}>
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                  </Text>
              </Card>
              <Card
                  title='Minor'>
                  <Text style={{marginBottom: 10}}>
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                      Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                  </Text>
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
    }
});

