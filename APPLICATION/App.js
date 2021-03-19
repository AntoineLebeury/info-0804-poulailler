import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import {Modal, Pressable, Text} from 'react-native';

/* pages */
import bd from './BDD'
import Cam from './Cam'
import Porte from './Porte'
import Settings from './Settings'

/* config */
import ConfigProvider from './ConfigProvider'

const Tab = createBottomTabNavigator();

/* Racine de l'application */
export default () => {
	return (
		<ConfigProvider>
			<NavigationContainer>
				<Tab.Navigator tabBarOptions={{ activeTintColor: '#e91e63', }}>
					<Tab.Screen name="Porte" component={Porte} />
					<Tab.Screen name="Cam" component={Cam} />
					<Tab.Screen name="BDD" component={bd} />
					<Tab.Screen name="Paramètres" component={Settings} />
				</Tab.Navigator>
			</NavigationContainer>
		</ConfigProvider>
	)
}
