import React from 'react';
import {View,Text} from 'react-native';
import QuestionContainer from "../question/QuestionContainer";
import {observer} from "mobx-react/native";
import NextStateContainer from "./NextStateContainer";
import RecommendationContainer from "../recommendation/RecommendationContainer";
import ProceedButton from "../ui/ProceedButton";
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
        return (
            <View>
                <View>
                    <RecommendationContainer state={state} finalRecommendation={state.StateIdNextGood === null && state.StateIdNextBad === null} goodResult={true}/>
                </View>
                {
                    state.Questions.length > 0 &&
                    <View>
                        {
                            (!proceedClicked && state.Recommendations.length !== 0) &&
                            <ProceedButton 
                                title={'Proceed'} 
                                onPress={this.handleProceedClicked}
                            />
                        }
                        {
                            (proceedClicked || state.Recommendations.length === 0) &&
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
                }
                {
                    (state.Questions.length === 0 && type === "good") &&
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
