import React from 'react';
import {CheckBox} from "react-native-elements";
import Colors from '../constants/Colors';

const { width, height} = Dimensions.get('window');

export default class CheckBox extends React.Component {
    state= {checked: false};

    constructor(props) {
        super(props);
    }

    render() {
        width = Dimensions.get("window").width;
        height = Dimensions.get("window").height;

        return(<CheckBox 
            containerStyle={styles.checkBoxButton}
            checkedColor = {Colors.questionCheckBoxChecked}
            uncheckedColor= {Colors.questionCheckBoxUnchecked}
            title={ this.props.text}
            onPress= {this.props.onPress}
            checked={this.state.checked}
        />);
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
      borderWidth: 2,
      height: height / 20,
  }
});