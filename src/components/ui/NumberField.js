import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Colors from '../../common/Colors';

export default class NumberField extends React.Component {

    handleChangeText = (value) => {
        if (!isNaN(value)) {
            this.props.onChange((value * 1));
        }
        else if (value === '-') {
            this.props.onChange(value);
        }
        else {
            this.props.onChange(null);
        }
    };

    render() {
        let {prompt, keyboardType, value, onChange} = this.props;
        return (
            <View style={styles.textInputContainer}>
                <TextInput style={styles.input}
                           underlineColorAndroid='#0000'
                           placeholder={'please enter a number'}
                           keyboardType={keyboardType}
                           baseColor={Colors.questionBubble}
                           textColor={'#000'}
                           value={!value ? "" : value + ""}
                           onChangeText={this.handleChangeText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInputContainer   : {
        flex             : 1,
        flexDirection    : "row",
        backgroundColor  : Colors.questionBubble,
        paddingHorizontal: 5,
        paddingTop       : 5,
        paddingBottom    : 5,
        borderColor      : Colors.questionCheckBoxBorder,
        borderWidth      : 1,
        borderRadius     : 2,
    },
    textInput            : {
        flex             : 1,
        flexDirection    : 'row',
        backgroundColor  : Colors.questionBubble,
        paddingHorizontal: 5,
    }
});