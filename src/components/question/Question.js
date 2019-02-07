import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import Colors from '../../common/Colors';
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
                    <Col size={2}>
                        <View style={styles.icon}><Text>{number}</Text></View>
                    </Col>
                    <Col size={12}>
                        <Text>{question.Question}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col size={2}/>
                    <Col size={8}>
                        <QuestionInput
                            question={question}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const styles = StyleSheet.create({
    icon                 : {    //Used for the recommendation side of createImage()
        backgroundColor  : Colors.questionNumberBorder,
        paddingTop       : 5,
        paddingBottom    : 5,
        paddingHorizontal: 10,
        borderRadius     : 25,
        width            : "100%",
        height           : "100%",
        maxHeight        : 30,
        maxWidth         : 30,
        borderStyle      : "solid",
        borderWidth      : 1,
        borderColor      : Colors.numberBubleBorder
    }
});