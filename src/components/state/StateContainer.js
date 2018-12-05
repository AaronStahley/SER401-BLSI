import React from 'react';
import {View} from 'react-native';
import QuestionContainer from "../question/QuestionContainer";
import {observer} from "mobx-react/native";
import NextStateContainer from "./NextStateContainer";
import RecommendationContainer from "../recommendation/RecommendationContainer";
import ProceedButton from "../ui/ProceedButton";

@observer
export default class StateContainer extends React.Component {

    state = {
        proceedClicked: false,
        currentState  : null
    };

    componentDidMount() {
        let {state} = this.props;

        if (!state.started || state.Recommendation.length === 0) {
            this.setState({
                proceedClicked: state.started
            });
        }
    }

    handleProceedClicked = () => {
        this.setState({
            proceedClicked: true
        })
    };

    render() {

        let {state}          = this.props;
        let {proceedClicked} = this.state;

        return (
            <View>
                <View>
                    <RecommendationContainer recommendations={state.Recommendations}/>
                </View>

                {
                    !proceedClicked &&
                    <ProceedButton title={'Proceed'} onPress={this.handleProceedClicked}/>

                }

                {
                    proceedClicked &&
                    <View>
                        <QuestionContainer questions={state.Questions}/>
                        {
                            state.NextStateId &&
                            <NextStateContainer nextStateId={state.NextStateId}/>
                        }
                    </View>
                }
            </View>
        );
    }
}