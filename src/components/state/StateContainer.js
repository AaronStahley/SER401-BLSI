import React from 'react';
import {View} from 'react-native';
import QuestionContainer from "../question/QuestionContainer";
import {observer} from "mobx-react/native";
import ProceedContainer from "./ProceedContainer";
import RecommendationContainer from "../recommendation/RecommendationContainer";

@observer
export default class StateContainer extends React.Component {

    render() {

        let {state} = this.props;

        return (
            <View>
                <View>
                    <QuestionContainer questions={state.Questions}/>
                </View>
                {
                    state.completed &&
                    <View>
                        <View>
                            <RecommendationContainer recommendations={state.Recommendations}/>
                        </View>

                        {
                            state.NextStateId &&
                            <ProceedContainer nextStateId={state.NextStateId}
                                              skipProceed={state.Recommendations.length === 0}/>
                        }
                    </View>
                }
            </View>
        );
    }
}