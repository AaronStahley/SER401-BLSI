import React from 'react';
import {View, StyleSheet,Text,  Picker, ActionSheetIOS,TouchableOpacity} from 'react-native';
import ModalSelector from 'react-native-modal-selector'
import ModalDropdown from 'react-native-modal-dropdown';
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

        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Fruits' },
            { key: index++, label: 'Red Apples' },
            { key: index++, label: 'Cherries' },
            { key: index++, label: 'Cranberries' },
            { key: index++, label: 'Pink Grapefruit' },
            { key: index++, label: 'Raspberries' },
            { key: index++, section: true, label: 'Vegetables' },
            { key: index++, label: 'Beets' },
            { key: index++, label: 'Red Peppers' },
            { key: index++, label: 'Radishes' },
            { key: index++, label: 'Radicchio' },
            { key: index++, label: 'Red Onions' },
            { key: index++, label: 'Red Potatoes' },
            { key: index++, label: 'Rhubarb' },
            { key: index++, label: 'Tomatoes' }
        ];

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

                        {/*Example of a modal selector looks not great but may function. */}
                        {/*<ModalSelector*/}
                            {/*data={question.Options.map(option => ({key: option.id, label:  option.Label}))}*/}
                            {/*initValue="Select Item"*/}
                            {/*onChange={this.handleSelection} />*/}

                        {/*Material UI still looks the best just am having some trouble getting it to work correctly. */}
                        <Dropdown
                            label='Select A Value...'
                            data={question.Options.map(option => ({value: option.Id}))}
                            onChangeText={this.handleSelection}
                        />


                        {/*Example of a modal Drop down also looks kind tacky.  */}
                        {/*<ModalDropdown options={['option 1', 'option 2']}/>*/}


                        {/* Old picker that needs to be replaced. */}
                        {/*<Picker*/}
                            {/*mode={"dropdown"}*/}
                            {/*style={styles.picker}*/}
                            {/*selectedValue={question.Answer.QuestionOptionId}*/}
                            {/*onValueChange={this.handleSelection}>*/}
                            {/*<Picker.Item*/}
                                {/*label={"Select A Value..."}*/}
                                {/*value={null}*/}
                            {/*/>*/}
                            {/*{*/}
                                {/*question.Options.map(option => (*/}
                                    {/*<Picker.Item*/}
                                        {/*key={option.Id}*/}
                                        {/*label={option.Label}*/}
                                        {/*value={option.Id}*/}
                                    {/*/>*/}
                                {/*))*/}
                            {/*}*/}
                        {/*</Picker>*/}

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
        //backgroundColor: "#fff",
        //color          : "black"
    },
});