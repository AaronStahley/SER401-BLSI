import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Colors from '../../../../common/Colors';
import Images from "../../../../common/Images";
import {inject, observer} from "mobx-react/native";
import Recommendation from "./Recommendation";

@inject("rootStore")
@observer
export default class RecommendationContainer extends React.Component {

    render() {
        let {state, finalRecommendation, goodResult} = this.props;

        if (state.Recommendations.length === 0) {
            return <View/>;
        }
        return (
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={Images.recommendationIcon}
                    />
                </View>
                <View style={setTextBubble(finalRecommendation, goodResult)}>
                    {
                        state.Recommendations.map((recommendation, index) => (
                                <View key={recommendation.id}>
                                    <Recommendation
                                        recommendation={recommendation}
                                        number={index + 1}
                                    />

                                    {
                                        ((index + 1) !== state.Recommendations.length) &&
                                        <View style={styles.separator}/>
                                    }
                                </View>
                            )
                        )
                    }
                </View>
            </View>
        );
    }
}

const setTextBubble = function(final, goodResult) {
    if (final && goodResult) {
        return {
            backgroundColor  : Colors.recommendationBubbleGood,
            borderColor      : Colors.recommendationIconBorderGood,
            borderStyle      : "solid",
            borderRadius     : 10,
            borderWidth      : 1,
            paddingTop       : 5,
            paddingBottom    : 5,
            paddingHorizontal: 10,
            marginBottom     : 10,
            width            : '80%',
        }
    }
    else if (final && !goodResult) {
        return {
            backgroundColor  : Colors.recommendationBubbleBad,
            borderColor      : Colors.recommendationIconBorderBad,
            borderStyle      : "solid",
            borderRadius     : 10,
            borderWidth      : 1,
            paddingTop       : 5,
            paddingBottom    : 5,
            paddingHorizontal: 10,
            marginBottom     : 10,
            width            : '80%',
        }
    }
    else {
        return {
            backgroundColor  : Colors.recommendationBubble,
            borderColor      : Colors.recommendationIconBorder,
            borderStyle      : "solid",
            borderRadius     : 10,
            borderWidth      : 1,
            paddingTop       : 5,
            paddingBottom    : 5,
            paddingHorizontal: 10,
            marginBottom     : 10,
            width            : '80%',
        }
    }
}

const styles = StyleSheet.create({
    mainContainer : { //Main container that holds the userIcon and the textbubble.
        flexDirection : "row",
        flex          : 1,
        justifyContent: "flex-start"
    },
    textBubble    : { //Used for question side of createBubble()
        backgroundColor  : Colors.recommendationBubble,
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
    imageContainer: { //Contianer for the image displays the border around image.
        backgroundColor: Colors.recommendationIcon,
        paddingTop     : 5,
        paddingBottom  : 5,
        borderRadius   : 100 / 2,
        marginRight    : 5,
        width          : 40,
        height         : 40,
        maxHeight      : 40,
        maxWidth       : 40,
        borderColor    : Colors.recommendationIconBorder,
        borderStyle    : "solid",
        borderWidth    : 1.5,
    },
    image         : { //Used to format the image
        flex      : 1,
        width     : "100%",
        height    : "100%",
        resizeMode: "contain",
    },
    separator     : { //Sepreates multiple conversation text atributes.
        paddingTop     : 1,
        borderRadius   : 50,
        marginBottom   : 5,
        marginTop      : 5,
        backgroundColor: "#000"
    }
});