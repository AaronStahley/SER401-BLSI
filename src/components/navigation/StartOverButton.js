import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import {inject, observer} from "mobx-react/native";
import Colors from "../../common/Colors";

@inject('rootStore')
@observer
class StartOverButton extends React.Component {

    handleYes = () => {
        let {rootStore} = this.props;
        rootStore.questionAnswerStore.deleteAll();
    };

    handleNo = () => {
    };


    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => Alert.alert(
                    'Are You Sure?',
                    'Do you want to start the algorithm from the start?',
                    [
                        {text: 'No', onPress: this.handleNo, style: 'cancel'},
                        {text: 'Yes', onPress: this.handleYes}

                    ])}>
                    <Text style={styles.startOverButton}>
                        Start Over
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default StartOverButton;

const styles = StyleSheet.create({
    startOverButton: {
        color       : Colors.startOverButton,
        paddingRight: 8,
        paddingTop  : 5,
        fontSize    : 18
    }
});