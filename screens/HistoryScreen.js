import React from 'react';
import {ScrollView, StyleSheet, Text, View, SectionList} from 'react-native';
import HeaderStyle from '../components/HeaderStyle';
import LineChartTemplate from '../components/LineChartTemplate'

export default class HistoryScreen extends React.Component {
    static navigationOptions = HeaderStyle; 

    render() {
        const data = [5.6, 6.8, 6.2, 6.4, 6.9, 7.1, 6.95, 7.5]; 
        
        const mrn = 123456789;
        let birthdate = new Date(2015, 5, 5);
        const age = 3;
        const weight = 60;
        const sipa = 0.27;
        const hb = 4.2;

        const {navigate} = this.props.navigation;

        //Broken down into seperate view sections: Title, SectionList, Graph
        return (
            <ScrollView style={styles.container}>
                <View style={styles.welcomeContainer}>
                    <Text>
                        History Screen
                    </Text>                   
                </View>
                <View style={styles.boxContainer}>
                    <SectionList horizontal={true}
                        renderItem={({item, index, section}) => 
                            <Text style={styles.boxContainer}
                                key={index}>{item}
                            </Text>     
                        }
                        renderSectionHeader={({section: {title}}) =>
                            <Text style={{fontWeight: 'bold', 
                                flex: 1,
                                marginRight: 5,
                                marginLeft: 5}}
                            >
                                {title}
                            </Text>
                        }
                        sections= {[
                            {title: "MRN", data: [mrn]},
                            {title: "Birthdate", data: [birthdate.getMonth() + '-' + birthdate.getDay() + '-' + birthdate.getFullYear()]},
                            {title: "Age", data: [age, '']},
                            {title: "Weight", data: [weight, '']},
                            {title: "Current SIPA", data: [sipa, '']},
                            {title: "Current Hb", data: [hb + 'g/dL']}
                        ]}
                        keyExtractor={(item, index) => item + index} 
                    />                   
                </View>                      
                <View style={styles.welcomeContainer}>                                
                     <Text 
                        style={{alignItems: 'center', marginTop: 10, marginBottom: -30}}
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
    },
    boxContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        borderColor: '#555',
        marginLeft: 10,
        marginRight: 10
    },
    itemContainer: {
        marginTop: 50,
        marginLeft: 10,
        marginRight: 100
    },
    seperatorContainer: {
        flex: 1,
        backgroundColor: '#fff',
        height: StyleSheet.hairlineWidth,
        width: StyleSheet.hairlineWidth,
        marginLeft: 10
    }
});
