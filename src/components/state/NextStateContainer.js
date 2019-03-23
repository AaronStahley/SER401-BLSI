import React from 'react';
import {View} from 'react-native';
import {inject, observer} from "mobx-react/native";
import StateContainer from "./StateContainer";

@inject("rootStore")
@observer
export default class NextStateContainer extends React.Component {

    state = {
        currentState: null
    };

    componentDidMount() {
        let {nextStateId, rootStore, path} = this.props;

        this.setState({
            currentState: rootStore.stateStore.createInstance(nextStateId, path)
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {nextStateId, rootStore, path} = this.props;

        if (prevProps.nextStateId !== nextStateId) {
            this.setState({
                currentState: rootStore.stateStore.createInstance(nextStateId, path)
            });
        }
    }


    render() {
        if (!this.state.currentState) {
            return <View/>;
        }
        return (
            <StateContainer 
                onDischargePress={this.props.onDischargePress}
                type={this.props.nextStateType} 
                state={this.state.currentState}
            />
            
        );
    }
}