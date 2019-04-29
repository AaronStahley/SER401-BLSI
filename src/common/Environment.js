import {Platform} from "react-native";

/**
 * To get the http address. Start the support app and
 * open a browser on localhost:5000 and copy one of the
 * two links and paster below. This link will change when 
 * server changes. Once support app is hosted this will be
 * the link the that address. 
 */
export default {
    API: Platform.select({
        ios    : () => "http://a6dfdbf6.ngrok.io",
        android: () => "http://a6dfdbf6.ngrok.io",
    })(),
};