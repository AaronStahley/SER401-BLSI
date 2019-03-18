import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import { inject, observer } from "mobx-react/native";
import {queryAlert, errorAlert} from "./AlertBox"
import Colors from "../../common/Colors";

@inject("rootStore")
@observer
export default class UpdateButton extends React.Component {
  algOnPress = async () => {
    const {algorithms} = this.props;

    Promise.all(algorithms.map((algo) => {
      this.props.rootStore.updateStore.update(algo)
    })).catch(err => {
        console.log(err);
        errorAlert("Data not available",
          "Currently not able to connect to service.");
      });
  };


  render() {
    return (
      <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={
          () => queryAlert(
            "Update Algorithm?",
            "Do you want to update to the latest algorithm versions?",
            this.algOnPress)
          }>

        <Text style={styles.text}>Update Latest</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  buttonContainer: {
    justifyContent: "center",
    position: "relative",
    flexDirection: "row",
    backgroundColor: Colors.PCH_RED,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5
  },
  text : {
    color: "#fff",
    fontSize: 16
  }
}