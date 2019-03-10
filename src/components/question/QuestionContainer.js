import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Colors from '../../common/Colors';
import Question from "./Question";
import Images from "../../common/Images";
import {inject, observer} from "mobx-react/native";

@inject("rootStore")
@observer
export default class QuestionContainer extends React.Component {

    getAnswer = (question) => {
        return this.props.state.QuestionAnswers.find(questionAnswer => questionAnswer.QuestionId === question.Id);
    };


    render() {
        let {state} = this.props;

        if (state.Questions.length === 0) {
            return <View/>;
        }

        return (
            <View style={styles.mainContainer}>
                <View style={styles.bubble}>
                    {
                        state.Questions.map((question, index) => (
                            <View key={question.Id}>
                                <Question question={question} answer={this.getAnswer(question)} number={index + 1}/>

                                {
                                    (index + 1 !== state.Questions.length) &&
                                    <View style={styles.separator}/>
                                }
                            </View>
                        ))
                    }
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={Images.questionIcon}/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    mainContainer : {
        //Main container that holds the userIcon and the textbubble.
        flexDirection : "row",
        flex          : 1,
        justifyContent: "flex-end"
    },
    bubble        : {
        backgroundColor  : Colors.questionBubble,
        borderColor      : Colors.recommendationIconBorder,
        borderStyle      : "solid",
        borderRadius     : 10,
        borderWidth      : 1,
        paddingTop       : 5,
        paddingBottom    : 5,
        paddingHorizontal: 10,
        marginBottom     : 10,
        width            : '80%',
    },
    imageContainer: {
        backgroundColor: Colors.questionIcon,
        paddingTop     : 5,
        paddingBottom  : 5,
        borderRadius   : 100 / 2,
        marginLeft     : 5,
        width          : 40,
        height         : 40,
        maxHeight      : 40,
        maxWidth       : 40,

    },
    image         : {
        width     : "100%",
        height    : "100%",
        resizeMode: "contain"
    },
    separator     : {
        paddingTop     : 1,
        borderRadius   : 50,
        marginBottom   : 15,
        marginTop      : 15,
        backgroundColor: Colors.separator
    }
});