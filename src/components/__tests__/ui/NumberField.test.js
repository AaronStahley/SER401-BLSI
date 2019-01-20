import 'react-native';
import React from 'react';
import NumberField from '../../ui/NumberField';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer
        .create(<NumberField></NumberField>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('handles values correctly', () => {
    const tree = renderer
        .create(<NumberField>123</NumberField>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});