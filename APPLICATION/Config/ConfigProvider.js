import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';

/* config par defaut */
export const defaultConfig = {
	protocol: "http",
	host: "127.0.0.1",
	port: "80",
	useFakeRequest: true
}

// Creation du contexte
export const ConfigContext = createContext(defaultConfig)


/**
 * Composant qui manipule la configuration
 */
const ConfigProvider = ({children}) => {

	/* State vide */
	const [config, setConfig] = useState({})

	/* exectuté à chaque demarage de l'application: permet de recupéré la derniere sauvegarde de config */
	useEffect(() => {
		AsyncStorage.getItem('config')
		.then( res => { 
			if(res)
				setConfig(JSON.parse(res))
			else
				setConfig(defaultConfig)
		})
		.catch(err =>{
			console.error(err)
			setConfig(defaultConfig)
		})
	}, []);

	/* sauvegarde à chaque changement */
	useEffect(() => {
		AsyncStorage.setItem('config', JSON.stringify(config));
	}, [config])

	
	// wrapper
	return (
		<ConfigContext.Provider value={{config, setConfig}}>
			{children}
		</ConfigContext.Provider>
	)
}
  
export default ConfigProvider;