import React from 'react';
import {View, Dimensions, StyleSheet, TextInput} from 'react-native';
import Colors from '../constants/Colors';

const { width, height} = Dimensions.get('window');

export default class TextField extends React.Component {

    constructor(props) {
        super(props);
        this.state= {value: ''};
    }

    render() {
        let {value} = this.state; 
        return(<View style={styles.textfieldContainer}>
                <TextInput style={[styles.textfield]}
                underlineColorAndroid = '#0000'
                placeholder={this.props.label}
                keyboardType={this.props.keyboardType}
                baseColor={Colors.questionBubble}
                textColor={'#000'}
                value={value}
                onChangeText={(value) => {
                    this.setState({value: value})
                }} 
                />
            </View>);
    }
}

const styles = StyleSheet.create({
    textfieldContainer: {
    flex: 1, 
    flexDirection: "row",
    backgroundColor: Colors.questionBubble,
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: Colors.questionCheckBoxBorder,
    borderWidth: 2,
    borderRadius: 2,
    marginHorizontal: 10,
    height: height/20,
  },
  textfield: {
    flex: 1, 
    flexDirection: 'row',
    backgroundColor: Colors.questionBubble,
    paddingHorizontal: 5,
  }
});