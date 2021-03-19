import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import {TextInput , Text, View, SafeAreaView, Switch, Button } from 'react-native';
import 'react-native-gesture-handler';
import styles from './Styles'

import { ConfigContext, defaultConfig } from "./ConfigProvider";

/**
 * composant qui permet de modifier la configuration qui est paratger à travers toute l'application
 */

export default () => {
	
	const {config, setConfig} = useContext(ConfigContext) // recuperation de la configuration

	const {protocol, host, port, useFakeRequest} = config // destructuring

	return (
		<SafeAreaView  style={styles.container}>
			<StatusBar style="auto" />
			{/* suite de TextInput pour modifier les options de configuration*/}
			<View>
				<Text>Parametres</Text>
				<View>
					<Text>Protocol:</Text>
					<TextInput
						style={{height: 40}}
						placeholder="http"
						onChangeText={protocol => setConfig({...config, protocol})}
						defaultValue={protocol}
					/>
				</View>

				<View>
					<Text>IP:</Text>
					<TextInput
						style={{height: 40}}
						placeholder="127.0.0.1"
						onChangeText={host => setConfig({...config, host}) }
						defaultValue={host}
					/>
				</View>

				<View>
					<Text>Port:</Text>
					<TextInput
						style={{height: 40}}
						placeholder="80"
						onChangeText={port => setConfig({...config, port})}
						defaultValue={port}
					/>
				</View>

				<View>
					<Text>use fake requests: Utiliser des fausses requetes (desactiver pour envoyer les requetes vers l'api):</Text>
					<Switch
						ios_backgroundColor="#3e3e3e"
						onValueChange={() => setConfig({...config, useFakeRequest: !useFakeRequest})}
						value={useFakeRequest}
					/>
				</View>
				<Text>Au cas où il y ai des bugs :</Text>
				<Button title={"Remettre par dafaut"} onPress={ ()=>{ setConfig({...defaultConfig}) }} />

				
				
			</View>
			
		</SafeAreaView>
	)
}