exports.onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error
    }

    switch (error.code) {
        case 'EACCES':
            console.error('app requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error('port is already in use');
            process.exit(1);
        default:
            throw error
    }
};

exports.onListening = (server, addr = server.address()) => console.log(`Listening on: ${
    typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`
    }`);

exports.healthCheck = (req, res) => res.status(200).send('Ok!');

/*
exports.logMigrations = (err, stdout, stderr) => {
    err && console.error(`err while migration:\n${err}`);
    stdout && console.log(`stdout:\n${stdout}`);
    stderr && console.error(`stderr:\n${stderr}`)
};*/
