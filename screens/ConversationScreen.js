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
import ProceedButton from "../components/ProceedButton";
import Colors from '../constants/Colors';
import {observer} from 'mobx-react/native';
import State from '../data/model/State';

const text = <Text style = {
    {paddingTop: 5,
    paddingBottom: 5,
    color: "#000",
    textAlign: "auto"}}>
    Hello there, something about the app
    </Text>;
        
const bubble = {type: 'bubble',
        text: 'Hello this is that status of the patiant. Please continue',        
        image: require('../assets/images/WHITE_HAND_LOGO.png'),
    next: null};

const recommendation1 = {type: 'recommendation',
        header: 'This is what you need to do. You need to do this. And that.',
        recommendations: [{
            task: 'Please do this.',
            link: ""
        },
        {
            task: 'Please do this.',
            link: "this will be a link to the sources"
        }],
        image: require('../assets/images/WHITE_HAND_LOGO.png'),
    next: question2};

const recommendation2 = {type: 'recommendation',
        header: 'This is what you need to do. You need to do this. And that.',
        recommendations: [{
            task: 'Please do this.',
            link: 'Please do this. Please do that. Please do this.'
        },
        {
            task: 'Please do this.',
            link: {}
        }],
        image: require('../assets/images/WHITE_HAND_LOGO.png'),
    next: question3};

const recommendation3 = {type: 'recommendation',
    header: 'This is what you need to do. You need to do this. And that.',
    recommendations: [{
        task: 'Please do this.',
        link: 'Please do this. Please do that. Please do this.'

    },
    {
        task: 'Please do this.',
        link: {}
    }],
    image: require('../assets/images/WHITE_HAND_LOGO.png'),
    next: bubble};

const question1 = {type: 'question',
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
        image: require('../assets/images/WHITE_HAND_LOGO.png'),
    next: recommendation1};

const  question2 = {type: 'question',
        questions:  [
            {question: "What is the patient's Hb level?", type: 'textfield',
            answers: [{prompt: 'Hb'}]}, 
            {question: "Is the patient symptomatic?", type: 'checkbox',
            answers: [{ text: "Yes", value: "yes"}]
            }],
        image: require('../assets/images/WHITE_HAND_LOGO.png'),
    next: recommendation2};

const question3 = {type: 'question',
    questions: [
        {question: "What is the patient's Hb level?", type: 'checkbox',
            answers: [
                { text: "Hb > 7.0", value: "yes"},
                { text: "Hb < 7.0", value: "no" },
            ]},
        {question: "Is the patient symptomatic?", type: 'checkbox',
            answers: [
                { text: "Yes", value: "yes"},
                { text: "No", value: "no" },                   
            ]
        }],
    image: require('../assets/images/WHITE_HAND_LOGO.png'),
    next: recommendation3};

@observer
export default class ConversationScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {current: question1, history: []};
        this.componentDidMount = this.loadMessages(this);
    }

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

    loadMessages(parent) {
        let component, data;
        let current = parent.state.current;

        if(current.type == undefined){
            return;

        }
        if(current.type == 'recommendation') {
            component = <RecommendationContent 
                text={"This is important to do."}
                recommendations={parent.state.current.recommendations}
                header={parent.state.current.header}/>;

            data = <ProceedButton 
                //onPress={parent.loadMessages}
                parent={parent}
                title="Proceed" />;                          
        } 
        else if (current.type == 'question') {
            component = <QuestionContent 
                questions={current.questions}
                onComplete={parent.loadMessages}
                parent={parent}
                />;

            data = null;
        }  
        else if (current.type == 'bubble') {
            component = text;
            data = null;
        }

        //Add to history
        let history = parent.state.history
        parent.state.history[history.length] = {
                title: < MessageBubble
                type= {current.type}
                content={component}
                image= {current.image}
                />,                    
            data: [data]}
        
        parent.state.current = parent.state.current.next;
        parent.componentDidMount;
    }

    render() {

        const { navigation } = this.props;
        const algorithm = navigation.getParam('algorithm', null);

        return (<ScrollView style={styles.container}
                indicatorStyle={'default'}>
                {this.componentDidMount}
            <View style={styles.welcomeContainer}>
                <Text>
                    Questions Screen
                </Text>
            </View>
            <View >
                <SectionList  
                    renderItem={({item, index, section}) => 
                        <View key={index}>
                            {item}
                        </View>
                    }          
                    renderSectionHeader={({section: {title}}, index) =>
                        <View>
                            {title}
                        </View>
                    }
                    sections= {this.state.history}
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
    },
    seperator: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 1,
        borderRadius: 50,      
        backgroundColor: "#000",
        alignContent: 'center',
    }

});

