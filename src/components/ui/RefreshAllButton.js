import React from "react";
import {View, TouchableOpacity} from "react-native";
import {Icon} from "expo";
import {inject, observer} from "mobx-react/native";
import {queryAlert, errorAlert} from "./AlertBox"

//import BluebirdPromise from "bluebird";

@inject("rootStore", "releaseImporter")
@observer
export default class RefreshAllButton extends React.Component {

    homeOnPress = () => {
        this.props.refreshPage(true);
        return this.props.releaseImporter.updateAll()
            .then(() => {
                this.props.refreshPage(false);
            })
            .catch(err => {
                console.log(err);
                errorAlert("Data not available", "Currently not able to connect to service.");
            });
    };

    render() {
        return (<View>
                <TouchableOpacity onPress={
                    () => queryAlert(
                        "Update Algorithms?",
                        "Do you want to update the algorithms on your list?",
                        this.homeOnPress)
                }>
                    <Icon.Ionicons 
                        style={{
                            marginLeft: 10,
                            marginTop : 5
                        }}
                        color={"#fff"}
                        size={30}
                        name="ios-refresh"/>
                </TouchableOpacity>
            </View>
        );
    }
}