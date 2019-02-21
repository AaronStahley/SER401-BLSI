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
  homeOnPress = async () => {
    retrieveAlgorithms()
      .then(json => {
        if (!json) throw new Error("Data not available");

        return Promise.all(
          json.map(item => {
            retrieveAlgorithm(item.id).then(json => {
              this.props.rootStore.updateStore.update(json);
            });
          })
        );
      })
      .catch(err => {
        console.log("No data available", err);
      });
  };

  algDescriptOnPress = async () => {
    const algorithm = this.props.algorithm;
    Promise.resolve(retrieveAlgorithm(algorithm.id)
      .then(json => {
        if (json === undefined) throw new Error("Data not available");
        this.props.rootStore.updateStore.update(json);
      })
      .catch(err => {
        console.log("No data available", err);
      }));
  };

  nullOrUndefined(obj){
      return obj === null || obj === undefined;
  }

  render() {
    const algoExists = this.nullOrUndefined(this.props.algorithm);
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              algoExists ? homeAlertHeader : algDescriptAlertHeader,
              algoExists ? homeAlert : algDescriptAlert,
              [
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "Yes",
                  onPress: algoExists
                    ? this.homeOnPress
                    : this.algDescriptOnPress
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

const homeAlertHeader = "Get New Algorithms?  ";
const homeAlert = "Do you want to add new algorithms to your list?";

const algDescriptAlertHeader = "Update Algorithm?  ";
const algDescriptAlert = "Do you want to upgrade to the newest version ?";
