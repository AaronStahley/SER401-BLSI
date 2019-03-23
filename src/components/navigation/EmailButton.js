import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from "expo";
import email from "react-native-email";

class EmailButton extends React.Component {

    //Opens the email app on the phone with subj and body populated. 
    handleEmail = () => {
        email(" ", {
          cc: "",
          subject: this.props.subject,
          body: this.props.body
        }).catch(console.error);
      };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.handleEmail}>
                    <Icon.Ionicons
                        style={{marginRight: 12, marginTop: 5}}
                        color={"#fff"}
                        size={35}
                        name="ios-mail" />
                </TouchableOpacity>
            </View>
        );
    }
}
export default EmailButton;
