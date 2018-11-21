import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SectionList
} from 'react-native';
import QuestionContent from "../components/QuestionBubbleContent";
import MessageBubble from "../components/MessageBubble";
import HeaderStyle from "../components/HeaderStyle";
import Colors from '../constants/Colors';

const text = <Text style = {
                    {paddingTop: 5,
                    paddingBottom: 5,
                    color: "#000",
                    textAlign: "auto"}
                }>
                Hello there something about the app
                </Text>;
const content = [
        {type: 'question',
        content: <QuestionContent text={"This is important to do."} 
                tasks={['Do this.', 'Do that.']}
                questions={[
                    {question: "What is the patient's Hb level?", type: 'checkbox',
                    answers: [
                        { text: "Hb > 7.0", value: "yes"},
                        { text: "Hb < 7.0", value: "no" },
                        { text: "> 7.0 and Symptomatic", value: "2323"}
                    ]},
                    {question: "Is the patient symptomatic?", type: 'checkbox',
                    answers: [
                        { text: "Yes", value: "yes"},
                        { text: "No", value: "no" },                   
                    ]}
                ]}                               
            />,
        image: require('../assets/images/WHITE_HAND_LOGO.png')
        },
        {type: 'recommendation',
        content: text,
        image: require('../assets/images/WHITE_HAND_LOGO.png')
        },
        {type: 'bubble',
        content: text,
        image: require('../assets/images/WHITE_HAND_LOGO.png')
        },
        {type: 'question',
        content: <QuestionContent text={"This is important to do."} 
            tasks={['Do this.', 'Do that.']}
            questions={[
            {question: "What is the patient's Hb level?", type: 'textfield',
            answers: [{prompt: 'Hb'}]}, //TODO: remove to continue testing text
            {question: "Is the patient symptomatic?", type: 'checkbox',
            answers: [
                { text: "Yes", value: "yes"}                 
            ]}
        ]}/>,
        image: require('../assets/images/WHITE_HAND_LOGO.png')
        },
        {type: 'question',
        content: <QuestionContent text={"This is important to do."} 
            tasks={['Do this.', 'Do that.']}
            questions={[
            {question: "Is the patient symptomatic?", type: 'checkbox',
                answers: [
                    { text: "Yes", value: "yes"},
                    { text: "No", value: "no" },                   
            ]}, 
            {question: "Is the patient symptomatic?", type: 'checkbox',
                answers: [
                    { text: "Yes", value: "yes"},
                    { text: "No", value: "no" },                   
            ]}
        ]}/>,
        image: require('../assets/images/WHITE_HAND_LOGO.png')
        }
    ];
export default class ConversationScreen extends React.Component {
    static navigationOptions = HeaderStyle;

    loadMessages(content) {
        let messages = [];
        let length = Object.keys(content).length;
        for (let x = 0; x < length; x++) {
            messages[x] = {
                title: <MessageBubble 
                    type= {content[x].type}
                    content= {content[x].content}
                    image= {content[x].image}
                    />,                    
                data: []
            };
        }
        return messages;
    }

    //this.createStyle(content, index)
    createStyle(content, index) {
        switch(content[index].type) {
            case "recommendation":
                return ([styles.container, {
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                }]);

            case "question":
                return([styles.container]);

            default:
                return ([styles.container]);
        }
    }
    render() {
        return (<ScrollView style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text>
                    Questions Screen
                </Text>
            </View>
            <View>
                <SectionList            
                    renderSectionHeader={({section: {title}}, index) =>
                        <View>
                            {title}
                        </View>
                    }
                    sections= {this.loadMessages(content)}
                    keyExtractor={(item, index) => item + index} 
                /> 
            </View>
        </ScrollView>);
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',    
        backgroundColor: Colors.conversationBackground, 
        paddingTop: 10,
        paddingBottom: 10
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        paddingBottom: 10
    },
    text: {
        paddingTop: 5,
        paddingBottom: 5,
        color: "#000",
        textAlign: "auto"
    }
    
});
