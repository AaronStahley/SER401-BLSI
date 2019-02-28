import {Alert} from "react-native";

export const errorAlert = async (message, description) => {
    return Alert.alert(
        message,
        description,
        [{
            text: "Close",
            style: "cancel"
        }]
    );
};

export const queryAlert = async (message, description, onPress) => {
    return Alert.alert(
        message,
        description,
        [{
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
        },
        {
            text: "Yes",
            onPress: onPress
        }]
    )
};

