import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Colors from '../../../../common/Colors';
import QuestionInput from "./QuestionInput";
import {observer} from "mobx-react/native";

@observer
export default class Question extends React.Component {

    render() {
        let {question, answer, number} = this.props;

        return (
            <View style={styles.mainContainer}>
                <View style={styles.icon}>
                    <Text>{number}</Text>
                </View>
                <View style={styles.questionInputTexContainer}>
                    <Text style={{paddingBottom: 5}}>{question.text}</Text>
                    <QuestionInput
                        question={question}
                        answer={answer}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer            : { //Main container that holds the Icon and the textbubble.
        flexDirection : "row",
        flex          : 1,
        justifyContent: "space-between",
        alignItems    : "stretch"
    },
    questionInputTexContainer: {
        flexDirection : "column",
        flex          : 1,
        justifyContent: "flex-start",
        alignItems    : "stretch",
    },
    icon                     : { //Icon on the right hand side of the screen. PCH logo.
        backgroundColor: Colors.questionNumberBorder,
        borderRadius   : 100 / 2,
        width          : "100%",
        height         : "100%",
        maxHeight      : 30,
        maxWidth       : 30,
        borderStyle    : "solid",
        borderWidth    : 1,
        borderColor    : Colors.numberBubleBorder,
        alignItems     : "center",
        justifyContent : "center",
        marginRight    : 20
    }
});