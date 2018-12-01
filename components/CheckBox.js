import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {CheckBox as CB} from "react-native-elements";
import Colors from '../constants/Colors';

const { width, height} = Dimensions.get('window');

export default class CheckBox extends React.Component {
   

    constructor(props) {
        super(props);
        this.state = {checked: false};
    }

    render() {
        width = Dimensions.get("window").width;
        height = Dimensions.get("window").height;

        return(<View style={styles.container}>
            <CB 
            containerStyle={styles.checkBoxButton}
            checkedColor = {Colors.questionCheckBoxChecked}
            uncheckedColor= {Colors.questionCheckBoxUnchecked}
            title={ this.props.text}
            onPress= {this.props.onPress}
            checked={this.props.checked} //TODO: Change value to stay in own class
            />
            </View>);
    }
}

const styles = StyleSheet.create({
    container: { //Used at the top layer of the component aka SectionList
        flex: 1,
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 5,
    },
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