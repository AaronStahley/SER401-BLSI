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

        //console.log(nextStateId + ', ' + path);
        
        var pathStr = path + '';
        var pathArr = pathStr.split(':');
        var prevStateId = pathArr[pathArr.length - 1];
        pathArr.pop();
        var prevPath = pathArr.join(':');
        //console.log(prevStateId + ', ' + prevPath);

        var prevState = rootStore.stateStore.createInstance(prevStateId, prevPath);
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
            <StateContainer state={this.state.currentState}/>
        );
    }
}