import React from 'react';
import {Textfield} from "react-native-material-textfield";
import Colors from '../constants/Colors';

const { width, height} = Dimensions.get('window');

export default class CheckBox extends React.Component {
    state= {value: ''};

    constructor(props) {
        super(props);
    }

    render() {
        width = Dimensions.get("window").width;
        height = Dimensions.get("window").height;

        return(<Textfield 
            value={this.state.value}
            onChangeText={(this.props.onChangeText)}
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