import React from 'react';
import renderer from 'react-test-renderer';
import Cam from './Cam';

test('rendu correct', () => {
    const tree = renderer.create(<Cam />).toJSON();
    expect(tree).toMatchSnapshot();
});