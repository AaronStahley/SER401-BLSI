import React from "react";
import {View, TouchableOpacity} from "react-native";
import {Icon} from "expo";
import {inject, observer} from "mobx-react/native";
import {queryAlert, errorAlert} from "./AlertBox"

@inject("rootStore", "releaseImporter")
@observer
export default class RefreshButton extends React.Component {

    algDescriptOnPress = async () => {
        const {algorithmId, releaseImporter} = this.props;
        return releaseImporter.update(algorithmId)
            .catch(err => {
                console.log(err);
                errorAlert("Data not available",
                    "Currently not able to connect to service.");
            });
    };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={
                    () => queryAlert(
                        "Update Algorithm?",
                        "Do you want to update to the latest algorithm version?",
                        this.algDescriptOnPress)
                }
                >
                    <Icon.Ionicons
                        style={{marginRight: 10, marginTop: 5}}
                        color={"#fff"}
                        size={30}
                        name="ios-refresh"
                    />
                </TouchableOpacity>
            </View>
        );
    }
}