import React from 'react';
import {ScrollView, StyleSheet, View, Text, Button, Alert, TouchableOpacity} from 'react-native';
import Colors from '../common/Colors';
import {observer} from 'mobx-react/native';
import NextStateContainer from "../components/state/NextStateContainer";

@observer
export default class ConversationScreen extends React.Component {
    scrollView;

    static navigationOptions = ({navigation}) => ({
        headerRight: (
            <View >
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

    render() {
        let {navigation} = this.props;
        const algorithm  = navigation.getParam('algorithm', null);

        return (
            <ScrollView
                style={styles.root}
                ref={ref => this.scrollView = ref}
                contentContainerStyle={styles.container}
                indicatorStyle={'default'}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    this.scrollView.scrollToEnd({animated: true});
                }}
            >
                <NextStateContainer nextStateId={algorithm.StateIdStart}/>
            </ScrollView>);
    }
}

const styles = StyleSheet.create({
    root     : {
        backgroundColor: Colors.conversationBackground
    },
    container: {
        paddingTop   : 10,
        paddingBottom: 50
    },
    startOverButton: {
        color: '#fff',
        paddingRight: 8,
        paddingTop: 5,
        fontSize: 18
    }
});

