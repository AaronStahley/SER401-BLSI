import React from 'react';
import {Image,TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import { Icon } from 'expo';



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
    headerRight: (
            <TouchableOpacity>
                <Icon.Ionicons
                    name="md-more"
                    size={40}
                    color={'#fff'}
                    style={{
                    flex: 1,
                    width: 30,
                }}
                   />
            </TouchableOpacity>
    ),
    headerStyle: {
        backgroundColor: Colors.navBarBackground,
        paddingBottom: 8,

    }
};
