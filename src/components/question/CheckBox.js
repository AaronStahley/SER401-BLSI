import React from 'react';
import {StyleSheet} from 'react-native';
import {CheckBox as CB} from "react-native-elements";
import Colors from '../../constants/Colors';
import {observer} from "mobx-react/native";

@observer
export default class CheckBox extends React.Component {

    handleClick = () => {
        let {option, onClick} = this.props;
        onClick(option.Id);
    };

    render() {

        let {option} = this.props;

        return (
            <CB
                containerStyle={styles.checkBoxButton}
                checkedColor={Colors.questionCheckBoxChecked}
                uncheckedColor={Colors.questionCheckBoxUnchecked}
                title={option.Value}
                onPress={this.handleClick}
                checked={option.Selected}
            />
        );
    }
}

const styles = StyleSheet.create({
    container     : { //Used at the top layer of the component aka SectionList
        flex         : 1,
        flexDirection: "row",
        paddingTop   : 5,
        paddingBottom: 5,
    },
    checkBoxButton: {
        flex             : 1,
        backgroundColor  : Colors.questionBubble,
        paddingBottom    : 5,
        paddingTop       : 5,
        paddingHorizontal: 5,
        borderColor      : Colors.questionCheckBoxBorder,
        borderWidth      : 2,
    }
});