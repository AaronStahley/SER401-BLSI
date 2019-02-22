import React from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Icon } from "expo";
import { inject, observer } from "mobx-react/native";
import {
  retrieveAlgorithms,
  retrieveAlgorithm
} from "../../services/fetchAlgorithms";

@inject("rootStore")
@observer
export default class RefreshButton extends React.Component {
  algDescriptOnPress = async () => {
    const algorithm = this.props.algorithm;
    console.log("Algorithm: " + algorithm.id);
    Promise.resolve(retrieveAlgorithm(algorithm.id)
      .then(json => {
        if (!json) throw new Error("Data not available");
        this.props.rootStore.updateStore.update(json);
      })
      .catch(err => {
        console.log(err);
        Alert.alert(
          "Data not available",
          "Currently not able to connect to service.",
          [{
            text: "Close",
            style: "cancel"
          }]
        )
      }));
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Update Algorithm?",
              "Do you want to upgrade to the newest version ?",
              [
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "Yes",
                  onPress: this.algDescriptOnPress
                }
              ]
            )
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