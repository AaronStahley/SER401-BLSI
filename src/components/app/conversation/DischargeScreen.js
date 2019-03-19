import React from 'react';
import {ScrollView, StyleSheet, Text, View, Button, SectionList, FlatList, Image} from 'react-native';
import {Card, Divider} from 'react-native-elements'


export default class DischargeScreen extends React.Component {

    render() {
        const {navigate} = this.props.navigation;

        return (

            <ScrollView style={styles.container}>
                <View>
                    <Card
                        title='Discharge Instructions'>
                        <Text style={{marginBottom: 10}}>
                            No Ibuprofen or other NSAIDS. Acetaminophen is ok.
                        </Text>
                        <Divider style={{backgroundColor: '#b3b3b3'}}/>
                        <Text style={{marginBottom: 10, marginTop: 10}}>
                            May go back to school when off narcotic pain meds.
                        </Text>
                        <Divider style={{backgroundColor: '#b3b3b3'}}/>
                        <Text style={{marginBottom: 10, marginTop: 10}}>
                            Restricted activity for length per APSA Guidelines. Weeks = 2+grade.
                        </Text>
                        <Divider style={{backgroundColor: '#b3b3b3'}}/>
                        <Text style={{marginBottom: 10, marginTop: 10}}>
                            Activity restrictions include all sports, any recreational activity with
                            wheels, or any activity that involves having both feet off the ground.
                        </Text>
                        <Divider style={{backgroundColor: '#b3b3b3'}}/>
                        <Text style={{marginBottom: 10, marginTop: 10}}>
                            Return to ED for increasing pain, pallor, dizziness, fever, vomiting,
                            worsening shoulder pain, GI bleeding or black tarry stools.
                        </Text>
                        <Divider style={{backgroundColor: '#b3b3b3'}}/>
                        <Text style={{marginBottom: 10, marginTop: 10}}>
                            Call office for jaundice (yellow discoloration to white part of eye).
                        </Text>
                        <Divider style={{backgroundColor: '#b3b3b3'}}/>
                        <Text style={{marginBottom: 10, marginTop: 10}}>
                            Office visit for Grade 3-5 injury at 2 weeks post injury or phone
                            call follow-up for grade 1-2 injury at 2 weeks.
                        </Text>
                        <Divider style={{backgroundColor: '#b3b3b3'}}/>
                        <Text style={{marginBottom: 10, marginTop: 10}}>
                            No follow-up imaging is required unless symptoms develop.
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
    container      : {
        flex           : 1,
        backgroundColor: '#fff',
    },
    titleText      : {
        fontSize    : 20,
        marginBottom: 30,
    },
    button         : {
        backgroundColor: '#ee3e41',
        width          : 300,
        height         : 45,
        borderWidth    : 0,
        borderRadius   : 5
    },
    startOverButton: {
        color       : '#fff',
        paddingRight: 8,
        paddingTop  : 5,
        fontSize    : 18
    }
});

