import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Textfield} from "react-native-material-textfield";
import Colors from '../constants/Colors';

const { width, height} = Dimensions.get('window');

export default class CheckBox extends React.Component {
    

    constructor(props) {
        super(props);
        this.state= {value: ''};
    }

    render() {
        width = Dimensions.get("window").width;
        height = Dimensions.get("window").height;

        return(<Textfield 
            value={this.props.value}
            onChangeText={(this.props.onChangeText)} //TODO: Change value to stay in own class
        />);
    }
}

const styles = StyleSheet.create({
  textfield: {
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