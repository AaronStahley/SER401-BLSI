import React from 'react';
import {Button} from 'react-native';
import Colors from '../constants/Colors';

const { width, height} = Dimensions.get('window');

export default class ProceedButton extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {render: true};
    }

    render() {
        width = Dimensions.get("window").width;
        height = Dimensions.get("window").height;

        if(this.state.render) {
            return(<Button onPress={() => {this.setState({render: false});}}
                color={Colors.proceedButton} 
                buttonStyle={styles.proceedButton} 
                title={this.props.title} />);
        }
        else {
            return(null);
        }
    }
}