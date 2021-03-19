import React from 'react'
import renderer from 'react-test-renderer'
import { Button } from 'react-native';


import Settings from './Settings'

it('renders correctly across screens', () => {
	const tree = renderer.create(<Settings />).toJSON();
	expect(tree).toMatchSnapshot();
});