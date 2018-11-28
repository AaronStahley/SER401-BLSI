import React from 'react';
import {Button, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

export default class ProceedButton extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {render: true};
    }
    render() {
        if(this.state.render) {
            return(<Button onPress={() => {
                    this.setState({render: false})
                    if (this.props.onPress){
                        this.props.onPress(this.props.parent);
                    }                   
                    this.props.parent.forceUpdate(); //Update conversation screen to move on
                }}
                color={Colors.proceedButton} 
                buttonStyle={styles.proceedButton} 
                title={this.props.title} />);
        }
        else {
            return(null);
        }    
    }
}

const styles = StyleSheet.create({
    proceedButton: {
        alignContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 0
    }
});