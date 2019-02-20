import React from 'react';
import {ScrollView, StyleSheet, View, Text, Button, Alert, TouchableOpacity, Dimensions} from 'react-native';
import Colors from '../common/Colors';
import {observer} from 'mobx-react/native';
import NextStateContainer from "../components/state/NextStateContainer";
import {widthPercentageToDP as widthDP} from "react-native-responsive-screen";

var { height, width } = Dimensions.get("window");

@observer
export default class ConversationScreen extends React.Component {
    scrollView;
    constructor() {
        super();
        this.state = {
            layout: {
                height: height,
                width: width
            }
        };
    }
    _onLayout = event => {
    
        this.setState({
            layout: {
                height: event.nativeEvent.layout.height,
                width: event.nativeEvent.layout.width
            }
        });
    };

    static navigationOptions = ({navigation}) => ({
        headerRight: (
            <View >
                <TouchableOpacity onPress={() => Alert.alert(
                    'Are You Sure?',
                    'Do you want to start the algorithm from the start?',
                    [
                        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'Yes', onPress: () => navigation.navigate('Home')}

                    ])}>
                    <Text style={styles.startOverButton}>
                        Start Over
                    </Text>
                </TouchableOpacity>
            </View>
        )
    });

    render() {
        let {navigation} = this.props;
        const algorithm  = navigation.getParam('algorithm', null);

        return (
            <ScrollView
                onLayout={this._onLayout}
                style={styles.root}
                ref={ref => this.scrollView = ref}
                contentContainerStyle={setConvoStyle()}
                indicatorStyle={'default'}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    this.scrollView.scrollToEnd({animated: true});
                }}
            >
                <NextStateContainer nextStateId={algorithm.StateIdStart}/>
            </ScrollView>);
    }
}

const setConvoStyle = function() {
    if (Dimensions.get('window').width > 1000) {
        return {
            paddingTop   : 10,
            paddingBottom: 50,
            width        : widthDP('95%'),
            maxWidth     : widthDP('95%')
        }
    }
    else if (Dimensions.get('window').width > 500) {
        return {
            paddingTop   : 10,
            paddingBottom: 50,
            width: widthDP('95%'),
            maxWidth: widthDP('95%'),
            
        }
    }
    else {
        return {
            paddingTop   : 10,
            paddingBottom: 50,
            width: widthDP('95%'),
            maxWidth: widthDP('95%'),
        }
    }
}

const styles = StyleSheet.create({
    root               : {
        backgroundColor: Colors.conversationBackground,
        alignSelf     : 'stretch',
        paddingLeft  : 10
    },
    container        : {
        paddingTop   : 10,
        paddingBottom: 50,
        
    },
    startOverButton : {
        color       : Colors.startOverButton,
        paddingRight: 8,
        paddingTop  : 5,
        fontSize    : 18
    }
});

