import React from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import { Icon } from "expo";
import {inject, observer} from 'mobx-react/native'
import {retrieveAlgorithms, retrieveAlgorithm} from "../../services/fetchAlgorithms";

@inject("rootStore")
@observer
export default class RefreshButton extends React.Component {
    homeOnPress = () => {
        retrieveAlgorithms(this.props.rootStore);
    }

    algDescriptOnPress = () => {
        const algorithm = this.props.algorithm;
        retrieveAlgorithm(algorithm.id, this.props.rootStore);
    }

    render() {
        return (
        <View>
        <TouchableOpacity
            onPress={() =>
                Alert.alert(
                    !this.props.algorithm ? homeAlertHeader: algDescriptAlertHeader,
                    !this.props.algorithm ? homeAlert : algDescriptAlert,
                    [{
                        text: "No",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { 
                        text: "Yes", 
                        onPress: !this.props.algorithm ? this.homeOnPress : this.algDescriptOnPress
                    }
                ])
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

const homeAlertHeader = "Get New Algorithms?  ";
const homeAlert = "Do you want to add new alogorithms to your list?"

const algDescriptAlertHeader = 'Update Algorithm?  ';
const algDescriptAlert = 'Do you want to upgrade to the newest version ?';