import React from 'react';
import {ScrollView, StyleSheet, Text, View, Button, SectionList, FlatList, Image} from 'react-native';
import {Card, Divider} from 'react-native-elements'
import Colors from "../common/Colors";
import EmailButton from "../components/navigation/EmailButton"


export default class DischargeScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;

        return {

            headerRight   : (
                <EmailButton subject={params.subject} body={params.body}/>
            ), headerStyle: {

                backgroundColor  : Colors.navBarBackground,
                marginTop        : 10,
                paddingBottom    : 10,
                height           : 50,
                elevation        : 0, //Removes the underline from nav
                borderBottomWidth: 0,
            }
        
        };
    }

    constructor(props) {
        super(props);
        this.state = {
          subject: "PCH Dischage Instructions",
          body:
            "No Ibuprofen or other NSAIDS. Acetaminophen is ok.\n\n" +
            "May go back to school when off narcotic pain meds.\n\n" +
            "Restricted activity for length per APSA Guidelines. Weeks = 2+grade.\n\n" +
            "Activity restrictions include all sports, any recreational activity with" +
            "wheels, or any activity that involves having both feet off the ground.\n\n" +
            "Return to ED for increasing pain, pallor, dizziness, fever, vomiting," +
            "worsening shoulder pain, GI bleeding or black tarry stools.\n\n" +
            "Call office for jaundice (yellow discoloration to white part of eye).\n\n" +
            "Office visit for Grade 3-5 injury at 2 weeks post injury or phone" +
            "call follow-up for grade 1-2 injury at 2 weeks.\n\n" +
            "No follow-up imaging is required unless symptoms develop.\n\n"
        };
    }

    componentDidMount() { 
        this.props.navigation.setParams({
            subject: this.state.subject,
            body: this.state.body
        });
    }

    render() {
        const { navigate } = this.props.navigation;

        return (

        <ScrollView style={styles.container}>
          <View >
              <Card
                  title='Discharge Instructions'>
                  <Text style={{marginBottom: 10}}>
                      No Ibuprofen or other NSAIDS. Acetaminophen is ok.
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      May go back to school when off narcotic pain meds.
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      Restricted activity for length per APSA Guidelines. Weeks = 2+grade.
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      Activity restrictions include all sports, any recreational activity with
                      wheels, or any activity that involves having both feet off the ground.
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      Return to ED for increasing pain, pallor, dizziness, fever, vomiting,
                      worsening shoulder pain, GI bleeding or black tarry stools.
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      Call office for jaundice (yellow discoloration to white part of eye).
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      Office visit for Grade 3-5 injury at 2 weeks post injury or phone
                      call follow-up for grade 1-2 injury at 2 weeks.
                  </Text>
                  <Divider style={{ backgroundColor: '#b3b3b3' }} />
                  <Text style={{marginBottom: 10, marginTop: 10}}>
                      No follow-up imaging is required unless symptoms develop.
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
    },
    startOverButton: {
        color: '#fff',
        paddingRight: 8,
        paddingTop: 5,
        fontSize: 18
    }
});

