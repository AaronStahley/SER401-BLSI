import "react-native";
import React from "react";
import TabBarIcon from "../../ui/TabBarIcon";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<TabBarIcon/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly", () => {
    const tree = renderer.create( <TabBarIcon name="md-thumbs-up"/> ).toJSON();
    expect(tree).toMatchSnapshot();
});

it("handles false focused correctly", () => {
  const tree = renderer
    .create(<TabBarIcon name="md-thumbs-up" focused={false} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("handles true focused correctly", () => {
  const tree = renderer
    .create(<TabBarIcon name="md-thumbs-up" focused={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
