import React from 'react';
import { View, Text, StyleSheet, Dimensions, SectionList} from 'react-native';
import { Icon } from 'react-native-vector-icons';
import Colors from '../constants/Colors';

const { width, height} = Dimensions.get('window');

export default class RecommendationBubbleContent extends React.Component {

    constructor(props) {
        super(props);
    } 

    createRecommendationType(recommendation) {    
        if (typeof(recommendation.link) == 'string') {
            return(null);
        }
        else {
            return(null);
        }     
    }

    createRecommendationContent(props) {
        let length = Object.keys(props.recommendations).length;
        let sectionList = [];
        for(let x = 0; x < length; x++) {
            sectionList[x] = { //To make center question circle change stretch to center
                title: <View style={[styles.container, {flexDirection: 'row'}]}>                                       
                <Text >{'• ' + props.recommendations[x].task}</Text>  
                </View>,
                data: [ <View style={[styles.container]}>{this.createRecommendationType(props.recommendations[x])}</View>]
            };
        }
        return sectionList;
    }

    render() {
        width = Dimensions.get("window").width;
        height = Dimensions.get("window").height;

        return (
            <View style={styles.container}>
                <Text style={styles.icon}>
                    {this.props.header}
                </Text>
                            
                
                <SectionList
                    SectionSeparatorComponent={({leadingItem}) => leadingItem ? <View style={styles.seperator}></View> : <View/>}
                    renderItem={({item, index, section}) => 
                        <View key={index}>
                            {item}
                        </View>}
                    renderSectionHeader={({section: {title}}) =>
                        <View>
                            {title}
                        </View>}                
                    sections= {this.createRecommendationContent(this.props)}
                    keyExtractor={(item, index) => item + index} 
                />                
            </View>
        );
    }
}

const styles = StyleSheet.create({
  icon       : { //Used for the recommendation side of createImage()
    backgroundColor: Colors.recommendationHeaderBorder,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 5,
    maxHeight: height,
    maxWidth: width,
    },
    container: { //Used at the top layer of the component aka SectionList
        flex: 1,
        flexDirection: "column",
        paddingTop: 5,
        paddingBottom: 5,
    },
    separator: {
        paddingTop: 1,
        borderRadius: 50,
        marginBottom: 10,
        flex: 1,
        backgroundColor: "#000"
    }
});