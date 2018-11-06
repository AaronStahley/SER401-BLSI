import React from 'react';
import {Image,TouchableOpacity,StyleSheet,View,Text,Dimensions} from 'react-native';
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
            // onPress={() => navigation.dispatch()} //Functionalty of the back arrow. (link back to home page).
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
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <Icon.Ionicons
                    name="md-more"
                    size={40}
                    color={'#fff'}
                    style={{
                        flex: 1,
                        width: 20,
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

const styles = StyleSheet.create({
    arrowBack: {
        flex: 1,
        alignSelf: 'center',
        paddingLeft: 8,
        paddingTop: 5
    }
});


