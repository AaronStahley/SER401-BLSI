import React, {Fragment} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {CheckBox as CB} from "react-native-elements";
import Colors from '../constants/Colors';
import QuestionContent from "./QuestionBubbleContent";
import RecommendationContent from "./RecommendationBubbleContent";
import ProceedButton from "./ProceedButton";
import QuestionContainer from "./question/QuestionContainer";
import {inject} from "mobx-react/native";


@inject("rootStore")
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

        if (!state) {
            return <View></View>;
        }

        if (!proceedClicked && !skipProceed) {
            return (
                <View>
                    <ProceedButton onPress={this.handleProceedClicked} title="Proceed"/>
                </View>
            );
        }

        return (
            <View>
                <View>
                    <QuestionContainer questions={state.Questions}/>
                </View>
                {
                    state.completed &&
                    <Fragment>
                        <View>
                            <RecommendationContent recommendations={state.Recommendations}/>
                        </View>

                        {
                            state.NextStateId &&
                            <View>
                                <StateContainer id={state.NextStateId}
                                                skipProceed={state.Recommendations.length === 0}/>
                            </View>
                        }
                    </Fragment>
                }
            </View>
        );
    }
}