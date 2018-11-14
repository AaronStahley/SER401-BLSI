import React from 'react';
import { View, Text, StyleSheet, Dimensions, Picker} from 'react-native';
import {CheckBox} from "react-native-elements";
import Svg, { Circle } from 'react-native-svg';
import Colors from '../constants/Colors';

export default class QuestionBubbleContent extends React.Component {

    constructor(props) {
        super(props);
    } 

    getAnswers(props) {
        let length = Object.keys(props.answer).length;
        let items = [];
        for(let x = 0; x < length; x++) {
            items[x] = <Picker.Item
                label={props.answer[x].text}
                value={prop.answer[x].value}
                />;
        }
     return items;
    }

    createQuestionType(props) {
        let length = Object.keys(props.answer).length;
        switch(length) {
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
                <Picker stlye={styles.picker}
                selectedValue={this.state.answer}
                onValueChange={(value, index) => {
                    this.setState({answer: value});
                }}>
                {this.getAnswers(this.props)}
                </Picker>
        }
    }

    render() {
        width = Dimensions.get("window").width;
        height = Dimensions.get("window").height;

        return ( //add iterationto icon
            <View style={styles.container}>
                <Svg
                    height='20'
                    width='20'
                    style={{justifyContent: "center"}}
                >
                    <Circle
                        borderRadius='2'
                        r='20'
                        stroke='#f00'
                    />  
                    <Text>{this.props.index}</Text>  
                </Svg> 

                <Text>
                    {this.props.text}
                </Text>

                {this.createQuestionType(this.props)}
            </View>
        );
    }
}

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

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
    flex: 1,
    width: 20
  },
  container: { //Used at the top layer of the component aka SectionList
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
    justifyContent: 'space-evenly'
  },
  picker: {
      height: 50,
      width: 100
  }
});