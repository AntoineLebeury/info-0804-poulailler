import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState, useCallback} from 'react';
import { FlatList, Button, Text, View, SafeAreaView, RefreshControl, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import api from './api'
import styles from './Styles'
import { ConfigContext } from "./ConfigProvider";

/* Meme logique que dans ./porte.js */

export default () => {
	const { config } = useContext(ConfigContext)
	const { useFakeRequest } = config
	const [isLoading, setLoading] = useState(true)
	const [refreshing, setRefreshing] = useState(false)
	const [data, setData] = useState({})
	const [error, setError] = useState('')

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		loadBDD()
	}, [])

	const loadBDD = () => {
		setLoading(true)
		setError('')

		useFakeRequest ?
			/* fausse données pour démonstartion */
			api.fakeAccept([{date: "fake date", temperature: 15, humidite: 70, pression: 1000, image: 'base64 ?' }, {date: "fake sqdfdate",temperature: 16,humidite: 70,pression: 500, image:'bassdfsdfe64 ?' }], 1000)
				.then( (state) => setData(state) ).catch(err => setError(err.toString()) ).finally(() =>{ setLoading(false);  setRefreshing(false) })
		:
			api.getAllBDD({config}).then( (state) => setData(state) ).catch(err => setError(err.toString()) ).finally(() =>{ setLoading(false);  setRefreshing(false) })
	}

	// componentDidMount
	useEffect(() => {
		
		loadBDD()

	}, [config]);

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
						<Text>BDD</Text>
						{ !!error  && <Text>Verifiez si les informations vers l'API sont bonnes dans les settings</Text> }
						{ !!error  && <Text style={{color: 'red'}}>Erreur:</Text> }
						{ !!error  && <Text style={{color: 'red'}}>{error}</Text> }
						{ !error   && <FlatList data={data} renderItem={( {item, index} ) => (<Text key={index}>{JSON.stringify(item)}</Text>)} />}
					</View>
				}
				
			</ScrollView>
		</SafeAreaView >
	)
}