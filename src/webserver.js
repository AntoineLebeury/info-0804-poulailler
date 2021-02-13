const qs = require('querystring');
const readline = require('readline-sync');

/* Vérification de l'adresse IP qui doit correspondre à l'adresse IP locale ou sur le réseau */
var host = '';
const regex_ip = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
while(!regex_ip.test(host)) {
    host = readline.question('Adresse IP : ');
}

/* Définition du numéro de port */
const port = 8080;
const content = require('fs').readFileSync(__dirname + '/public/index.html', 'utf-8');

var data;

/**
 * Crée le serveur avec un handler permettant de gérer les requêtes HTTP
 * @param {HTTPRequest} req : requête HTTP
 * @param {HTTPResponse} res : réponse HTTP du serveur
 */
const httpServer = require('http').createServer((req, res) => {
    if(req.method === 'POST') {
        // Récupération des données du corps de la requête
        var body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            console.log(body)
        });
    } 
});

const io = require('socket.io')(httpServer);

io.on('connection', socket => {
    setInterval(() => {
        data_json = qs.parse(data);
        socket.emit('receive_data', data_json);
    }, 20);
})

/**
 * Mise en écoute du serveur à l'adresse et le port
 * passés en paramètres
 * @param {int} port : numéro de port
 * @param {string} host : adresse du serveur
 */
httpServer.listen(port, host, () => {
    console.log('Server is running on http://' + host + ':' + port);
});
