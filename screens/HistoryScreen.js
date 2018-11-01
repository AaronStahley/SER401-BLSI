import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import HeaderStyle from '../components/HeaderStyle';
import AreaChartTemplate from '../components/AreaChartTemplate'

export default class HistoryScreen extends React.Component {
    static navigationOptions = HeaderStyle;    
    //const chart = AreaChartTemplate();
    render() {
        const data = [5.6, 6.8, 6.2, 6.4, 6.9, 7.1];
        return (
            <ScrollView style={styles.container}>
                <View style={styles.welcomeContainer}>
                    <Text>
                        History Screen
                    </Text>
                    <Text/>
                    <Text style={{alignItems: 'center', marginTop: 100}}>
                        Hemoglobin Over Time
                    </Text>
                </View>      
                
                <AreaChartTemplate 
                    data={data}
                    yaxis={'Hb Levels'}
                    xaxis={'# of Checks'}
                /> 
            </ScrollView>         
        );
    }
}

//data={data}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    }
});
