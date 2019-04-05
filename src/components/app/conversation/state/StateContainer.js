import React from 'react';
import {View,Text} from 'react-native';
import QuestionContainer from "../question/QuestionContainer";
import {observer} from "mobx-react/native";
import NextStateContainer from "./NextStateContainer";
import RecommendationContainer from "../recommendation/RecommendationContainer";
import ProceedButton from "../../../ui/ProceedButton";
import { withNavigation } from 'react-navigation';

@observer
class StateContainer extends React.Component {

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

        let {state,type}          = this.props;
        let {proceedClicked} = this.state;

        //(State is good and next states are the same)
        // or (State is bad and next states are null)
        const isFinalRecomm = (type === "good" &&
            state.state_id_next_good === state.state_id_next_bad) ||
            (state.state_id_next_good === null &&
            state.state_id_next_bad === null &&
            type !== "good");

        // Next states are null and state is good
        const renderDischargeButton = state.state_id_next_good === null && 
            state.state_id_next_bad === null &&
            type === "good";
        const renderProceed = !proceedClicked && !isFinalRecomm && state.Recommendations.length !== 0;    
        const renderQuestion = proceedClicked || state.Recommendations.length === 0;

        return (
            <View>
                <View>
                    <RecommendationContainer state={state} finalRecommendation={isFinalRecomm} goodResult={type === 'good'}/>
                </View>
                <View>
                    {
                        (renderProceed) &&
                        <ProceedButton 
                            title={'Proceed'} 
                            onPress={this.handleProceedClicked}
                        />
                    }
                    {
                        (renderQuestion) &&
                        <View>
                            <QuestionContainer state={state}/>
                            {
                                state.NextStateId &&
                                <NextStateContainer 
                                    nextStateType={state.NextStateType} 
                                    nextStateId={state.NextStateId} 
                                    path={state.getPath()}
                                />
                            }
                        </View>
                    }
                </View>                
                {
                    (renderDischargeButton) &&
                    <ProceedButton 
                        title={'Discharge'} 
                        onPress={() =>   this.props.navigation.navigate('Discharge')}
                    />
                }
            </View>
        );
    }
}

export default withNavigation(StateContainer);
