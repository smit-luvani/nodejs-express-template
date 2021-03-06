/**
 * @author Smit Luvani
 * @description Create Bearer Token for Object
 * @module https://www.npmjs.com/package/jsonwebtoken
 */

const jwt = require('jsonwebtoken'),
    { jwt: secrets } = require('../../config/secrets.json'),
    logger = require('../winston'),
    { logging } = require('../../config/default.json')

module.exports.sign = (object) => {
    try {
        const token = object ? jwt.sign(object, secrets[process.env.NODE_ENV]) : undefined;

        if (!token) {
            logger.error('Service [JWT]: String/Object Required to create Sign Token')
            return false
        }

        logging.jwt ? logger.info('Service [JWT]: Token: ' + token) : null;

        return token;
    } catch (error) {
        logger.error('Service [JWT]: ' + error)
        return null
    }
}

module.exports.verify = (token) => {
    try {
        logger.info((token, jwt.verify(token, secrets[process.env.NODE_ENV])) ? JSON.stringify(jwt.verify(token, secrets[process.env.NODE_ENV])) : 'Token Decode Failed/Expired')
        return token ? jwt.verify(token, secrets[process.env.NODE_ENV]) : false;
    } catch (error) {
        logger.error('Service [JWT]: ' + error)
        return false;
    }
}