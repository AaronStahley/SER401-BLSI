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

        const isFinalRecomm = state.state_id_next_good === null && state.state_id_next_bad === null

        const renderDischargeButton = isFinalRecomm && type === "good";
        const renderProceed = !proceedClicked && !isFinalRecomm && state.Recommendations.length !== 0;    
        const renderQuestion = proceedClicked || state.Recommendations.length === 0;

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <RecommendationContainer state={state} finalRecommendation={isFinalRecomm} goodResult={type === 'good'}/>
                </View>
                <View style={{flex: 1}}>
                    {
                        (renderProceed) &&
                        <ProceedButton 
                            title={'Proceed'} 
                            onPress={this.handleProceedClicked}
                        />
                    }
                    {
                        (renderQuestion) &&
                        <View style={{flex: 1}}>
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
                        style={{flex: 1}}
                        title={'Discharge'} 
                        onPress={() =>   this.props.navigation.navigate('Discharge')}
                    />
                }
            </View>
        );
    }
}

export default withNavigation(StateContainer);
