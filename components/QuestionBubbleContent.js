import React from 'react';
import { View, Text, StyleSheet, Dimensions, Picker, SectionList} from 'react-native';
import {CheckBox} from "react-native-elements";
import Svg, { Circle } from 'react-native-svg';
import Colors from '../constants/Colors';

export default class QuestionBubbleContent extends React.Component {
    state= {answer: '', checked: false, checked2: false};

    constructor(props) {
        super(props);
    } 

    getAnswers(answers) {
        let length = Object.keys(answers).length;
        let items = [];
        for(let x = 0; x < length; x++) {
            items[x] = <Picker.Item
                key={answers[x].text}
                label={answers[x].text}
                value={answers[x].value}
                />;
        }
     return items;
    }

    createQuestionType(question) {
        let length = Object.keys(question.answers).length;
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
                return(<View >
                    <View style={styles.answerContainer}>
                        <CheckBox style={styles.checkButton}
                        onPress= {() => {
                            this.setState({checked: !this.state.checked})
                        }}
                        checked={this.state.checked}
                        />
                    </View>
                    <View >
                        <CheckBox style={styles.checkButton}
                        onPress= {() => {
                            this.setState({checked2: !this.state.checked2})
                        }}
                        checked={this.state.checked2}
                    />
                    </View>
                </View>);
                
            default: //Create Dropdown
                return (<View style={styles.answerContainer}>
                    <Picker
                        mode={"dropdown"}
                        style={styles.picker}
                        selectedValue={this.state.answer}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({answer: itemValue});
                        }}>
                        {this.getAnswers(question.answers)}
                    </Picker>
                </View>);
        }
    }

    createQuestionContent(props) {
        let length = Object.keys(props.questions).length;
        let sectionList = [];
        for(let x = 0; x < length; x++) {
            sectionList[x] = {
                title: <View></View>,
                data: [ <Svg
                    height='20'
                    width='20'
                    style={{alignContent: "center"}}
                >
                    <Text style={{ color: '#f00' }}>{x}</Text>
                    <Circle
                        cx='5'
                        cy='5'
                        borderRadius='50'
                        r='20'   
                    />
                </Svg>,
                <Text> {props.questions[x].question} </Text>,
                    <View>{this.createQuestionType(props.questions[x])}</View>
                ]
            };
        }

        return sectionList;
    }

    render() {
        width = Dimensions.get("window").width;
        height = Dimensions.get("window").height;

        return ( //TODO: fix seperator
            <SectionList  style={styles.container}
                SectionSeparatorComponent={({leadingItem}) => leadingItem ? <View style={styles.seperator}></View> : null}
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
                
                sections= {this.createQuestionContent(this.props)}
                keyExtractor={(item, index) => item + index} 
            /> 
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
    flex: 1,
    paddingBottom: 2,
    paddingTop: 2,
    paddingHorizontal: 2,
    backgroundColor: Colors.questionIcon,
  },
  container: { //Used at the top layer of the component aka SectionList
    paddingTop: 5,
    paddingBottom: 5,
    alignContent: 'space-between',
    flexDirection: "row"
  },
  answerContainer: {
    paddingBottom: 2,
    paddingTop: 2,
    paddingHorizontal: 2,
    height: height/20,
    flex: 1,
    backgroundColor: Colors.questionIcon,
    borderRadius: 2
  },
  picker: {
    flex: 1,
    backgroundColor: Colors.questionBubble,
    color: "#000"
  },
  pickerItem: {
      
  },
  seperator: {
    paddingTop: 1,
    borderRadius: 50,
    marginBottom: 5,
    marginTop: 5,
    flex: 1,
    backgroundColor: "#3339"
  }
});