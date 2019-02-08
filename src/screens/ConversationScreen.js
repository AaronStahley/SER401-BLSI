import React from 'react';
import {ScrollView, StyleSheet, View, Text, Button, Alert, TouchableOpacity, Dimensions} from 'react-native';
import Colors from '../common/Colors';
import {observer} from 'mobx-react/native';
import NextStateContainer from "../components/state/NextStateContainer";
import {widthPercentageToDP as widthDP} from "react-native-responsive-screen";

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
                contentContainerStyle={setConvoStyle()}
                indicatorStyle={'default'}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    this.scrollView.scrollToEnd({animated: true});
                }}
            >
                <NextStateContainer nextStateId={algorithm.StateIdStart}/>
            </ScrollView>);
    }
}

const setConvoStyle = function() {
    if (Dimensions.get('window').width > 1000) {
        return {
            paddingTop   : 10,
            paddingBottom: 50,
            flexGrow     : 1,
            width        : widthDP('60%'),
            maxWidth     : widthDP('60%')
        }
    }
    else if (Dimensions.get('window').width > 500) {
        return {
            paddingTop   : 10,
            paddingBottom: 50,
            flexGrow     : 1,
            width        : widthDP('60%'),
            maxWidth     : widthDP('60%'),

        }
    }
    else {
        return {
            flexGrow     : 1,
            paddingTop   : 10,
            paddingBottom: 50,
            width        : widthDP('100%'),
            maxWidth     : widthDP('100%'),
        }
    }
}

const styles = StyleSheet.create({
    root               : {
        backgroundColor: Colors.conversationBackground,
        alignItems     : 'center'
    },
    container        : {
        paddingTop   : 10,
        paddingBottom: 50
    },
    startOverButton : {
        color       : Colors.startOverButton,
        paddingRight: 8,
        paddingTop  : 5,
        fontSize    : 18
    }
});

