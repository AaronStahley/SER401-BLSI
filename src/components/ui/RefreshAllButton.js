import React from "react";
import {View, TouchableOpacity, Alert} from "react-native";
import {Icon} from "expo";
import {inject, observer} from "mobx-react/native";
import {retrieveAlgorithms, retrieveAlgorithm} from "../../services/fetchAlgorithms";

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
            retrieveAlgorithm(item.id)
              .then(json => {
                this.props.rootStore.updateStore.update(json);
              })
          })
        );
      }).catch(err => {
        console.log(err);
        Alert.alert(
          "Data not available",
          "Currently not able to connect to service.",
          [{
              text: "Close",
              style: "cancel"
          }]
        )
      });
  };

  render() {
    return ( <View>
      <TouchableOpacity onPress = {
        () => Alert.alert(
          "Get New Algorithms?",
          "Do you want to add new algorithms to your list?",
          [{
              text: "No",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "Yes",
              onPress: this.homeOnPress
            }
          ]
        )
      } >
      <Icon.Ionicons style = {
        {
          marginRight: 10,
          marginTop: 5
        }
      }
      color = {"#fff"}
      size = {30}
      name = "ios-refresh" />
      </TouchableOpacity> 
      </View>
    );
  }
}