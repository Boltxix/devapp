//Require necessary modules
var app = require('../app'); //app is a referance to the main application code
var debug = require('debug')('phishsense:server');//debug is a function that logs debug information when the server runs, using a namespace of 'phishsense:server'
var http = require('http');
var https = require('https');
//http and https are node.js modules used for creating HTTP and HTTPS server respectively.
var fs = require('fs');
// fs is a module used for reading file from the file system


// This function is used to normalize the port number from a string to a number
function normPort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port numberrs
        return port;
    }

    return false;
}
/*
 *Even listent that handles errors that occur while trying to listen on a network port. It takes an error objec as its parameter
 *and check its syscall propert. If the syscall is not listen the function throws the error.
 *If the sys call is listen the function checks the error code in the error.code propert. The function than logs a specific error
 *message for each error code and exits the process if necessart
*/
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;


    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }

    //This function is an even listener for HTTP server "error" even.
    //It logs the error message to the console and exits the process if it encounters specific errors
    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }
}
/*
 * This code sets up a server to listen on a specific port. It create an HTTPS server if the environment is not "DEV" and sets up a redirect 
 * from HTTPS to HTTPS. Otherwise, it creates an HTTP server. The private key and certificate are read from files and used for HTTPS.
 * The on error function handles server errors.
*/
var fs = require('fs');
var https = require('https');
var port = normPort(process.env.PORT || '3000'); // Normalize the HTTP port number 
var https_port = process.env.PORT_HTTPS || 8443;// Set the HTTPS port number
var options = {}

//Initialize the server variable which will be used to store the HTTP and HTTPS server istance
var server;

if (process.env.ENV !== "DEV") {
    //If the environemnt is not "DEV", create an HTTPS server and set up redirect from HTTP to HTTPS
    var key = fs.readFileSync('privatekey.pem', "utf8")//Read the private key file from the file system
    console.log(typeof key)
    var cert = fs.readFileSync('server.crt', "utf8")//Read the certificate file from the file system
    var header = "-----BEGIN PRIVATE KEY-----"
    var footer = "-----END PRIVATE KEY-----"
    console.log(key.split(header))

    //Extract the private key from the file contents 
    key = key.split(header)[1]
    key = key.split(footer)[0]
    key = header + "\n" + key.replace(/ /g, "\n") + footer + "\n"

    console.log(key)
    //Extract the certificate from the certificate file
    var header = "-----BEGIN CERTIFICATE-----"
    var footer = "-----END CERTIFICATE-----"
    cert = cert.split(header)[1]
    cert = cert.split(footer)[0]
    cert = header + "\n" + cert.replace(/ /g, "\n") + footer + "\n"
    //Set the options object with the extracted private key and certificate
    var options = {
        key: key,
        cert: cert
    };

    //Set the server's Port number to the HTTPS port number
    app.set("port", https_port);

   // Create the HTTPS server with the "options" object and the "app" instance, and start listening on the HTTPS port
    var server = https.createServer(options, app).listen(https_port, function () {
        console.log('Magic happens on port ' + https_port);
    });

    // Register the onError function as an error listener for the HTTPS server
    server.on('error', onError);

    // Create an HTTP server to redirect HTTP requests to HTTPS, and start listening on the HTTP port
    http.createServer(function (req, res) {
        res.writeHead(301, { "Location": "https://" + req.headers['host'].replace(port, https_port) + req.url });
        console.log("http requet, will go to >> ");
        console.log("https://" + req.headers['host'].replace(port, https_port) + req.url);
        res.end();
    }).listen(port);
} else {
    // Create an HTTP server and start listening on the HTTP port
    var server = http.createServer(app);

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

}