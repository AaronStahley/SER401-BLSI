import React from 'react';
import {ScrollView, StyleSheet, Text, View, Button, SectionList, FlatList, Image} from 'react-native';
import {Card} from 'react-native-elements'
import {inject, observer} from 'mobx-react/native'
import {ExpoLinksView} from '@expo/samples';
import AlgorithmBox from "../components/AlgorithmBox";
import Colors from "../constants/Colors";

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
                                <Text style={{marginBottom: 10}}>
                                    {algorithm.Description}
                                </Text>
                                <Button
                                    onPress={() => this.props.navigation.navigate('Conversation')}
                                    color='#ee3e41'
                                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    title='Start'/>
                            </Card>
                        )
                    }
                    <Card
                        title='NOM BLSI'>
                        <Text style={{marginBottom: 10}}>
                            Nonoperative management of blunt liver and spleen injury
                            in children (NOMBLSI) helps prevent unnecessary surgeries in children when
                            there may or may not be internal bleeding.
                        </Text>
                        <Button
                            onPress={() => this.props.navigation.navigate('Conversation')}
                            color='#ee3e41'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='Start'/>
                    </Card>
                    <Card
                        title='Other Algorithm'>
                        <Text style={{marginBottom: 10}}>
                            Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                            Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                        </Text>
                        <Button
                            onPress={() => navigate('Questions')}
                            color='#ee3e41'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='Start'/>
                    </Card>
                    <Card
                        title='Other Algorithm'>
                        <Text style={{marginBottom: 10}}>
                            Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                            Algorithm Description Algorithm Description Algorithm Description Algorithm Description
                        </Text>
                        <Button
                            onPress={() => navigate('Questions')}
                            color='#ee3e41'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='Start'/>
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
    button   : {
        backgroundColor: '#ee3e41',
        width          : 300,
        height         : 45,
        borderWidth    : 0,
        borderRadius   : 5
    }
});

