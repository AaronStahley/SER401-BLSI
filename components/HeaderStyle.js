import React from 'react';
import {Image, TouchableOpacity, StyleSheet, View, Text, Dimensions, Button, Alert} from 'react-native';
import {DrawerActions, createStackNavigator, createBottomTabNavigator, createDrawerNavigator} from 'react-navigation';

import Colors from '../constants/Colors';
import { Icon } from 'expo';


//Contains all the styling for the top nav menu.
export default {navigationOptions:({navigation}) => ({
        headerTitle: (<Image
        style={{
            flex: 1,
            width: 40,
            height: 40,
            resizeMode: 'contain',
            alignSelf: 'center',
        }}

        source={require('../assets/images/WHITE_HAND_LOGO.png')}/>
    ),
    headerLeft: (<TouchableOpacity
             onPress={() =>  navigation.navigate('Home')} //Functionalty of the back arrow. (link back to home page).
            style={styles.arrowBack}>
            <Icon.Ionicons
                name="ios-arrow-back"
                size={32}
                color={'#fff'}
                style={{
                    flex: 1,
                    width: 24,

                }}
            />
        </TouchableOpacity>
    ),
    headerRight: (
            <Button
                onPress={() => ("")}
                title="Start Over"
                color= '#fff'
            />
    ),
    headerStyle: {
        backgroundColor: Colors.navBarBackground,
        paddingBottom: 8,
    }
})};

const styles = StyleSheet.create({
    arrowBack: {
        flex: 1,
        alignSelf: 'center',
        paddingLeft: 8,
        paddingTop: 5
    }
});


