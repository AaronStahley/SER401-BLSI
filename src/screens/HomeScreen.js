import React from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Button, Dimensions} from 'react-native';
import {Card} from 'react-native-elements'
import {inject, observer} from 'mobx-react/native'
import {widthPercentageToDP as widthDP, listenOrientationChange, removeOrientationListener} from 'react-native-responsive-screen'

import HTMLView from 'react-native-htmlview';

@inject("rootStore")
@observer
export default class HomeScreen extends React.Component {

    state = {
        algorithms: []
    };

    componentDidMount() {
        listenOrientationChange(this);
        this.props.rootStore.algorithmStore.getOrFindAll()
            .then(res => {
                this.setState({
                    algorithms: res
                });
            })
    }

    componentWillUnmount() {
        removeOrientationListener();
    }
    
    render() {
        const {algorithms} = this.state;
        const {navigate}   = this.props.navigation;

        return (

            <ScrollView style={styles.container}>
                <View style={setViewStyle()}>
                    {
                        algorithms.map(algorithm =>

                            <Card
                                key={algorithm.Id} 
                                title={algorithm.Name} 
                                containerStyle={setAlgContainerStyle()}>
                                <Text style={{marginBottom: 10}}>
                                    {algorithm.ShortDescription}
                                </Text>
                                <View style={styles.buttonContiner}>
                                    <TouchableOpacity style={styles.button} onPress={() => navigate('AlgDescription', {algorithm: algorithm})}>
                                        <Text style={styles.buttonText}>Info</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => navigate('Conversation', {algorithm: algorithm})}>
                                        <Text style={styles.buttonText}>Start</Text>
                                    </TouchableOpacity>
                                </View>
                            </Card>
                        )
                    }
                </View>
            </ScrollView>
        );
    }
}

setViewStyle = function() {
    if (Dimensions.get('window').width > 500) {
        return {
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center'
        }
    }
    else {
        return {
            flexWrap: 'wrap'
        }
    }
}

setAlgContainerStyle = function() {
    if (Dimensions.get('window').width > 500) {
        return {
            width: widthDP('45%'),
            flexGrow: 1
        }
    }
    else {
        return {
            flex: 1
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff'
    },
    titleText: {
        fontSize    : 20,
        marginBottom: 30,
    },
    descriptionText: {
        marginBottom: 10
    },
    button: {
        flex: 1,
        backgroundColor: '#ee3e41',
        borderWidth: 0,
        borderRadius: 5,
        alignItems: 'center',
        margin: 5
    },
    buttonText:{
        color: '#fff',
        fontSize: 16,
        margin: 5
    },
    buttonContiner:{
        flexDirection: 'row',

    },bodyText:{
        fontSize: 16,
        marginBottom: 15,
        borderRadius: 5
    }
});
