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
import MessageBubble from "../components/MessageBubble"

const text = <Text style = {
    {paddingTop: 5,
        paddingBottom: 5,
        color: "#000",
        textAlign: "auto"}
}>
    Hello thereas daskjdh ashd askjfhaskjf askjfhasjkf hak
</Text>;
const content = [
    {type: 'question',
        content: text,
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
    },
    startOverButton: {
        color: '#fff',
        paddingRight: 8,
        paddingTop: 5,
        fontSize: 18
    }

});

