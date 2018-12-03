import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Colors from '../../constants/Colors';
import Question from "./Question";
import Images from "../../constants/Images";
import {Col, Grid} from "react-native-easy-grid";
import {inject, observer} from "mobx-react/native";

@inject("rootStore")
@observer
export default class QuestionContainer extends React.Component {


    render() {
        let {questions} = this.props;

        return (
            <Grid>
                <Col size={9}>
                    <View style={styles.bubble}>
                        {
                            questions.map((question, index) => (
                                    <View key={question.Id}>
                                        <Question
                                            question={question}
                                            number={index + 1}
                                        />
                                        {
                                            ((index + 1) !== questions.length) &&
                                            <View style={styles.separator}/>
                                        }
                                    </View>
                                )
                            )
                        }
                    </View>
                </Col>
                <Col size={1}>
                    <View style={styles.icon}>
                        <Image
                            style={styles.image}
                            source={Images.questionIcon}
                        />
                    </View>
                </Col>
            </Grid>
        );
    }
}


const styles = StyleSheet.create({
    bubble   : { //Used for question side of createBubble()
        backgroundColor  : Colors.questionBubble,
        borderRadius     : 10,
        paddingTop       : 5,
        paddingBottom    : 5,
        paddingHorizontal: 15,
        marginLeft       : 10,
        marginRight      : 5,
        marginBottom     : 10,
        width            : '100%',
    },
    icon     : { //Used for question side of createImage()
        backgroundColor: Colors.questionIcon,
        paddingTop     : 5,
        paddingBottom  : 5,
        paddingLeft    : 5,
        paddingRight   : 5,
        borderRadius   : 50,
        marginLeft     : 5,
        marginRight    : 10,
        width          : 40,
        height         : 40,
        maxHeight      : 40,
        maxWidth       : 40,
        position       : "absolute",
        right          : 0
    },
    image    : { //Used to format the image
        width     : "100%",
        height    : "100%",
        resizeMode: "contain"
    },
    separator: {
        paddingTop     : 1,
        borderRadius   : 50,
        marginBottom   : 5,
        marginTop      : 5,
        flex           : 1,
        backgroundColor: "#000"
    }
});