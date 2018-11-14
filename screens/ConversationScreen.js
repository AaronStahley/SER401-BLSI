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
        content: <QuestionContent text={"This is important to do."} tasks={['Do this.', 'Do that.']}/>,
        image: require('../assets/images/WHITE_HAND_LOGO.png')
        },
        {type: 'recommendation',
        content: text,
        image: require('../assets/images/WHITE_HAND_LOGO.png')
        },
        {type: 'bubble',
        content: text,
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
                title: <MessageBubble style={styles.container}
                    type= {content[x].type}
                    content= {content[x].content}
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
                    renderSectionHeader={({section: {title}}) =>
                        <View >
                            {title}
                        </View>
                    }
                    sections= {this.loadMessages(content)}
                    keyExtractor={(item, index) => item + index} 
                /> 
            </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        maxWidth: Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height
        
    },
    contentContainer: {
        flex: 1,
        maxWidth: Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    text: {
        paddingTop: 5,
        paddingBottom: 5,
        color: "#000",
        textAlign: "auto"
    }
    
});
