import React from 'react';
import { View, Text, StyleSheet, Dimensions, Picker, SectionList} from 'react-native';
import CheckBox from '../components/CheckBox';
import Textfield from '../components/TextField';
import Colors from '../constants/Colors';

const { width, height} = Dimensions.get('window');

export default class QuestionBubbleContent extends React.Component {
    state= {answer: '', checked: false, checked2: false};

    constructor(props) {
        super(props);
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

    createQuestionType(question) {    
        let length = Object.keys(question.answers).length; 
        if (question.type == 'textfield') {
            return(<Textfield keyboardType={'numeric'} label={question.answers[0].prompt}/>);
        }
        else if (question.type == 'checkbox') {
            return(this.createCheckBox(question));
        }     
    }

    createCheckBox(question) {
        let length = Object.keys(question.answers).length; 
        switch(length) {
            case 1: //create checkbox              
                return(<CheckBox
                    title={ question.answers[0].text}
                    onPress= {() => {
                        this.setState({checked: !this.state.checked});
                        this.state.checked2 = false;
                        this.setState({checked2: false});
                    }}
                    checked={this.state.checked}                      
                />);
                               
            case 2: //Create yes/no buttons
                    //To return buttons to vertical mode, remove container
                return(
                <View style={styles.container}>  
                        <CheckBox 
                        checkedColor = {Colors.questionCheckBoxChecked}
                        uncheckedColor= {Colors.questionCheckBoxUnchecked}
                        text={ question.answers[0].text}
                        onPress= {() => {
                            this.setState({checked: !this.state.checked});
                            this.state.checked2 = false;
                            this.setState({checked2: false});                            
                        }}                        
                        checked={this.state.checked}
                        />

                        <CheckBox 
                        checkedColor = {Colors.questionCheckBoxChecked} 
                        uncheckedColor= {Colors.questionCheckBoxUnchecked}
                        text={question.answers[1].text}
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
                data: [ <View style={[styles.container, ]}>{this.createQuestionType(props.questions[x])}</View>]
            };
        }
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
  icon: {    //Used for the recommendation side of createImage()
    backgroundColor: Colors.questionNumberBorder,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    maxHeight: height,
    maxWidth: width,
  }, 
  container: { //Used at the top layer of the component aka SectionList
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
  picker: {
    flex: 1,
    backgroundColor: Colors.questionPickerFill,
    color: "#000"
  },
  seperator: {
    paddingTop: 1,
    borderRadius: 50,
    marginBottom: 5,
    marginTop: 5,
    flex: 1,
    backgroundColor: "#000"
  }
});