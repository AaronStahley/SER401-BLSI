import {Platform} from "react-native";

export default {
    API: Platform.select({
        ios    : () => "http://dd6d64bf.ngrok.io",
        android: () => "http://dd6d64bf.ngrok.io",
    })(),
};