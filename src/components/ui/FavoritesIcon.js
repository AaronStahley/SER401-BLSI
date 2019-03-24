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

    test() { 

       if(this.props.isSelected === 1) {
           this.setState({enabled: true})
           this.setState({ enabled: true, color: Colors.favoritesEnabled, iconName: "ios-star" }) 
       }else { 
           this.setState({ enabled: false })
           this.setState({ enabled: false, color: Colors.favoritesDisabled, iconName: "ios-star-outline" }) 
       }
    }

    componentDidMount() { 
        this.test();
        this.props.rootStore.algorithmStore.getOrFindAll().then(res => {
            this.setState({
                algorithms: res
            });
        });
    }

    enableDisable = () => {
        if (this.state.enabled == false) {
            this.setState({ enabled: true, color: Colors.favoritesEnabled, iconName: "ios-star" }, function() { 
                //TODO - PUT THE ALGORITHM IN THE FAVORITES SECTION OF THE DATABASE. 
                this.props.algo.is_favorite = 1
                this.props.rootStore.algorithmStore.update({ id: this.props.algo.id, is_favorite: 1})
            });
        } else {
            this.setState({ enabled: false, color: Colors.favoritesDisabled, iconName: "ios-star-outline" }, function() { 
                //TODO - TAKE THE ALGORITHM OUT OF THE FAVORITES SECTION OF THE DATABASE.
                this.props.algo.is_favorite = 0
                this.props.rootStore.algorithmStore.update({ id: this.props.algo.id, is_favorite: 0});
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

