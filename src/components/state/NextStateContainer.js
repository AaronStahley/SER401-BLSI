import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Colors from '../../common/Colors';
import {inject, observer} from "mobx-react/native";
import StateContainer from "./StateContainer";

@inject("rootStore")
@observer
export default class NextStateContainer extends React.Component {
    state = {
        proceedClicked: false,
        currentState  : null
    };

    componentDidMount() {
        if (!this.state.currentState) {
            this.loadState();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.nextStateId !== prevProps.nextStateId) {
            this.setState({
                currentState: null
            });
            this.loadState();
        }
    }


    loadState() {
        let {nextStateId, rootStore} = this.props;
        rootStore.stateStore.findPK(nextStateId)
            .then(state => state.init())
            .then(state => {
                this.setState({
                    currentState: state,
                });
                return state;
            });
    }

    render() {

        let {currentState} = this.state;

        if (!currentState) {
            return <View/>;
        }

        return (
            <StateContainer state={currentState}/>
        );
    }
}


const styles = StyleSheet.create({
    proceedButton: {
        alignContent: 'center',
        marginTop   : 10,
        marginBottom: 10,
        borderRadius: 0
    }
});