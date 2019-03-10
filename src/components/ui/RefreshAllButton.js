import React from "react";
import {View, TouchableOpacity} from "react-native";
import {Icon} from "expo";
import {inject, observer} from "mobx-react/native";
import {retrieveAlgorithms, retrieveAlgorithm} from "../../services/fetchAlgorithms";
import {queryAlert, errorAlert} from "./AlertBox"

//import BluebirdPromise from "bluebird";

@inject("rootStore")
@observer
export default class RefreshAllButton extends React.Component {

    homeOnPress = async () => {
        retrieveAlgorithms()
            .then(json => {
                if (!json) throw new Error("Data not available");
                return Promise.all(
                    json.collection.map(item => {
                        return retrieveAlgorithm(item.id)
                            .then(json => {
                                this.props.rootStore.updateStore.insert(json);
                            })
                            .then(() => this.update)
                    })
                );
            }).catch(err => {

            console.log(err);
            errorAlert("Data not available", "Currently not able to connect to service.");
        });
    };

    update = () => {
        this.props.update.Refresh++;
        return errorAlert("Done", "");
    };

    render() {
        return (<View>
                <TouchableOpacity onPress={
                    () => queryAlert(
                        "Update Algorithms?",
                        "Do you want to update the algorithms on your list?",
                        this.homeOnPress)
                }>
                    <Icon.Ionicons style={
                        {
                            marginLeft: 10,
                            marginTop : 5
                        }
                    }
                                   color={"#fff"}
                                   size={30}
                                   name="ios-refresh"/>
                </TouchableOpacity>
            </View>
        );
    }
}