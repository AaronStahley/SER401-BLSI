import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon } from "expo";
import { inject, observer } from "mobx-react/native";
import {retrieveAlgorithm} from "../../services/fetchAlgorithms";
import {queryAlert, errorAlert} from "./AlertBox"

@inject("rootStore")
@observer
export default class RefreshButton extends React.Component {
  algDescriptOnPress = async () => {
    const {algorithmId} = this.props;
    Promise.resolve(retrieveAlgorithm(algorithmId)
      .then(json => {
        if (!json) throw new Error("Data not available");
        this.props.rootStore.updateStore.dynamicInsertion("updateElseInsert", json);
      })
      .then(() => this.props.rootStore.updateStore.dynamicExecute("PRAGMA foreign_keys = on;"))
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
            style={{ marginRight: 10, marginTop: 5 }}
            color={"#fff"}
            size={30}
            name="ios-refresh"
          />
        </TouchableOpacity>
      </View>
    );
  }
}