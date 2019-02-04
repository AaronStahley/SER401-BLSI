import "react-native";
import React from "react";
import TextField from "../../ui/TextField";
import renderer from "react-test-renderer";

it("renders correctly", () => {
    const tree = renderer.create( <TextField /> ).toJSON();
    expect(tree).toMatchSnapshot();
});

it("renders correctly", () => {
    const tree = renderer.create( <TextField>Test text</TextField>).toJSON();
    expect(tree).toMatchSnapshot();
});