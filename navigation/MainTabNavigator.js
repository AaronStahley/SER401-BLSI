import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createDrawerNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ConversationScreen from '../screens/ConversationScreen';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HeaderStyle from '../components/HeaderStyle';



const HomeStack = createStackNavigator({

    HomeStack: HomeScreen

});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-home'}
        />
    )
};

const ConversationStack = createStackNavigator({
  Questions: ConversationScreen,
},HeaderStyle);

ConversationStack.navigationOptions = {
  tabBarLabel: 'Questions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle'
      }
    />
  ),tabBarOptions: {
        showLabel: false, // hide labels
        labelStyle: {
            fontSize: 12,
            color: '#fff'
        },
        style: {
            backgroundColor: '#ee3e41' // TabBar background
        }
    }
};


export default createDrawerNavigator({
  Home: HomeStack,
  Questions: ConversationStack,
},{drawerPosition: 'right'});
