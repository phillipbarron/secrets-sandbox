const AWS = require('aws-sdk');

let options = process.env.AWS_REGION ? {} : {region: 'eu-west-1'};

const secretsManager = new AWS.SecretsManager(options);

const setAllTheSecrets = async (secretsId) => {
    return await secretsManager.getSecretValue({SecretId: secretsId}, (error, secrets) =>{
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