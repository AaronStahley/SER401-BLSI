import React from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {Card} from 'react-native-elements'
import {inject, observer} from 'mobx-react/native'

import HTMLView from 'react-native-htmlview';

@inject("rootStore")
@observer
export default class HomeScreen extends React.Component {

    state = {
        algorithms: []
    };

    componentDidMount() {
        this.props.rootStore.algorithmStore.getOrFindAll()
            .then(res => {
                this.setState({
                    algorithms: res
                });
            })
    }

    render() {
        const {algorithms} = this.state;
        const {navigate}   = this.props.navigation;

        return (

            <ScrollView style={styles.container}>
                <View>
                    {
                        algorithms.map(algorithm =>
                            <Card
                                key={algorithm.Id}
                                title={algorithm.Name}>
                                <Text style={{marginBottom: 10}}>
                                    {algorithm.ShortDescription}
                                </Text>
                                <Button
                                    onPress={() => this.props.navigation.navigate('AlgDescription', {algorithm: algorithm})}
                                    color='#b3b3b3'
                                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    title='Learn More'/>
                                <Button
                                    onPress={() => this.props.navigation.navigate('Conversation', {algorithm: algorithm})}
                                    color='#ee3e41'
                                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    title='Start'/>
                            </Card>
                        )
                    }
                     <Card
                         title='Recommendations'>
                         <Text style={{marginBottom: 10}}>
                            TEST - Click to go to the recommendations page
                       </Text>
                         <Button
                             onPress={() => this.props.navigation.navigate('Recommendation')}
                            color='#b3b3b3'
                             buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                             title='Detailed Recommendations'/>
                     </Card>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container         : {
        flex           : 1,
        backgroundColor: '#fff',
    },
    titleText         : {
        fontSize    : 20,
        marginBottom: 30,
    },
    button            : {
        backgroundColor: '#ee3e41',
        width          : 300,
        height         : 45,
        borderWidth    : 0,
        borderRadius   : 5
    },
    algorithmContainer: {
        flexDirection  : 'row',
        justifyContent : 'space-between',
        width          : 300,
        padding        : 15,
        marginBottom   : 10,
        borderWidth    : 1,
        borderRadius   : 5,
        borderColor    : '#ccc',
        backgroundColor: '#f2f2f2'
    }
});

