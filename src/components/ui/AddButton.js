import React from "react";
import {View, TouchableOpacity} from "react-native";
import {Icon} from "expo";
import {inject, observer} from "mobx-react/native";
import {queryAlert, errorAlert} from "./AlertBox"

//import BluebirdPromise from "bluebird";

@inject("rootStore")
@observer
export default class AddButton extends React.Component {

    onPress = () => {
        let {refreshPage, navigation} = this.props;
        navigation.navigate("UpdateScreen", {refreshPage: refreshPage})
    }

    render() {
        return (<View>
                <TouchableOpacity onPress={this.onPress}>
                    <Icon.Ionicons style={
                        {
                            marginHorizontal: 15,
                            marginTop : 5
                        }
                    }
                    color={"#fff"}
                    size={40}
                    name="ios-add"/>
                </TouchableOpacity>
            </View>
        );
    }
}