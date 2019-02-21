import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from "expo";
import {observer} from 'mobx-react/native'

@observer
export default class SearchButton extends React.Component {
    onPress = () => {
        console.log('Pressed');
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.onPress}>
                    <Icon.Ionicons
                        style={{marginRight: 20, marginTop: 5}}
                        color={"#fff"}
                        size={30}
                        name="ios-search" />
                </TouchableOpacity>
            </View>
        );
    }
}
