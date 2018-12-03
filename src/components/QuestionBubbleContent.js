import React from 'react';
import { View, Text, StyleSheet, Dimensions, Picker, SectionList, YellowBox} from 'react-native';
import CheckBox from './question/CheckBox';
import Textfield from './TextField';
import Colors from '../constants/Colors';

const { width, height} = Dimensions.get('window');

export default class QuestionBubbleContent extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {             
            init: true,  
            length: 0,
            completedCount: 0,     
        };
    } 

    componentDidUpdate() {
        if (this.state.completedCount == this.state.length) {
            this.state.completedCount++; //Prevent from reentering when updating

            this.props.onComplete(this.props.parent); //Run function presented in parent
            this.props.parent.forceUpdate(); //Update conversation screen to move on
        }
    }

    setDynamicState(name, value) {
        this.state[name] = value;
    }

    getDynamicState(name) {
        return this.state[name];
    }

    getPickerAnswers(answers) {
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

    createQuestionType(question, index) {    
        let length = Object.keys(question.answers).length; 
        if (question.type == 'textfield') {
            return(<Textfield 
                keyboardType={'numeric'} 
                label={question.answers[0].prompt}/>);
        }
        else if (question.type == 'checkbox') {
            return(this.createCheckBox(question, index));
        }     
    }

    createCheckBox(question, index) {
        let length = Object.keys(question.answers).length; 
        switch(length) {
            case 1: //create checkbox                
                let name = 'checkbox_' + index;
                if(this.state.init) {
                    this.setDynamicState(name, false);
                }                 
                    
                return(<CheckBox
                    title={question.answers[0].text}
                    onPress= {() => {
                        this.setDynamicState(name, !this.getDynamicState(name));
                        this.forceUpdate();
                        if (!this.getDynamicState(name)) {
                            this.state.completedCount++;
                        }
                    }}
                    checked={this.state[name]}/>);
                               
            case 2: //Create yes/no buttons
                    //To return buttons to vertical mode, remove container

                let name1 = 'checkbox_' + index; //make name for checkbox value
                let name2 = 'checkbox2_' + index; //make name for checkbox2 value
                if(this.state.init) {
                    this.setDynamicState(name1, false); //create checkbox1 state object
                    this.setDynamicState(name2, false); //create checkbox2 state object
                }                  

                return(
                <View style={styles.container}>  
                    <CheckBox 
                    checkedColor = {Colors.questionCheckBoxChecked}
                    uncheckedColor= {Colors.questionCheckBoxUnchecked}
                    text={ question.answers[0].text}
                    onPress= {() => {
                        this.setDynamicState(name1, !this.getDynamicState(name1));
                        this.setDynamicState(name2, false);
                        this.forceUpdate();
                        if (this.getDynamicState(name1)) {
                            this.state.completedCount++;
                        }
                    }}                        
                    checked={this.state[name1]}/>

                    <CheckBox 
                    checkedColor = {Colors.questionCheckBoxChecked} 
                    uncheckedColor= {Colors.questionCheckBoxUnchecked}
                    text={question.answers[1].text}
                    onPress= {() => {
                        this.setDynamicState(name2, !this.getDynamicState(name2));
                        this.setDynamicState(name1, false);
                        this.forceUpdate();
                        if (this.getDynamicState(name2)) {
                            this.state.completedCount++;
                        }
                    }}
                    checked={this.state[name2]}/> 
                </View>);
                
            default: //Create Dropdown

                let picker = 'picker_' + index; //make name for checkbox value
                let pickerSelected = 'picker_' + index + 'selected';
                if(this.state.init) {
                    this.setDynamicState(picker, ''); //create checkbox1 state object
                    this.setDynamicState(picker, ''); //create checkbox1 state object
                }
                
                return (<View style={styles.answerContainer}>
                    <Picker
                        mode={"dropdown"}
                        style={styles.picker}
                        selectedValue={this.getDynamicState(picker)}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setDynamicState(picker, itemValue);
                            this.setDynamicState(pickerSelected, true); //mark as selected
                            this.forceUpdate();
                            if (this.getDynamicState(pickerSelected)) {                                
                                this.state.completedCount++;
                            }
                        }}>
                        {this.getPickerAnswers(question.answers)}
                    </Picker>
                </View>);
        }
    }

    createQuestionContent(props) {
        let length = Object.keys(props.questions).length;
        let sectionList = [];
        for(let x = 0; x < length; x++) {
            sectionList[x] = { //To make center question circle change stretch to center
                title: <View style={[styles.container, {flexDirection: 'row'}]}>                                       
                <Text style={styles.icon}>{(x + 1)}</Text>  
                <Text style={{padding: 5}}>{'  ' + props.questions[x].question }</Text>      
                </View>,
                data: [ <View style={[styles.container, ]}>{this.createQuestionType(props.questions[x], x)}</View>]
            };
        }
        this.state.init = false;
        this.state.length = length;
        return sectionList;
    }

    render() {
        width = Dimensions.get("window").width;
        height = Dimensions.get("window").height;

        return (
            <SectionList
                SectionSeparatorComponent={({leadingItem}) => leadingItem ? <View style={styles.seperator}></View> : <View/>}
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
  icon           : {    //Used for the recommendation side of createImage()
    backgroundColor: Colors.questionNumberBorder,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    maxHeight: height,
    maxWidth: width,
  }, 
  container      : { //Used at the top layer of the component aka SectionList
    flex: 1,
    flexDirection: "column",
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
  picker         : {
    flex: 1,
    backgroundColor: Colors.questionPickerFill,
    //color: "#000" //For some reason this was throwing an error on IOS
  },
  separator      : {
    paddingTop: 1,
    borderRadius: 50,
    marginBottom: 5,
    marginTop: 5,
    flex: 1,
    backgroundColor: "#000"
  }
});