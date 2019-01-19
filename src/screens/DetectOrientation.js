import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

export default class App extends Component<{}> {
    constructor() {
        super();
        this.state = {orientation:''}
    }

    getOrientation = () => {
        if( this.refs.rootView ) {
            if( Dimensions.get('window').width < Dimensions.get('window').height ) {
                this.setState({orientation:'portrait'});
            } else {
                this.setState({orientation:'landscape'});
            }
        }
    }

    componentDidMount() {
        this.getOrientation();
        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
    }

    render() {
        return(
            <View ref="rootView" style = {[styles.container, {backgroundColor: (this.state.orientation=='portrait') ? '#FF0000' : '#FFFF00' }]}>
            <Text style = {styles.text }>{this.state.orientation.toUpperCase()}VIEW</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:(Platform.OS === 'ios' ) ? 20 : 0
    },

    text: {
        fontSize:40,
        color:'white',
    }
});