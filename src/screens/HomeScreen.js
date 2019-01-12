import React from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Button, Dimensions} from 'react-native';
import {Card} from 'react-native-elements'
import {inject, observer} from 'mobx-react/native'

import HTMLView from 'react-native-htmlview';

var winWidth = Dimensions.get('window').width;
console.log('Window width: ' + winWidth);
var cardWidth = winWidth * 0.9;
if (winWidth > 500) {
    cardWidth = winWidth * 0.4;
}
console.log('Card width: ' + cardWidth);

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
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        algorithms.map(algorithm =>

                            <Card
                                key={algorithm.Id}
                                title={algorithm.Name}
                                containerStyle={styles.algorithmContainer}>
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
    },
    algorithmContainer: {
        width: cardWidth,
    }
});
