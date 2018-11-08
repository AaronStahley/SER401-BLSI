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
                <MessageBubble style={{}}
                    text='Hello there'
                    type='recommendation'
                    func={this.getNextMessage}

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
    }
    
});
