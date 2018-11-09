import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderStyle from "../components/HeaderStyle";

export default class ConversationScreen extends React.Component {
    static navigationOptions = {};

  render() {
    return (
        <ScrollView style={styles.container}>
          <View style={styles.welcomeContainer}>
              <Text>
                  Conversation Screen
              </Text>
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
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    }
});
