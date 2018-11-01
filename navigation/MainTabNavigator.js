import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator,} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import QuestionsScreen from '../screens/QuestionsScreen';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';


const QuestionsStack = createStackNavigator({
    Home: HomeScreen,
});

QuestionsStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-home'}
        />
    ),
    tabBarOptions: {
      //  showLabel: false, // hide labels
        labelStyle: {
            fontSize: 15,
            color: '#fff'
        },
        style: {
            backgroundColor: '#ee3e41' // TabBar background
        }
    }
};

const RecommendationsStack = createStackNavigator({
  Links: QuestionsScreen,
});

RecommendationsStack.navigationOptions = {
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
        //showLabel: false, // hide labels
        labelStyle: {
            fontSize: 15,
            color: '#fff'
        },
        style: {
            backgroundColor: '#ee3e41' // TabBar background
        }
    }
};


const HistoryStack = createStackNavigator({
  Settings: HistoryScreen,
});

HistoryStack.navigationOptions = {
  tabBarLabel: 'History',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-stats${focused ? '' : '-outline'}` : 'md-stats'}
    />
  ),tabBarOptions: {
       // showLabel: false, // hide labels
        labelStyle: {
            fontSize: 15,
            color: '#fff'
        },
        style: {
            backgroundColor: '#ee3e41' // TabBar background
        }
    }
};

export default createBottomTabNavigator({
  HomeStack: QuestionsStack ,
  LinksStack: RecommendationsStack,
  SettingsStack: HistoryStack,
});
