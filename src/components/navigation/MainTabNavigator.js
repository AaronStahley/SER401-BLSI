import React from 'react';
import {Image,Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import AlgDescriptionScreen from '../app/home/AlgDescriptionScreen';
import RecommendationScreen from '../app/conversation/RecommendationScreen';
import DischargeScreen from '../app/conversation/DischargeScreen';
import UpdateScreen from '../app/conversation/UpdateScreen';

import Colors from "../../common/Colors";
import HomeComponent from "../app/home/HomeComponent";
import ConversationComponent from "../app/conversation/ConversationComponent";


/**
 * @author Aaron Stahley
 *
 * This is the options for what every page displays for the header
 * do not add specific styling for only one page this will do it for all
 * pages. If you want to add somthing page specific do it under the header
 * options on that page.
 */
const navigationConfig = {
    initialRouteName : "Home",
    headerMode       : "float",
    navigationOptions: {
        headerTintColor: "#fff", // Changes back arrow to white.
        //PCH logo in the center.
        //Update logo to "Phoenix Children's" lettering logo
        headerTitle    : (
            <Image
                style={{
                    marginTop: Platform.OS === 'ios' ? 10: 0,
                    marginBottom: Platform.OS === 'ios' ? 5: 0,
                    flex      : 1,
                    width     : 121, //Change width from square to rectangle to accommodate new logo
                    height    : 40,
                    resizeMode: "contain",
                    alignSelf : "center"
                }}
                source={require("../../../assets/images/PCH_APP_LOGO-v2-white-lettering-center-bg-trans.png")}
            />
        ),
        headerStyle    : {
            backgroundColor  : Colors.navBarBackground,
            paddingBottom    : 10,
            height           : 50,
            elevation        : 0,
            borderBottomWidth: 0,
        }
    }
};

/**
 * When adding new pages make sure to add it here.
 */
const AppNavigator = createStackNavigator({
    Home          : {screen: HomeComponent},
    Conversation  : {screen: ConversationComponent},
    AlgDescription: {screen: AlgDescriptionScreen},
    Recommendation: {screen: RecommendationScreen},
    Discharge     : {screen: DischargeScreen},
    UpdateScreen  : {screen: UpdateScreen}
}, navigationConfig);

export default AppNavigator;
