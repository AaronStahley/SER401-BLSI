import React from 'react';
import { View, Text, StyleSheet, Dimensions, Picker, SectionList} from 'react-native';
import {CheckBox} from "react-native-elements";
import Svg, { Circle } from 'react-native-svg';
import Colors from '../constants/Colors';

export default class QuestionBubbleContent extends React.Component {
    state= {answer: ''};

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
                return (<Picker
                style={{backgroundColor: '#fff', borderColor: '#f00'}}
                    selectedValue={this.state.answer}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({answer: itemValue});
                    }}>
                    {this.getAnswers(question.answers)}
                </Picker>);
        }
    }

    createQuestionContent(props) {
        let length = Object.keys(props.questions).length;
        let sectionList = [];
        for(let x = 0; x < length; x++) {
            sectionList[x] = {
                title: <Svg
                    height='20'
                    width='20'
                    style={{alignContent: "center"}}
                >
                    <Text style={{ color: '#f00' }}>{x}</Text>

                    <Circle
                        cx='5'
                        cy='5'
                        borderRadius='2'
                        r='20'
                        stroke='#f00'
                    />  
                     
                </Svg>,
                data: [<Text> {props.questions[x].question} </Text>,
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
                SectionSeparatorComponent={({leadingItem}) => leadingItem ? <Text>Hello</Text> : null}
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
                renderSeperator={<Text>Hello</Text> }
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
    paddingBottom: 5,
    paddingTop: 5,
    paddingHorizontal: 15,
    flex: 1,
    width: 20
  },
  container: { //Used at the top layer of the component aka SectionList

    paddingTop: 5,
    paddingBottom: 5,
    alignContent: "center"
  },
  picker: {
      height: 50,
      width: 100
  }
});