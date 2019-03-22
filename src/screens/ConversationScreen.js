import React from 'react';
import {ScrollView,View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import Colors from '../common/Colors';
import {observer, inject} from 'mobx-react/native';
import NextStateContainer from "../components/state/NextStateContainer";
import {widthPercentageToDP as widthDP} from "react-native-responsive-screen";
import {AppLoading} from "expo";
import StartOverButton from "../components/navigation/StartOverButton";

let {height, width} = Dimensions.get("window");

@inject('rootStore')
@observer
export default class ConversationScreen extends React.Component {
    scrollView;

    constructor() {
        super();
        this.state = {
            isLoading: true,
            layout   : {
                height: height,
                width : width
            }
        };
    }


    componentDidMount() {
        let {navigation} = this.props;
        const algorithm  = navigation.getParam('algorithm', null);

        this.setState({algorithm: algorithm, isLoading: true});

        this.props.rootStore.createAlgorithmRootStore(algorithm)
            .then(() => {
                this.delay()
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {navigation} = this.props;
        const algorithm  = navigation.getParam('algorithm', null);
        if (this.state.algorithm !== algorithm) {

            this.setState({algorithm: algorithm, isLoading: true});
            this.props.rootStore.createAlgorithmRootStore(algorithm)
                .then(() => {
                   this.delay()
                })
        }

    }

    //Allows the activity icon to display for a min of 300ms
    //Doing to makes it look better vizualy. 
    delay() { 
        setTimeout(function() { 
            this.setState({isLoading: false});

        }.bind(this), 300);
    }


    _onLayout = event => {

        this.setState({
            layout: {
                height: event.nativeEvent.layout.height,
                width : event.nativeEvent.layout.width
            }
        });
    };

    render() {
        let {navigation} = this.props;
        const algorithm  = navigation.getParam('algorithm', null);


        if (this.state.isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator 
                        style={styles.activityIndicator}
                        size="large" 
                        color={Colors.PCH_RED} />
                </View> 
            );
        }
        
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
                <NextStateContainer
                    nextStateId={algorithm.StateIdStart}
                />
            </ScrollView>);
    }


    static navigationOptions = ({navigation}) => ({
        headerRight: <StartOverButton/>
    });
}

const setConvoStyle = function () {
    if (Dimensions.get('window').width > 1000) {
        return {
            paddingTop   : 10,
            paddingBottom: 50,
            width        : widthDP('95%'),
            maxWidth     : widthDP('95%')
        }
    } else if (Dimensions.get('window').width > 500) {
        return {
            paddingTop   : 10,
            paddingBottom: 50,
            width        : widthDP('95%'),
            maxWidth     : widthDP('95%'),

        }
    } else {
        return {
            paddingTop   : 10,
            paddingBottom: 50,
            width        : widthDP('95%'),
            maxWidth     : widthDP('95%'),
        }
    }
}

const styles = StyleSheet.create({
    loadingContainer: { 
        flex: 1,
        backgroundColor: 'white'
        
    },
    activityIndicator: { 
        marginTop: 20
    },
    root           : {
        backgroundColor: Colors.conversationBackground,
        alignSelf      : 'stretch',
        paddingLeft    : 10
    },
    container      : {
        paddingTop   : 10,
        paddingBottom: 50,

    },
    startOverButton: {
        color       : Colors.startOverButton,
        paddingRight: 8,
        paddingTop  : 5,
        fontSize    : 18
    }
});

