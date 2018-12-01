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
        this.props.rootStore.algorithmStore.findAll()
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
          
                                <HTMLView style={styles.descriptionText} value={algorithm.Description} />
                                <View style={styles.buttonContiner}>
                                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AlgDescription', {algorithm:algorithm})}>
                                        <Text style={styles.buttonText}>Info</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Conversation', {algorithm:algorithm})}>
                                        <Text style={styles.buttonText}>Start</Text>
                                    </TouchableOpacity>
                                </View>
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
    container: {
        flex           : 1,
        backgroundColor: '#fff',
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 300,
      padding: 15,
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ccc',
      backgroundColor: '#f2f2f2'
	}
});

