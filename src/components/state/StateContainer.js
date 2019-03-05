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
    
    removeDuplicates(items){
        let stack = [];
        for(let x = 0; x < items.length; x++ ) {
            if (stack[items[x].Id] !== items[x].Id) {
                stack[items[x].Id] = items[x].Id;
            }
            else {
                items.splice(x, 1);
                x--;
            }
        }
        return items;
    }

    render() {

        let {state}          = this.props;
        let {proceedClicked} = this.state;

        return (
            <View>
                <View>
                    <RecommendationContainer recommendations={this.removeDuplicates(state.Recommendations)}/>
                </View>

                {
                    (!proceedClicked && state.Recommendations.length !== 0) &&
                    <ProceedButton title={'Proceed'} onPress={this.handleProceedClicked}/>

                }

                {
                    (proceedClicked || state.Recommendations.length === 0) &&
                    <View>
                        <QuestionContainer questions={this.removeDuplicates(state.Questions)}/>
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