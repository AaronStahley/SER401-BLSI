import React from 'react';

import {
    StyleSheet,
    View,
    Dimensions, ActivityIndicator,
} from 'react-native';
import {observer} from 'mobx-react/native'
import Colors from "../../common/Colors";

@observer
export default class Loading extends React.Component {

    render() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    style={styles.activityIndicator}
                    size="large"
                    color={Colors.PCH_RED}/>
            </View>
        );
    }
}

const setViewStyle = function () {
    if (Dimensions.get('window').width > 500) {
        return {
            flexWrap      : 'wrap',
            flexDirection : 'row',
            justifyContent: 'center'
        }
    } else {
        return {
            flexWrap: 'wrap'
        }
    }
};

const styles = StyleSheet.create({
    loadingContainer : {
        flex           : 1,
        backgroundColor: 'white'

    },
    activityIndicator: {
        marginTop: 20
    },
});
