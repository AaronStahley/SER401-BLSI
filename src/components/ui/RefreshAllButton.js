import React from "react";
import {View, TouchableOpacity} from "react-native";
import {Icon} from "expo";
import {inject, observer} from "mobx-react/native";
import {checkAvailability, retrieveAlgorithm, retrieveAlgorithms} from "../../services/fetchAlgorithms";
import {queryAlert, errorAlert} from "./AlertBox"

//import BluebirdPromise from "bluebird";

@inject("rootStore")
@observer
export default class RefreshAllButton extends React.Component {

    deleteAlgorithms = (algorithms) => {
        let ids = [];
        return Promise.all(
            algorithms.map((item) => {
                if(item.Id) {
                    ids.push({id : item.Id, 
                        favorited: item.IsFavorited, 
                        dateModified: item.DateModified,
                        version: item.VersionId
                    });
                    return this.props.rootStore.algorithmStore.delete(item.Id)
                        .then((res) => {console.log(res)})
                }
        }))                
        .then(() => ids);
    }

    homeOnPress = async () => {
        return retrieveAlgorithms() //Check connection
            .then((res) => res ? null : () => {throw "Not available"})
            .then(this.props.rootStore.algorithmStore.getOrFindAll)
            .then((algos) => this.deleteAlgorithms(algos)) //clear out algorithms
            .then(ids => {
                return Promise.all(ids.map((id) => {
                    return retrieveAlgorithm(id.id)
                        .then(json => {
                            this.props.rootStore.updateStore.insert(json);
                        })
                }))
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