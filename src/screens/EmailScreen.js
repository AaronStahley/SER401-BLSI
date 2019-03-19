import React from "react";
import { ScrollView, StyleSheet, View, Button, TextInput } from "react-native";
import Colors from "../common/Colors";
import email from "react-native-email";
import EmailTextField from "../components/ui/EmailTextField";

export default class EmailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toText: "",
      ccText: "",
      subject: "PCH Dischage Instructions",
      body:
        "No Ibuprofen or other NSAIDS. Acetaminophen is ok.\n\n" +
        "May go back to school when off narcotic pain meds.\n\n" +
        "Restricted activity for length per APSA Guidelines. Weeks = 2+grade.\n\n" +
        "Activity restrictions include all sports, any recreational activity with" +
        "wheels, or any activity that involves having both feet off the ground.\n\n" +
        "Return to ED for increasing pain, pallor, dizziness, fever, vomiting," +
        "worsening shoulder pain, GI bleeding or black tarry stools.\n\n" +
        "Call office for jaundice (yellow discoloration to white part of eye).\n\n" +
        "Office visit for Grade 3-5 injury at 2 weeks post injury or phone" +
        "call follow-up for grade 1-2 injury at 2 weeks.\n\n" +
        "No follow-up imaging is required unless symptoms develop.\n\n"
    };
  }

  /**
   * Opens email app and sends through that.
   *
   */
  handleEmail = () => {
    email(this.state.toText, {
      cc: this.state.ccText,
      subject: this.state.subject,
      body: this.state.body
    }).catch(console.error);
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <EmailTextField
            text={"To:"}
            placeholder={"Enter your email address."}
            keyboardType={"email-address"}
            onChangeText={text => this.setState({ toText: text })}
          />
          <EmailTextField
            text={"CC:"}
            placeholder={"Enter your email address."}
            onChangeText={text => this.setState({ ccText: text })}
          />
          <EmailTextField
            value={this.state.body}
            multiline={true}
            maxLength={40}
            editable={false}
          />

          <Button title="Send Mail" onPress={this.handleEmail} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  formContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 10
  },
  bodyInput: {
    borderWidth: 1,
    borderColor: "#919191",
    borderRadius: 5,
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: "stretch",
    flex: 1
  }
});
