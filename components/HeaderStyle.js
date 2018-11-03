import React from 'react';
import {Image,TouchableOpacity,ScrollView,StyleSheet} from 'react-native';
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
    headerLeft: (<Image
            style={{
                flex: 1
            }}/>
    ),
    headerRight: (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <Icon.Ionicons
                    name="md-more"
                    size={40}
                    color={'#fff'}
                    style={{
                    flex: 1,
                    width: 30,
                }}
                >
                </Icon.Ionicons>
         </TouchableOpacity>
    ),
    headerStyle: {
        backgroundColor: Colors.navBarBackground,
        paddingBottom: 8,

    }
})};


