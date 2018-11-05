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
    headerLeft: (<View style={styles.userView}>
            <Icon.Ionicons
                name="md-person"
                size={32}
                color={'#fff'}
                style={{
                    flex: 1,
                    width: 24,

                }}
            />
            <Text style={styles.userText}>
                User Name
            </Text>
        </View>
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
    userText: {
        flex: 1,
        left: 5,
        color: '#fff',
        fontSize: 12,
        width: Dimensions.get('window').width / 3
    },
    userView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 8
    }
});


