import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Colors from '../../common/Colors';
import Images from "../../common/Images";
import {Col, Grid} from "react-native-easy-grid";
import {inject, observer} from "mobx-react/native";
import Recommendation from "./Recommendation";

@inject("rootStore")
@observer
export default class RecommendationContainer extends React.Component {


    render() {
        let {recommendations} = this.props;

        if (recommendations.length === 0) {
            return <View/>;
        }

        return (
            <Grid>
                <Col size={1}>
                    <View style={styles.icon}>
                        <Image
                            style={styles.image}
                            source={Images.recommendationIcon}
                        />
                    </View>
                </Col>
                <Col size={9}>
                    <View style={styles.bubble}>
                        {
                            recommendations.map((recommendation, index) => (
                                    <View key={recommendation.Id}>
                                        <Recommendation
                                            recommendation={recommendation}
                                            number={index + 1}
                                        />
                                        {
                                            ((index + 1) !== recommendations.length) &&
                                            <View style={styles.separator}/>
                                        }
                                    </View>
                                )
                            )
                        }
                    </View>
                </Col>
            </Grid>
        );
    }
}


const styles = StyleSheet.create({
    bubble   : { //Used for question side of createBubble()
        backgroundColor  : Colors.recommendationBubble,
        borderRadius     : 10,
        paddingTop       : 5,
        paddingBottom    : 5,
        paddingHorizontal: 15,
        marginLeft       : 0,
        marginRight      : 10,
        marginBottom     : 10,
        width            : '100%',
    },
    icon     : { //Used for question side of createImage()
        backgroundColor: Colors.recommendationIcon,
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
        left           : 0
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