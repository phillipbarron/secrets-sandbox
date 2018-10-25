const AWS = require('aws-sdk');

const secretsManager = new AWS.SecretsManager();

const setAllTheSecrets = async () => {
    return await secretsManager.getSecretValue({SecretId: 'Optimo-E2E_Tests_Secrets'}, (error, secrets) =>{
        if(error){
            throw Error(error);
        } 
        const secretsObject = JSON.parse(secrets.SecretString);
        Object.keys(secretsObject).forEach(secretKey => {
            console.log(`Setting ${secretKey} as ${secretsObject[secretKey]}`);
            process.env[secretKey] = secretsObject[secretKey];
        });
    });
}

exports.setAllTheSecrets = setAllTheSecrets;