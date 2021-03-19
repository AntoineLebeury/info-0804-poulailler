/**
 * fonction qui envoie une requete
 */
const apiAction = async (endpoint = "", method='get', data = {}, config = {}) => {
	console.log(config)
	// Important: le contexte de la configuration qui est partagé via le hooks useContext
	const {protocol, host, port} = config
	console.log(protocol, host, port)
	const res = await fetch(`${protocol}://${host}:${port}/${endpoint}`, {
		method,
		data,
		headers: {
			'Accept': 'application/json, text/javascript, */*; q=0.01',
			'Content-Type': 'application/json'
		},
		
	})
	//TODO filtrer les non 200
	return res.json()
}

/**
 * ensemble des fonctions de l'api
 */
const api = {
	getPorte: async ({config}) => {
		return apiAction('door', 'get', {}, config)
	},

	ouvrirPorte: async ({config}) => {
		return apiAction('door/open', 'get', {}, config)
	},

	fermerPorte: async ({config}) => {
		return apiAction('door/close', 'get', {}, config)
	},

	getAllBDD: async ({config}) => {
		return apiAction('data', 'get', {}, config)
	},

	getBDD: async ({config, id}) => {
		return apiAction(`data/${id}`, 'get', {}, config)
	},

	getCamera: async ({config,}) => {
		return apiAction('camera', 'get', {}, config)
	},

	/**
	 * Une fonction de test pour simuler une requette reussi 
	 * @param {object} data l'object à retourner
	 * @param {number} timeout temps d'attente
	 */
	 fakeAccept: async (data = null, timeout = 0) => {
		return new Promise(async (resolve, _) => {
			setTimeout(() => { 
				resolve(data);
			}, timeout)
		})
	},

	/**
	 * Une fonction de test pour simuler une requette echoué 
	 * @param {object} data l'object à retourner
	 * @param {number} timeout temps d'attente
	 */
	fakeReject: async (data = null, timeout = 0) => {
		return new Promise(async (_, reject) => {
			setTimeout(() => { 
				reject(data);
			}, timeout)
		})
	},
}

export default api
