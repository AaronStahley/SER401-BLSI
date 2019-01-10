import 'react-native';
import React from 'react';
import MessageBubble from '../MessageBubble';s
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<MessageBubble></MessageBubble>)
});