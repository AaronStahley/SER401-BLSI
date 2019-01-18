import React from 'react';
import {View, StyleSheet, Picker} from 'react-native';
import CheckBox from './CheckBox';
import Colors from '../../common/Colors';
import {Col, Grid} from "react-native-easy-grid";
import {observer} from "mobx-react/native";
import NumberField from "../ui/NumberField";
import { Dropdown } from 'react-native-material-dropdown';


@observer
export default class QuestionInput extends React.Component {

    handleSelection = (selectedOptionId) => {
        this.props.question.Answer.QuestionOptionId = selectedOptionId;
    };

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


    render() {
        let {question} = this.props;

        //Created temp data so that i can make sure the
        // material UI drop down is working and now need to
        // figure out how to integrate the DB data into it. fot some reason that is not working.
        let tempData = [{value: 'question1'}, {value: 'question2'}, {value: 'question3'}];

        switch (question.TypeKey) {
            case  "binary":
                return (
                    <Grid>
                        {
                            question.Options.map(option => (
                                <Col key={option.Id}>
                                    <CheckBox
                                        option={option}
                                        onClick={this.handleSelection}
                                        selected={question.Answer.QuestionOptionId === option.Id}
                                    />
                                </Col>
                            ))
                        }
                    </Grid>
                );
            case  "select":
                return (
                    <View style={styles.pickerWrapper}>

                        {/*Not sure how to get this to work. I have been messing around with it for a while
                            and it will display the content but cant find the properties to make it work
                            when you click on the option. Going to put the original picker in for now. - Aaron */}

                        {/*This displays the content but is not hooked up to record the option that was selected. */}
                        {/*<Dropdown*/}
                            {/*label='Select A Value...'*/}
                            {/*data={question.Options.map(option => ({value: option.Label}))}*/}
                        {/*/>*/}

                        <Picker
                            mode={"dialog"}
                            style={styles.picker}
                            selectedValue={question.Answer.QuestionOptionId}
                            onValueChange={this.handleSelection}>
                            <Picker.Item
                                label={"Select A Value..."}
                                value={null}
                            />
                            {
                                question.Options.map(option => (
                                    <Picker.Item
                                        key={option.Id}
                                        label={option.Label}
                                        value={option.Id}
                                    />
                                ))
                            }
                        </Picker>
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

    pickerWrapper: {
        paddingBottom    : 2,
        paddingTop       : 2,
        paddingHorizontal: 2,
        paddingVertical  : 2,
        borderRadius     : 4,
        backgroundColor  : '#fff',
    },
    picker       : {
        flex           : 1,
    },
});