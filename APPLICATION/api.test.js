/*

//J'ai passé 2h a essayer de configurer jest pour tester les composant react mais ca marche pas !

import React from 'react'
import renderer from 'react-test-renderer'
import { Button } from 'react-native';


import Settings from './Settings'

it('renders correctly across screens', () => {
	const tree = renderer.create(<Settings />).toJSON();
	expect(tree).toMatchSnapshot();
});
*/

import api from './api'

test('test fakeAccept', () => {
	const givenObject = {ip: '192.168.0.1', port:'80'}
	api.fakeAccept(givenObject, 1000)
		.then( (res) => {
			expect(res).toMatchObject(givenObject)
		}).
		catch()
		.finally()
});

test('test fakeReject', () => {
	const givenObject = {ip: '192.168.0.1', port:'80'}
	api.fakeReject(givenObject, 1000)
		.then().
		catch(err => {
			expect(res).toMatchObject(givenObject)
		})
		.finally()
});