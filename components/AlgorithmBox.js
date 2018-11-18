import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, SectionList} from 'react-native';
import Colors from '../constants/Colors';

export default class AlgorithmBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        width = Dimensions.get("window").width;
        height = Dimensions.get("window").height;

        return (
            <SectionList  horizontal={false}
                          renderItem={({item, index, section}) =>
                              <View key={index}>
                                  <Text>jdsfsdf</Text>
                              </View>
                          }
                          renderSectionHeader={({section: {title}}) =>
                              <View >
                                  {title}
                              </View>
                          }
                          sections= {[this.createAlgorithmBox(this.props)]}
                          keyExtractor={(item, index) => item + index}
            />
        );
    }
}
var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    questionBubble: { //Used for question side of createBubble()
        backgroundColor: Colors.questionBubble,
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 15,
        maxWidth: (4 * width / 5) - 5,
        marginLeft: 10,
        marginRight: 5
    },
    recommendationBubble: { //Used for the recommendation side of createBubble()
        backgroundColor: Colors.recommendationBubble,
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 15,
        maxWidth: (4 * width / 5) - 5,
        marginLeft: 5,
        marginRight: 10
    },
    bubble: { //Used for the default messages. May be usefull for notification of patient stability
        backgroundColor: Colors.bubble,
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 15,
        maxWidth: (19 * width / 20) - 5,
        marginLeft: 10,
        marginRight: 10
    },
    questionImage: {  //Used for question side of createImage()
        backgroundColor: Colors.questionIcon,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 50,
        marginLeft: 5,
        marginRight: 10,
        maxHeight: height,
        maxWidth: width,
    },
    recommendationImage: {    //Used for the recommendation side of createImage()
        backgroundColor: Colors.recommendationIcon,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 50,
        marginLeft: 10,
        marginRight: 5,
        maxHeight: height,
        maxWidth: width,
    },
    image: { //Used to format the image
        width: 40,
        height: 40,
        resizeMode: "contain"
    },
    container: { //Used at the top layer of the component aka SectionList
        paddingTop: 5,
        paddingBottom: 5,
        maxWidth: width,
        alignSelf: 'center'
    }
});