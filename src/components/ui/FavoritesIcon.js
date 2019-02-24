import React from 'react';
import { Icon } from "expo";
import {StyleSheet, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react/native'
import Colors from "../../common/Colors";

/**
 * Star icon using ion icons that displays a different color on click. 
 * @author Aaron S
 */

@inject("rootStore")
@observer
export default class FavoritesIcon extends React.Component {

    state = { 
        enabled: false,
        color: "black",
        iconName: "ios-star-outline" 
    };

    enableDisable = () => {
        if (this.state.enabled == false) {
            this.setState({ enabled: true, color: Colors.favoritesEnabled, iconName: "ios-star" }, function() { 
                //TODO - PUT THE ALGORITHM IN THE FAVORITES SECTION OF THE DATABASE. 
            });
        } else {
            this.setState({ enabled: false, color: Colors.favoritesDisabled, iconName: "ios-star-outline" }, function() { 
                //TODO - TAKE THE ALGORITHM OUT OF THE FAVORITES SECTION OF THE DATABASE.
            });
        }
    };

    render() {
        return (
            <TouchableOpacity
                onPress={this.enableDisable}
            >
                <Icon.Ionicons
                    color={this.state.color}
                    size={23}
                    name={this.state.iconName}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  
});

