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
        proceedClicked: false
    };

    componentDidMount() {
        let {state} = this.props;

        this.setState({
            proceedClicked: state.started
        });
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
                    <RecommendationContainer state={state} finalRecommendation={state.StateIdNextGood === null && state.StateIdNextBad === null}/>
                </View>

                {
                    state.Questions.length > 0 &&
                    <View>
                        {
                            (!proceedClicked && state.Recommendations.length !== 0) &&
                            <ProceedButton title={'Proceed'} onPress={this.handleProceedClicked}/>

                        }

                        {
                            (proceedClicked || state.Recommendations.length === 0) &&
                            <View>
                                <QuestionContainer state={state}/>
                                {
                                    state.NextStateId &&
                                    <NextStateContainer nextStateId={state.NextStateId} path={state.getPath()}/>
                                }
                            </View>
                        }
                    </View>
                }

            </View>
        );
    }
}