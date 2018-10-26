const awsCredentialsService = require('./lib/wormhole-credentials-service');
const secretService = require('./lib/secret-manager-service');


const exportAllSecretsAsEnvironmentVariables = async (secrets) => {
    try {
        await awsCredentialsService.setCredentials()
    } catch (error) {
        console.log('failed to set aws credentials', error);
        return 1;
    }
    
    try{
        await secretService.setAllTheSecrets(secretsId);
    } catch (error) {
        console.log('failed to set set environment variables', error);
        return 1;
    }
}

exports.setAllSecretValuesAsEnvironmentVariables = exportAllSecretsAsEnvironmentVariables;