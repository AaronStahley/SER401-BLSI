import React from 'react';
import {Image, Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import ConversationScreen from '../screens/ConversationScreen';
import HomeScreen from '../screens/HomeScreen';
import AlgDescriptionScreen from '../screens/AlgDescriptionScreen';
import RecommendationScreen from '../screens/RecommendationScreen';
import Colors from "../constants/Colors";


/**
 * @author Aaron Stahley
 *
 * This is the options for what every page displays for the header
 * do not add specific styling for only one page this will do it for all
 * pages. If you want to add somthing page specific do it under the header
 * options on that page.
 */
const navigationConfig = {
    initialRouteName: 'Home',
    headerMode: 'float',
    navigationOptions: {

        headerTintColor: '#fff', // Changes back arrow to white.

        //PCH logo in the center.
        headerTitle: (<Image
            style={{
                flex: 1,
                width: 40,
                height: 40,
                resizeMode: 'contain',
                alignSelf: 'center',
            }}
            source={require('../assets/images/WHITE_HAND_LOGO.png')}/>

        ),headerStyle: {
            backgroundColor: Colors.navBarBackground,
            paddingBottom: 8,
    }}
}

/**
 * When adding new pages make sure to add it here.
 */
const AppNavigator = createStackNavigator({
    Home: { screen: HomeScreen},
    Conversation: {screen: ConversationScreen},
    AlgDescription: {screen: AlgDescriptionScreen},
    Recommendation: {screen: RecommendationScreen}
},navigationConfig);

export default AppNavigator;
