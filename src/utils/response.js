/**
 * @author Smit Luvani
 * @description This Function creates uniform response for application
 */

const logger = require("../services/winston"),
    httpStatus = require('http-status'),
    { isInteger } = require('lodash')

module.exports = (res, status, message, data, customCode) => {
    // res = response object

    if (!res) {
        return logger.error('Response Object is require to send response')
    }

    if (!status || !isInteger(status)) {
        return logger.error('Valid Status Code is required')
    }

    return res.status(parseInt(status)).json({
        status,
        response: httpStatus[`${status}_NAME`],
        error: (status != 200) ? httpStatus[`${status}_MESSAGE`] : undefined,
        message,
        data,
        customCode
    })
}