import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import { inject, observer } from "mobx-react/native";
import {queryAlert, errorAlert} from "./AlertBox"
import Colors from "../../common/Colors";
import {retrieveAlgorithm} from '../../services/fetchAlgorithms'

@inject("rootStore")
@observer
export default class UpdateButton extends React.Component {
  deleteAlgorithms = (algorithms) => {
    let ids = [];
    return Promise.all(
        algorithms.map((item) => {
          if (item.Id) {
            ids.push({
              id: item.Id,
              favorited: item.IsFavorited,
              dateModified: item.DateModified,
              version: item.VersionId
            });
            return this.props.rootStore.algorithmStore.delete(item.Id)
              .then((res) => {
                console.log(res)
              })
          }
        }))
      .then(() => ids);
  }

  onPress = async () => {
    return this.props.rootStore.algorithmStore.getOrFindAll()
      .then((algos) => this.deleteAlgorithms(algos)
        .then((ids) => {
          this.props.rootStore.transporter.init();
          return ids;
        })
      ).then((ids) => {
        this.props.rootStore.transporter.init();
        return Promise.all(ids.map((id) => {
          return retrieveAlgorithm(id.id)
            .then(json => {
              this.props.rootStore.updateStore.dynamicInsertion("updateElseInsert", json);
            })
        }))
      .then(() => this.props.rootStore.updateStore.dynamicExecute("PRAGMA foreign_keys = on;"))
      }).catch(err => {
        console.log(err);
        errorAlert("Data not available", "Currently not able to connect to service.");
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
            this.onPress)
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