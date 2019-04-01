import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import { inject, observer } from "mobx-react/native";
import {queryAlert, errorAlert} from "./AlertBox"
import Colors from "../../common/Colors";

@inject("rootStore")
@observer
export default class UpdateButton extends React.Component {

    onPress = () => {
        this.props.refreshPage(true);
        return this.props.releaseImporter.updateAll()
            .then(() => {
                this.props.refreshPage(false);
            })
        .catch(err => {
            console.log(err);
            errorAlert("Data not available", "Currently not able to connect to service.");
        });
    }

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