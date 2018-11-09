import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, SectionList} from 'react-native';
import Colors from '../constants/Colors';

export default class MessageBubble extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * This function is used to decide the structure of the line, 
     * whether a recommendation, question, or default message.
     * @param {type, image, content} props 
     */
    createMessageBubble(props) {
        switch(props.type) {
            case "recommendation":
                return ({
                    title: this.createBubble(props),
                    data: [this.createIcon(props)]
                });

            case "question":
                return ({
                    title: this.createIcon(props),
                    data: [this.createBubble(props)]
                });

            default:
                return ({
                    title: <View></View>,
                    data: [this.createBubble(props)]
                });
        } 
    }

    /**
     * This function is used to decide the style and return the image to 
     * createMessageBubble().
     * @param {type, image, content} props 
     */
    createIcon(props) {
        switch(props.type) {
            case "recommendation":
                return(<View style={styles.recommendationImage}>
                    <Image
                    style={styles.image}
                        source={props.image}
                    />
                </View>);

            case "question":
                return(<View style={styles.questionImage}>
                    <Image
                    style={styles.image}
                        source={props.image}
                    />
                </View>);
        }
    }

    /**
     * This function is used to decide the style of the bubbles, add content provided, 
     * and return the image to createMessageBubble().
     * @param {type, image, content} props 
     */
    createBubble(props) {
        switch(props.type) {
            case "recommendation":
                return(<View style={[styles.recommendationBubble]}>{props.content}</View>);

            case "question":
                return(<View style={[styles.questionBubble]}>{props.content}</View>);

            default:
                return(<View style={[styles.bubble]}>{props.content}</View>);
        }      
    }

    render() {
        return (
            <SectionList style={styles.container} horizontal={true}
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
                        sections= {[this.createMessageBubble(this.props)]}
                        keyExtractor={(item, index) => item + index} 
                    /> 
        );
    }
}

const styles = StyleSheet.create({
  questionBubble: { //Used for question side of createBubble()
    backgroundColor: Colors.questionBubble,
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 15,
    maxWidth: 4 *(Dimensions.get("window").width) / 5,
    marginLeft: 5,
    marginRight: 10
  },
  recommendationBubble: { //Used for the recommendation side of createBubble()
    backgroundColor: Colors.recommendationBubble,
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 15,
    maxWidth: 4 *(Dimensions.get("window").width) / 5,
    marginLeft: 10,
    marginRight: 5
  },
  bubble: { //Used for the default messages. May be usefull for notification of patient stability
    backgroundColor: Colors.bubble,
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 15,
    maxWidth: 19 * (Dimensions.get("window").width)/ 20,
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
    marginLeft: 10,
    marginRight: 5,
    maxHeight: 50,
    maxWidth: 50,
  },
  recommendationImage: {    //Used for the recommendation side of createImage()
    backgroundColor: Colors.recommendationIcon,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 10,
    maxHeight: 50,
    maxWidth: 50,
  }, 
  image: { //Used to format the image
    maxWidth: 40,
    maxHeight: 40,
    alignContent: 'center'

  },
  container: { //Used at the top layer of the component aka SectionList
    paddingTop: 5,
    paddingBottom: 5,
    maxWidth: Dimensions.get("window").width,
  }
});