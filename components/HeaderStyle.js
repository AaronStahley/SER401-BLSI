import React from 'react';
import {Image,View} from 'react-native';
import Colors from '../constants/Colors';


//Contains all the styling for the top nav menu.
export default {
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
    headerRight: (<Image
            style={{
                flex: 1,
                width: 40,
                height: 40,
            }}/>
        //Put drawer menu icon here..
    ),
    headerStyle: {
        backgroundColor: Colors.navBarBackground,
        paddingBottom: 8,

    }
};
