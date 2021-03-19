import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState, useCallback} from 'react';
import { Linking, Button, Text, View, SafeAreaView, RefreshControl, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import api from './api'
import styles from './Styles'
import { ConfigContext } from "./ConfigProvider";

export default () => {

	const { config } = useContext(ConfigContext)
	const { useFakeRequest } = config
	const [isLoading, setLoading] = useState(true)
	const [refreshing, setRefreshing] = useState(false)
	const [data, setData] = useState({})
	const [error, setError] = useState('')

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		loadCam()
	}, [])

	// componentDidMount
	useEffect(() => {
		loadCam()
	}, [config]);

	const loadCam = () => {
		setLoading(true)
		setError('')
		console.log(config)
		useFakeRequest ?
			/* fausse données pour démonstartion */
			api.fakeAccept({ip: '192.168.0.1', port:'80'}, 1000)
				.then( (state) => setData(state) ).catch(err => setError(err.toString()) ).finally(() =>{ setLoading(false);  setRefreshing(false) })
		:
			api.getCamera({config}).then( (state) => setData(state) ).catch(err => setError(err.toString()) ).finally(() =>{ setLoading(false);  setRefreshing(false) })
	}

	return (
		<SafeAreaView  style={styles.container}>
		<StatusBar style="auto" />

		<ScrollView
			contentContainerStyle={styles.scrollView}
			refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/> }
		>
		
			{ isLoading 
			?
				<View>
					<Text>Chargement...</Text>
				</View>
			:
				<View>
					{ !!error  &&	<Text>Verifiez si les informations vers l'API sont bonnes dans les settings</Text> }
					{ !!error  &&	<Text style={{color: 'red'}}>Erreur:</Text> }
					{ !!error  &&	<Text style={{color: 'red'}}>{error}</Text> }
					{ !error   &&	<View>
										<Button title={`http://${data.ip}:${data.port}`} onPress={ ()=>{ Linking.openURL(`http://${data.ip}:${data.port}`) }} />
									</View>
					}
				</View>
			}
			
		</ScrollView>
	</SafeAreaView >
	)
}