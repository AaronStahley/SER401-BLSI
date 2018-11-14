import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import {CheckBox} from "react-native-elements";
import { Icon } from 'react-native-vector-icons';
import Colors from '../constants/Colors';

export default class QuestionBubbleContent extends React.Component {

    constructor(props) {
        super(props);
    } 

    createQuestionType(props) {
        switch(Object.keys(props.answer).length) {
            case 1: //create checkbox
                return(<CheckBox 
                    style={styles.checkButton}
                    onPress= {() => {
                        this.setState({checked: !this.state.checked})
                    }}
                    checked={this.state.checked}
                />);
            case 2: //Create yes/no buttons
                return(<View>
                    <CheckBox 
                    style={styles.checkButton}
                    onPress= {() => {
                        this.setState({checked: !this.state.checked})
                    }}
                    checked={this.state.checked}
                />
                <CheckBox 
                    style={styles.checkButton}
                    onPress= {() => {
                        this.setState({checked: !this.state.checked})
                    }}
                    checked={this.state.checked}
                />
                </View>);
                
            default: //Create Dropdown

        }
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
                {this.createQuestionType(this.props)}
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
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    flex: 'space-between'
  }
});