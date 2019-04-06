import React from 'react';
import {ScrollView, StyleSheet, Text, View, Button, SectionList, FlatList, Image} from 'react-native';
import {Card, Divider} from 'react-native-elements'
import Colors from "../../../common/Colors";
import EmailButton from "../../../components/navigation/EmailButton"
import {inject, observer} from "mobx-react/native";

@inject("rootStore")
@observer
export default class DischargeScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;

        return {

            headerRight   : (
                <EmailButton subject={params.subject} body={params.body}/>
            ), headerStyle: {

                backgroundColor  : Colors.navBarBackground,
                paddingBottom    : 10,
                height           : 50,
                elevation        : 0, //Removes the underline from nav
                borderBottomWidth: 0,
            }

        };
    }

    state = {
        subject: "",
        body: "",
        currentState: {}
    };


    componentWillMount() {
        let {nextStateId, rootStore, path} = this.props;
        console.log(nextStateId)
        console.log(path)
        this.setState({
            currentState: rootStore.stateStore.createInstance(nextStateId, path)
        })
    }

    componentDidMount() {             
        this.setContent()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.currentState != this.state.currentState){
            this.setContent()
        }
    }

    setContent() {
        let {currentState} = this.state;

        let subject = "";
        let body = "";
        try {
            subject = currentState.Recommendations[0].title;
            body = currentState.Recommendations[0].description;
        } catch(e) {}

        this.setState({
            subject: subject,
            body: body
        })

        this.props.navigation.setParams({
            subject: subject,
            body: body
        });
    }

    render() {
        const {subject, body} = this.state;

        return (
            <ScrollView style={styles.container}>
                <View >
                    <Card
                        title={subject}>
                        <Text style={{marginBottom: 10}}>
                            {body}
                        </Text>
                        <Divider style={{ backgroundColor: '#b3b3b3' }} />
                        <Text style={{marginBottom: 10, marginTop: 10}}>
                            {body}
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

