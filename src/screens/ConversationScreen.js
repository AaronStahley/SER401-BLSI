import React from 'react';
import {
    ScrollView,
    StyleSheet, View
} from 'react-native';
import Colors from '../constants/Colors';
import {inject, observer} from 'mobx-react/native';
import StateContainer from "../components/state/StateContainer";

@inject("rootStore")
@observer
export default class ConversationScreen extends React.Component {

    state = {
        currentState: null
    };

    componentDidMount() {
        let {rootStore, navigation} = this.props;
        const algorithm             = navigation.getParam('algorithm', null);

        if (!this.state.currentState) {
            rootStore.stateStore.findPK(algorithm.StateIdStart)
                .then(state => state.init())
                .then(state => {
                    this.setState({
                        currentState: state
                    });
                    return state;
                });

        }
    }


    render() {
        let {currentState} = this.state;

        if (!currentState) {
            return <View/>;
        }

        return (
            <ScrollView style={styles.container} indicatorStyle={'default'}>
                <StateContainer state={currentState}/>
            </ScrollView>);
    }
}

const styles = StyleSheet.create({
    container       : {
        flex           : 1,
        flexDirection  : 'column',
        backgroundColor: Colors.conversationBackground,
        paddingTop     : 10,
        paddingBottom  : 10
    },
    messageContainer: {
        flex           : 1,
        flexDirection  : 'column',
        backgroundColor: Colors.conversationBackground,
        paddingTop     : 10,
        paddingBottom  : 10
    },
    welcomeContainer: {
        alignItems   : 'center',
        marginTop    : 10,
        paddingBottom: 10
    },
    text            : {
        paddingTop   : 5,
        paddingBottom: 5,
        color        : "#000",
        textAlign    : "auto"
    },
    startOverButton : {
        color       : '#fff',
        paddingRight: 8,
        paddingTop  : 5,
        fontSize    : 18
    },
    separator       : {
        flex           : 1,
        flexDirection  : 'row',
        paddingTop     : 1,
        borderRadius   : 50,
        backgroundColor: "#000",
        alignContent   : 'center',
    }

});

