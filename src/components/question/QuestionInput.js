import React from 'react';
import {View, StyleSheet,ActionSheetIOS,} from 'react-native';
import CheckBox from './CheckBox';
import Colors from '../../common/Colors';
import {Col, Grid} from "react-native-easy-grid";
import {observer} from "mobx-react/native";
import NumberField from "../ui/NumberField";
import { Dropdown } from 'react-native-material-dropdown';




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

        let {question} = this.props;

        for(let i = 0; i < question.Options.length; i++) {

            if(question.Options[i].Label === selectedOptionLabel){
                this.props.question.Answer.QuestionOptionId = question.Options[i].Id;
            }
        }
    };

    /**
     * Since the handleSelection drop down is handled different for a check box
     * and a dropdown, needed to make a second method to handle the check box.
     * @param selectedOptionID
     * @author Aaron Stahley
     */
    handleSelctionBox = (selectedOptionID) => {
        this.props.question.Answer.QuestionOptionId = selectedOptionID;

    }

    handleNumberChange = (number) => {
        let {question} = this.props;

        if (number) {
            let option = question.convertNumberToOption(number === '-' ? -1 : number);
            if (option) {
                question.Answer.QuestionOptionId = option.Id;
                question.Answer.TextAnswer       = number;
            } else {
                question.Answer.TextAnswer = null;
            }
        } else {
            question.Answer.TextAnswer = null;
        }
    };

    showActionSheet = () => {
        let {question} = this.props;

        ActionSheetIOS.showActionSheetWithOptions({
                options: question.Options.label,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
            },
            (buttonIndex) => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
            });
    };

    render() {
        let {question} = this.props;

        switch (question.TypeKey) {
            case  "binary":
                return (
                    <Grid>
                        {
                            question.Options.map(option => (
                                <Col key={option.Id}>
                                    <CheckBox
                                        option={option}
                                        onClick={this.handleSelctionBox}
                                        selected={question.Answer.QuestionOptionId === option.Id}
                                    />
                                </Col>
                            ))
                        }
                    </Grid>
                );
            case  "select":
                return (
                    <View style={styles.dropDownWrap}>
                        <Dropdown
                            style={styles.dropDown}
                            label='Select A Value'
                            data={question.Options.map(option => ({value: option.Label}))}
                            onChangeText={this.handleSelectionDropdown}
                        />
                    </View>
                );
            default:
                return (
                    <NumberField
                        keyboardType={'numeric'}
                        propmt={question.Prompt}
                        value={question.Answer.TextAnswer}
                        onChange={this.handleNumberChange}
                    />
                );
        }


    }
}

const styles = StyleSheet.create({
    root     : { //Used at the top layer of the component aka SectionList
        flex         : 1,
        flexDirection: "column",
        paddingTop   : 5,
        paddingBottom: 5,
    },
    container: { //Used at the top layer of the component aka SectionList
        flex         : 1,
        flexDirection: "column",
        paddingTop   : 5,
        paddingBottom: 5,
    },
    icon     : {    //Used for the recommendation side of createImage()
        backgroundColor  : Colors.questionNumberBorder,
        paddingTop       : 5,
        paddingBottom    : 5,
        paddingHorizontal: 10,
        borderRadius     : 25,
        width            : "100%",
        height           : "100%",
        maxHeight        : 30,
        maxWidth         : 30,
        color            : 'white'
    },

    dropDownWrap: {
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight:10,
        borderColor: "black",
        borderStyle: "solid",
    },
    dropDown       : {
        flex           : 1,
    },
});