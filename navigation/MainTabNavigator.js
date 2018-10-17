import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator,} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import QuestionsScreen from '../screens/QuestionsScreen';
import HistoryScreen from '../screens/HistoryScreen';


const QuestionsStack = createStackNavigator({
    Home: QuestionsScreen,
});

QuestionsStack.navigationOptions = {
    tabBarLabel: 'Questions',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-help-circle${focused ? '' : '-outline'}` : 'md-help-circle'}
        />
    ),
};

const RecommendationsStack = createStackNavigator({
  Links: RecommendationsScreen,
});

RecommendationsStack.navigationOptions = {
  tabBarLabel: 'Recommendations',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle'
      }
    />
  ),
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
  ),
};

export default createBottomTabNavigator({
  HomeStack: QuestionsStack ,
  LinksStack: RecommendationsStack,
  SettingsStack: HistoryStack,
});
