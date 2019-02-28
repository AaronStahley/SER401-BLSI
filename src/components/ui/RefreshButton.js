import React from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Icon } from "expo";
import { inject, observer } from "mobx-react/native";
import {retrieveAlgorithm} from "../../services/fetchAlgorithms";
import {queryAlert, errorAlert} from "./AlertBox"

@inject("rootStore")
@observer
export default class RefreshButton extends React.Component {
  algDescriptOnPress = async () => {
    const algorithm = this.props.algorithm;
    console.log("Algorithm: " + algorithm.id);
    Promise.resolve(retrieveAlgorithm(algorithm.id)
      .then(json => {
        if (!json) throw new Error("Data not available");
        this.props.rootStore.updateStore.findDeleteInsert(json);
      })
      .catch(err => {
        console.log(err);
        errorAlert("Data not available",
          "Currently not able to connect to service.");
      }));
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
            style={{ marginLeft: 10, marginTop: 5 }}
            color={"#fff"}
            size={30}
            name="ios-refresh"
          />
        </TouchableOpacity>
      </View>
    );
  }
}