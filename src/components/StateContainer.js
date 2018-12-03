import React, {Fragment} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {CheckBox as CB} from "react-native-elements";
import Colors from '../constants/Colors';
import QuestionContent from "./QuestionBubbleContent";
import RecommendationContent from "./RecommendationBubbleContent";
import ProceedButton from "./ui/ProceedButton";
import QuestionContainer from "./question/QuestionContainer";
import {inject, observer} from "mobx-react/native";
import {computed} from "mobx";

@inject("rootStore")
@observer
export default class StateContainer extends React.Component {
    state = {
        proceedClicked: false,
        state         : null
    };

    componentDidMount() {
        let {id, rootStore} = this.props;

        if (!this.state.state) {
            rootStore.stateStore.findPK(id)
                .then(state => {
                    this.setState({
                        state         : state,
                        proceedClicked: state.started
                    });
                    return state;
                });

        }
    }


    handleProceedClicked = () => {
        this.setState({
            proceedClicked: true
        })
    };

    render() {

        let {skipProceed = false}   = this.props;
        let {state, proceedClicked} = this.state;

        if (!proceedClicked && !skipProceed) {
            return (
                <View>
                    <ProceedButton onPress={this.handleProceedClicked} title="Proceed"/>
                </View>
            );
        }

        if (!state) {
            return <View/>;
        }

        return (
            <View>
                <View>
                    <QuestionContainer questions={state.Questions}/>
                </View>
                {
                    state.loaded &&
                    state.completed &&
                    <View>
                        <View>
                            <Text>Made It!!!</Text>
                            <Text>{state.NextStateId}</Text>
                            {/*<RecommendationContent recommendations={state.Recommendations}/>*/}
                        </View>

                        {
                            // state.NextStateId &&
                            // <View>
                            //     <StateContainer id={state.NextStateId}
                            //                     skipProceed={state.Recommendations.length === 0}/>
                            // </View>
                        }
                    </View>
                }
            </View>
        );
    }
}