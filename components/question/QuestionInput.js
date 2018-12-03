import React, {Fragment} from 'react';
import {View, Text, StyleSheet, Dimensions, Picker, SectionList, YellowBox} from 'react-native';
import CheckBox from './CheckBox';
import Textfield from '../TextField';
import Colors from '../../constants/Colors';
import {Col, Grid} from "react-native-easy-grid";
import {observer} from "mobx-react/native";

@observer
export default class QuestionInput extends React.Component {

    handleSelection = (selectedOptionId) => {
        let {question} = this.props;
        question.Options.forEach(option => {
            option.Selected = (selectedOptionId * 1) === option.Id ? !option.Selected : false;
        });
    };


    render() {
        let {question} = this.props;

        switch (question.Type) {
            case  "binary":
                return (
                    <Grid>
                        {
                            question.Options.map(option => (
                                <Col key={option.Id}>
                                    <CheckBox
                                        option={option}
                                        onClick={this.handleSelection}
                                    />
                                </Col>
                            ))
                        }
                    </Grid>
                );
            case  "select":
                return (
                    <View style={styles.pickerWrapper}>
                        <Picker
                            mode={"dropdown"}
                            style={styles.picker}
                            selectedValue={question.Selected ? question.Selected.Id : null}
                            onValueChange={this.handleSelection}>
                            <Picker.Item
                                label={"Select A Value..."}
                                value={null}
                            />
                            {
                                question.Options.map(option => (
                                    <Picker.Item
                                        key={option.Id}
                                        label={option.Value}
                                        value={option.Id}
                                    />
                                ))
                            }
                        </Picker>
                    </View>
                );
            default:
                return (
                    <Textfield
                        keyboardType={'numeric'}
                        label={question.Prompt}
                        value={question.Answer}
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
        backgroundColor  : Colors.questionPickerBorder,
    },
    picker       : {
        flex           : 1,
        backgroundColor: Colors.questionPickerFill,
        color          : "#000000"
    },
});