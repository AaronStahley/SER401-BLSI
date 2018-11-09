import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import MessageBubble from "../components/MessageBubble"
import HeaderStyle from "../components/HeaderStyle";

export default class QuestionsScreen extends React.Component {
    static navigationOptions = HeaderStyle;
    
    getNextMessage(answer) {
        //To be filled out later
        return <Text style={[styles.text]}>'Hello there'</Text>;
    }

    render() {
        const responses = '';

    return (
        <ScrollView style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text>
                    Questions Screen
                </Text>
            </View>
            <View>
                <MessageBubble
                    type = 'question'
                    content={<Text style={[styles.text]}>'Hello thereas daskjdh ashd jkahsjkdhasjkhdkjas hdjkash asjkfhasjkfh askjfhaskjf askjfhasjkf hak'</Text>}
                    image={require('../assets/images/WHITE_HAND_LOGO.png')}
                ></MessageBubble>
                <MessageBubble
                    type = 'recommendation'
                    content={<Text style={[styles.text]}>Hello thereas daskjdh ashd jkahsjkdhasjkhdkjas hdjkash asjkfhasjkfh askjfhaskjf askjfhasjkf hak</Text>}
                    image={require('../assets/images/WHITE_HAND_LOGO.png')}
                ></MessageBubble>
                <MessageBubble
                    type = 'bubble'
                    content={<Text style={[styles.text]}>Hello thereas daskjdh ashd jkahsjkdhasjkhdkjas hdjkash asjkfhasjkfh askjfhaskjf askjfhasjkf hak</Text>}
                    image={require('../assets/images/WHITE_HAND_LOGO.png')}
                ></MessageBubble>
            </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        maxWidth: Dimensions.get('screen').width
    },
    contentContainer: {
        paddingTop: 30,
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
