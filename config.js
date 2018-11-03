// create and export configuration variables

var environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging'
};

environments.production = {
    port: 5000,
    envName: 'production'
};

var envPassed = typeof(process.env.NODE_ENV) == 'string'?process.env.NODE_ENV.toLowerCase() : '';

var env = typeof(environments[envPassed]) == 'object' ? environments[envPassed]: environments.staging;

module.exports = env;
