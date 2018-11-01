import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import HeaderStyle from '../components/HeaderStyle';
import LineChartTemplate from '../components/LineChartTemplate'
import {Svg} from 'expo';
const {Rect} = Svg;

export default class HistoryScreen extends React.Component {
    static navigationOptions = HeaderStyle; 
       
    render() {
        const data = [5.6, 6.8, 6.2, 6.4, 6.9, 7.1, 6.95, 7.5];
        return (
            <ScrollView style={styles.container}>
                <View style={styles.welcomeContainer}>
                    <Text>
                        History Screen
                    </Text>                   
                </View>                      
                <View style={styles.welcomeContainer}>                                  
                     <Text 
                        style={{alignItems: 'center', marginTop: 100, marginBottom: -30}}
                        svg={{fontSize: 20, fill: '#000'}}
                    >
                        Hemoglobin Over Time
                    </Text>
                    <LineChartTemplate 
                    data={data}
                    yaxis={'Hb Levels'}
                    xaxis={'# of Checks'}
                    />
                </View> 
                
            </ScrollView>         
        );
    }
}

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
