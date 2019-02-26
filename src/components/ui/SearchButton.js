import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from "expo";
import {observer} from 'mobx-react/native'

@observer
export default class SearchButton extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.openSearchBar}>
                <View>
                    <Icon.Ionicons
                        style={{marginRight: 10, marginTop: 5}}
                        color={"#fff"}
                        size={30}
                        name="ios-search" />
                </View>
            </TouchableOpacity>
        );
    }
}
