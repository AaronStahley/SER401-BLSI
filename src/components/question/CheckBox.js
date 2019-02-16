import React from 'react';
import {StyleSheet} from 'react-native';
import {CheckBox as CB} from "react-native-elements";
import Colors from '../../common/Colors';
import {observer} from "mobx-react/native";

@observer
export default class CheckBox extends React.Component {

    handleClick = () => {
        let {option, onClick} = this.props;
        onClick(option.Id);
    };

    render() {

        let {option, selected} = this.props;

        return (
            <CB
                containerStyle={styles.checkBoxButton}
                checkedColor={Colors.questionCheckBoxChecked}
                uncheckedColor={Colors.questionCheckBoxUnchecked}
                title={option.Label}
                onPress={this.handleClick}
                checked={selected}
                textStyle={{fontSize: 12}}
            />
        );
    }
}

const styles = StyleSheet.create({
  checkBoxButton: {
    flex: 1,
    backgroundColor: Colors.questionBubble,
    paddingBottom: 5,
    paddingTop: 5,
    paddingHorizontal: 5,
    borderColor: Colors.questionCheckBoxBorder,
    borderWidth: 1
  }
});