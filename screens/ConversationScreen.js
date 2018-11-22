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
    SectionList, Button, Alert
} from 'react-native';
import QuestionContent from "../components/QuestionBubbleContent";
import RecommendationContent from "../components/RecommendationBubbleContent";
import MessageBubble from "../components/MessageBubble";
import Colors from '../constants/Colors';
import {observer} from 'mobx-react/native'


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
        questions: [
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
                ]
            }],
        image: require('../assets/images/WHITE_HAND_LOGO.png')
    },
    {type: 'recommendation',
        header: 'This is what you need to do. You need to do this. And that.',
        recommendations: [{
            task: 'Please do this.',
            link: 'Please do this. Please do that. Please do this.'
        },
        {
            task: 'Please do this.',
            link: {}
        }],
        image: require('../assets/images/WHITE_HAND_LOGO.png')
    },
    {type: 'bubble',
        text: 'Hello this is that status of the patiant. Please continue',        
        image: require('../assets/images/WHITE_HAND_LOGO.png')
    },
    {type: 'question',
        questions:  [
            {question: "What is the patient's Hb level?", type: 'textfield',
            answers: [{prompt: 'Hb'}]}, 
            {question: "Is the patient symptomatic?", type: 'checkbox',
            answers: [{ text: "Yes", value: "yes"}]
            }],
        image: require('../assets/images/WHITE_HAND_LOGO.png')
    },
    {type: 'question',
        questions: [
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
                ]
            }],
        image: require('../assets/images/WHITE_HAND_LOGO.png')
    },
];


@observer
export default class ConversationScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: (
            <View>
                <TouchableOpacity onPress={() => Alert.alert(
                    'Are You Sure?',
                    'Do you want to start the algorithm from the start?',
                    [
                        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'Yes', onPress: () => navigation.navigate('Home')}

                    ])}>
                    <Text style={styles.startOverButton}>
                        Start Over
                    </Text>
                </TouchableOpacity>
            </View>
        )

    });

    loadMessages(content) {
        let messages = [];
        let length = Object.keys(content).length;
        for (let x = 0; x < length; x++) {
            let component;
            if(content[x].type == 'recommendation') {
                component = <RecommendationContent text={"This is important to do."} 
                    recommendations={content[x].recommendations}
                    header={content[x].header}
                    />;
            } 
            else if (content[x].type == 'question') {
                component = <QuestionContent text={"This is important to do."} 
                    questions={content[x].questions}
                    />;
            }  
            else if(content[x].type == 'bubble') {
                component = text;
            }

            messages[x] = {
                title: <MessageBubble 
                    type= {content[x].type}
                    content={component}
                    image= {content[x].image}
                    />,                    

                data: []
            };
        }
        return messages;
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
    messageContainer: {
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
    },
    startOverButton: {
        color: '#fff',
        paddingRight: 8,
        paddingTop: 5,
        fontSize: 18
    }

});

