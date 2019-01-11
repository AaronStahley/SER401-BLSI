import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

//https://github.com/mobxjs/mobx-react/issues/186
jest.mock('mobx-react/native', () => require('mobx-react/custom'));

it('renders correctly', () => {
    const tree = renderer
        .create(<App/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});