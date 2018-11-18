import React from 'react';
import { View, Text, StyleSheet, Dimensions, Picker, SectionList} from 'react-native';
import Svg, { Circle, Text as TextSvg} from 'react-native-svg';
import {CheckBox} from "react-native-elements";
import CheckBoxCustom from '../components/CheckBox';
import Textfield from '../components/TextField';
import Colors from '../constants/Colors';

const { width, height} = Dimensions.get('window');

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
            case 0:
                return(
                <Textfield
                    onChangeText={() => {
                    }}
                />)
            case 1: //create checkbox
                return(
                <CheckBoxCustom
                    text={question.answers[0].text}
                    onPress= {() => {
                        this.setState({checked: !state.checked})
                    }}
                    checked={state.checked}
                />);
            case 2: //Create yes/no buttons
                    //To return buttons to vertical mode, remove container
                return(
                <View style={styles.container}>  
                        <CheckBox 
                        containerStyle={styles.checkBoxButton}
                        checkedColor = {Colors.questionCheckBoxChecked}
                        uncheckedColor= {Colors.questionCheckBoxUnchecked}
                        title={ question.answers[0].text}
                        onPress= {() => {
                            this.setState({checked: !this.state.checked});
                            this.state.checked2 = false;
                            this.setState({checked2: false});
                        }}
                        checked={this.state.checked}
                        />

                        <CheckBox 
                        containerStyle={styles.checkBoxButton}
                        checkedColor = {Colors.questionCheckBoxChecked} 
                        uncheckedColor= {Colors.questionCheckBoxUnchecked}
                        title={ question.answers[1].text}
                        onPress= {() => {
                            this.setState({checked2: !this.state.checked2});
                            this.state.checked = false;
                            this.setState({checked: false});
                        }}
                        checked={this.state.checked2}
                    />
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
            sectionList[x] = { //To make center question circle change stretch to center
                title: <View style={[styles.container, {alignItems: 'stretch'}]}> 
                    <Svg
                        height='22'
                        width='22'
                        style={{alignContent: "center"}}
                    >       
                        <TextSvg 
                            x = '11'
                            y = '11'
                            fill='#000'                
                            fontSize = "16"
                        >
                        {x}
                        </TextSvg>                
                        <Circle
                            cx='11'
                            cy='11'
                            stroke={Colors.questionCircleBorder}
                            strokeWidth='2'
                            fill = {Colors.questionCircleFill}
                            r='9'   
                        />
                                                                    
                    </Svg>
                    
                <Text style={{ color: '#000' }}>{x /*TODO: Remove after number fixed*/}</Text>
                <Text> {props.questions[x].question} </Text>               
                </View>,
                data: [ <View style={[styles.container, {alignItems: 'stretch'}]}>{this.createQuestionType(props.questions[x])}</View>]
            };
        }

        return sectionList;
    }

    render() {
        width = Dimensions.get("window").width;
        height = Dimensions.get("window").height;

        return (
            <SectionList  
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
  checkBoxButton: {
      flex: 1,
      backgroundColor: Colors.questionBubble,
      paddingBottom: 5,
      paddingTop: 5,
      paddingHorizontal: 5,
      borderColor: Colors.questionCheckBoxBorder,
      borderWidth: 2,
      height: height / 20,
  },
  container: { //Used at the top layer of the component aka SectionList
    flex: 1,
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 5,
  },
  answerContainer: {
    paddingBottom: 2,
    paddingTop: 2,
    paddingHorizontal: 2,
    marginHorizontal: 10,
    height: height/20,
    flex: 1,
    backgroundColor: Colors.questionPickerBorder,
    borderRadius: 2
  },
  picker: {
    flex: 1,
    backgroundColor: Colors.questionPickerFill,
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