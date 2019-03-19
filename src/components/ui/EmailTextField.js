import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import Colors from "../../common/Colors";

export default class EmailTextField extends React.Component {
  render() {
    let { text } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.textLabel}>{text}</Text>
        <TextInput
          {...this.props}
          style={styles.textInput}
          clearButtonMode={true}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10
  },
  textLabel: {
    fontSize: 16,
    marginRight: 15
  },
  textInput: {
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
