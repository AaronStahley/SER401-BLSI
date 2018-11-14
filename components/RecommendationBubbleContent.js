import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import {CheckBox} from "react-native-elements";
import { Icon } from 'react-native-vector-icons';
import Colors from '../constants/Colors';

export default class RecommendationBubbleContent extends React.Component {

    constructor(props) {
        super(props);
    } 

    getRecommendationTasks(props) {
        let length = Objects.keys(this.props.tasks).length;
        let sectionList = [];
        let section = (title, data) => {
            return({'title': title, data: data});
        }

        for(let x = 0; x < length; x++) {
            sectionList[x] = new Section(
                <Text>'\u2022'</Text>,
                <Text> {this.props.tasks[x]} </Text>
            );
        }

        return sectionList;
    }

    render() {
        width = Dimensions.get("window").width;
        height = Dimensions.get("window").height;

        return (
            <View style={styles.container}>
                <Icon />
                <Text>
                    {this.props.text}
                </Text>
                {this.createRecommendationType(this.props)}

                <View> 
                <SectionList  style={styles.container}
                        renderItem={({item, index, section}) => 
                            <View key={index}>
                                {item}    
                            </View>    
                        }
                        renderSectionHeader={({section: {title}}) =>
                            <View >
                                {title}
                            </View>
                        }
                        sections= {this.getRecommendationTasks(this.props)}
                        keyExtractor={(item, index) => item + index} 
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

  icon: {    //Used for the recommendation side of createImage()
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
  iconContent: { //Used to format the image
    width: 40,
    height: 40,
    resizeMode: "contain"
  },
  checkButton: {
    paddingBottom: 5,
    paddingTop: 5,
    paddingHorizontal: 15,
    flex: "flex-end",
    width: 20
  },
  container: { //Used at the top layer of the component aka SectionList
    horizontal: true,
    paddingTop: 5,
    paddingBottom: 5,
    flex: 'space-between'
  }
});