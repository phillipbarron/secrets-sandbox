const rp = require('request-promise');
const fs = require('fs');


const setCredentials = async() => {
    var options = {
        url: `https://wormhole.api.bbci.co.uk/account/${process.env.AWS_ACCOUNT_NUMBER}/credentials`,
        cert: fs.readFileSync(process.env.CERT_LOCATION || '/etc/pki/tls/certs/client.crt'),
        key: fs.readFileSync(process.env.COSMOS_CERT_KEY ||  '/etc/pki/tls/private/client.key'),
        ca: fs.readFileSync(process.env.COSMOS_CA)
    };    
    await rp.get(options).then(response => {
        const credentials =  JSON.parse(response);
        process.env.AWS_ACCESS_KEY_ID = credentials.accessKeyId;
        process.env.AWS_SECRET_ACCESS_KEY = credentials.secretAccessKey;
        process.env.AWS_SESSION_TOKEN = credentials.sessionToken;
    });
}

exports.setCredentials = setCredentials;