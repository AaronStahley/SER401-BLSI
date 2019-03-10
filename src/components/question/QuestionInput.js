import React from 'react';
import {StyleSheet, ActionSheetIOS,} from 'react-native';
import CheckBox from './CheckBox';
import Colors from '../../common/Colors';
import {Col, Grid} from "react-native-easy-grid";
import {observer} from "mobx-react/native";
import NumberField from "../ui/NumberField";
import {Dropdown} from 'react-native-material-dropdown';


@observer
export default class QuestionInput extends React.Component {

    /**
     * Finds the option label from the one selected and then finds its
     * Id and outputs sets the answer to that id
     * Had to change this to change the dropdown from react picker.
     * @param selectedOptionLabel The label from the question prop.
     * @author Aaron Stahley.
     **/
    handleSelectionDropdown = (selectedOptionLabel) => {

        let {question, answer} = this.props;

        answer.QuestionOptionId = null;
        answer.NumberAnswer     = null;

        for (let i = 0; i < question.Options.length; i++) {
            if (question.Options[i].Label === selectedOptionLabel) {
                answer.QuestionOptionId = question.Options[i].Id;
                break;
            }
        }
        answer.save();
    };

    /**
     * Since the handleSelection drop down is handled different for a check box
     * and a dropdown, needed to make a second method to handle the check box.
     * @param selectedOptionID
     * @author Aaron Stahley
     */
    handleSelctionBox = (selectedOptionID) => {
        let {answer} = this.props;

        answer.QuestionOptionId = selectedOptionID;
        answer.NumberAnswer     = null;
        answer.save();

    };

    handleNumberChange = (number) => {
        let {question, answer} = this.props;

        answer.QuestionOptionId = null;
        answer.NumberAnswer     = null;

        if (number) {
            let option = question.convertNumberToOption(number === '-' ? -1 : number);
            if (option) {
                answer.QuestionOptionId = option.Id;
                answer.NumberAnswer     = number;
            } else {
                answer.QuestionOptionId = null;
                answer.NumberAnswer     = null;
            }
        }

        answer.save();
    };

    showActionSheet = () => {
        let {question} = this.props;

        ActionSheetIOS.showActionSheetWithOptions({
                options               : question.Options.label,
                cancelButtonIndex     : CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
            },
            (buttonIndex) => {
                this.setState({clicked: BUTTONS[buttonIndex]});
            });
    };

    render() {
        let {question, answer} = this.props;
        let count              = question.Options.length;

        switch (question.TypeKey) {
            case  "picklist":
                if (count === 2) {
                    return (
                        <Grid>
                            {
                                question.Options.map(option => (
                                    <Col key={option.Id}>
                                        <CheckBox
                                            option={option}
                                            inputContainerStyle={{borderBottomColor: 'transparent'}}
                                            onClick={this.handleSelctionBox}
                                            selected={answer.QuestionOptionId === option.Id}
                                        />
                                    </Col>
                                ))
                            }
                        </Grid>
                    );
                } else {
                    return (
                        <Dropdown
                            label='Select A Value'
                            data={question.Options.map(option => ({value: option.Label}))}
                            onChangeText={this.handleSelectionDropdown}
                            inputContainerStyle={styles.dropDown}
                        />
                    );
                }
            default:
                return (
                    <NumberField
                        keyboardType={'numeric'}
                        propmt={question.Prompt}
                        value={answer.NumberAnswer}
                        onChange={this.handleNumberChange}
                    />
                );
        }
    }
}

const styles = StyleSheet.create({
    dropDown: {
        borderColor      : Colors.dropDownBorder,
        borderWidth      : 1,
        borderBottomWidth: 1,
        width            : '100%',
    }
});