import React from "react";
import {View, TouchableOpacity} from "react-native";
import {Icon} from "expo";
import {inject, observer} from "mobx-react/native";
import {queryAlert, errorAlert} from "./AlertBox"

//import BluebirdPromise from "bluebird";

@inject("rootStore")
@observer
export default class AddButton extends React.Component {

    render() {
        return (<View>
                <TouchableOpacity onPress={
                    this.props.onPress
                }>
                    <Icon.Ionicons style={
                        {
                            marginLeft: 10,
                            marginTop : 5
                        }
                    }
                                   color={"#fff"}
                                   size={30}
                                   name="ios-add"/>
                </TouchableOpacity>
            </View>
        );
    }
}