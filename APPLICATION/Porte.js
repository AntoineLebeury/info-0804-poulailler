import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState, useCallback} from 'react';
import { Button, Text, View, SafeAreaView, RefreshControl, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import api from './api'
import styles from './Styles'
import { ConfigContext } from "./ConfigProvider";

export default () => {
	const { config } = useContext(ConfigContext)
	const { useFakeRequest } = config

	const [isLoading, setLoading] = useState(true) //variable pour savoir si les données sont en train d'etre chargées
	const [refreshing, setRefreshing] = useState(false) //rafraichissement de la page via un swipe vers le bas
	const [state, setState] = useState({}) // le state de la porte
	const [error, setError] = useState('')
	
	const onRefresh = useCallback(() => {
		if(JSON.stringify(config) !== '{}'){
			setRefreshing(true)
			setLoading(true)
			loadPorte()
		}
		
	}, [])

	const loadPorte = () => {
		setError('')
		setLoading(true)
		
		console.log("loadPorte", config)
		useFakeRequest ? 
			api.fakeAccept({timestamp: "2021-03-10T16:19:54.2568", ouverte: true}, 1000) 
				.then( (state) => setState(state) ).catch().finally(() =>{ setLoading(false); setRefreshing(false) }) //fakeAccept pour la demo 
		:
			api.getPorte({config}).then( (state) => setState(state) ).catch(err =>{
				console.log(err)
				setError(err.toString())
			}).finally(() =>{ setLoading(false); setRefreshing(false) })
	}

	const ouvrir = () => {
		setLoading(true)
		
		useFakeRequest ? 
			api.fakeAccept({timestamp: new Date(Date.now()).toISOString(), ouverte: true}, 1000) 
				.then( (state) => setState(state) ).catch(err => setError(err.toString())).finally(() =>{ setLoading(false); setRefreshing(false) }) //fakeAccept pour la demo 
		:
			api.ouvrirPorte({config})
				.then( (state) => setState(state) ).catch(err => setError(err.toString())).finally(() =>{ setLoading(false); setRefreshing(false) })
	}

	const fermer = () => {
		setLoading(true)
		
		useFakeRequest ? 
			api.fakeAccept({timestamp: new Date(Date.now()).toISOString(), ouverte: false}, 1000) 
				.then( (state) => setState(state) ).catch(err => setError(err.toString())).finally(() =>{ setLoading(false); setRefreshing(false) }) //fakeAccept pour la demo 
		:
			api.fermerPorte({config})
				.then( (state) => setState(state) ).catch(err => setError(err.toString())).finally(() =>{ setLoading(false); setRefreshing(false) })
	}

	// componentDidMount
	useEffect(() => {
		if(JSON.stringify(config) !== '{}'){
			console.log("requete lancé")
			loadPorte()
		}
			

	}, [config]);


	return (

		<SafeAreaView  style={styles.container}>
			<StatusBar style="auto" />

			<ScrollView
				contentContainerStyle={styles.scrollView}
				refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
				}
			>

				{ (isLoading || JSON.stringify(state) === '{}')
				?
					<View>
						{ !!error  && <Text>Verifiez si les informations vers l'API sont bonnes dans les settings</Text> }
						{ !!error  && <Text style={{color: 'red'}}>{error}</Text> }
						{ !error   && <Text>Chargement...</Text>}
						
					</View>
				:
					<View>
						{console.log(state)}
						{ !!error  && <Text>Verifiez si les informations vers l'API sont bonnes dans les settings</Text> }
						{ !!error  && <Text style={{color: 'red'}}>{error}</Text> }
						{ !error && 
							<View>
								<View><Text>La porte est {state.ouverte ? 'OUVERTE' : 'FERMEE'} depuis {state.timestamp}</Text></View>
								<Button
									onPress={ ()=>{ state.ouverte ? fermer() : ouvrir() }}
									title={state.ouverte ? 'FERMER' : 'OUVRIR'}
									color={state.ouverte ? 'red' : 'green'}
								/>
							</View>
						}
					</View>
				}
				</ScrollView>
		</SafeAreaView >
	)
}