import 'react-native';
import React from 'react';
import ProceedButton from '../../ui/ProceedButton';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer
        .create(<ProceedButton title="snapshot" onPress={() => {}}></ProceedButton>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});