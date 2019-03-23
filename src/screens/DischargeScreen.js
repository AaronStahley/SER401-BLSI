import React from 'react';
import {ScrollView, StyleSheet, Text, View, Button, SectionList, FlatList, Image} from 'react-native';
import {Card, Divider} from 'react-native-elements'
import Colors from "../common/Colors";


export default class DischargeScreen extends React.Component {

    render() {
        const { navigate } = this.props.navigation;

        return (

        <ScrollView style={styles.container}>
          <View >
              <Card
                  title='ATOMAC Guideline Discharge Instructions ver2.1'>
                  <Text style={{marginBottom: 10}}>
                      Return to Emergency Room (ER) for increasing pain, paleness, dizziness,
                      shortness of breath, vomiting, worsening shoulder pain, intestinal bleeding,
                      or black tarry stools.
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      Call trauma surgeon’s office for fever (temp >101oF) or jaundice (yellow
                      eyes, yellow skin).
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      Restricted activity for (grade +2) weeks
                      o Your child’s injury grade was a grade ______ .
                      o Your child may return to sports in _________ weeks.
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      No ibuprofen (Motrin, etc), aspirin, or other NSAIDS. Acetaminophen
                      (Tylenol) is okay.
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      Child may go back to school when off pain meds, but no gym classes or
                      sports.
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      The patient is granted medical permission to change class 5 minutes early (to
                      prevent re-injury between classes).
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      Follow-up:
                      o Grade 1-2 Injury: Phone call follow-up at 2 weeks and again at 2
                      months after injury.
                      o Grade 3-5 injury: Office visit at 2 weeks. Phone call follow-up at 2
                      months after injury
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      No routine follow-up imaging is required. Imaging is recommended for
                      patients with increasing pain, or symptoms.
                  </Text>
              </Card>
              <Card
                  containerStyle={{padding: 30}}>
                      <Button
                          onPress={() => this.props.navigation.navigate('Conversation')}
                          color='#b3b3b3'
                          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                          title='Back to Conversation Page'/>
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
    startOverButton: {
        color: '#fff',
        paddingRight: 8,
        paddingTop: 5,
        fontSize: 18
    }
});

