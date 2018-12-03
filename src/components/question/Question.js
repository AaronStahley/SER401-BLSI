import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Colors from '../../constants/Colors';
import Grid from "react-native-easy-grid/Components/Grid";
import Col from "react-native-easy-grid/Components/Col";
import Row from "react-native-easy-grid/Components/Row";
import QuestionInput from "./QuestionInput";
import {observer} from "mobx-react/native";

@observer
export default class Question extends React.Component {

    render() {
        let {question, number} = this.props;

        return (
            <Grid>
                <Row>
                    <Col size={1}>
                        <Text style={styles.icon}>{number}</Text>
                    </Col>
                    <Col size={9}>
                        <Text>{question.Question}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col size={2}/>
                    <Col size={8}>
                        <QuestionInput question={question}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const styles = StyleSheet.create({
    icon: {    //Used for the recommendation side of createImage()
        backgroundColor  : Colors.questionNumberBorder,
        paddingTop       : 5,
        paddingBottom    : 5,
        paddingHorizontal: 10,
        borderRadius     : 25,
        width            : "100%",
        height           : "100%",
        maxHeight        : 30,
        maxWidth         : 30,
        color            : 'white'
    },
});