const Api = require('xu-api')
const config = require('../../../config')
const host = config.dev ? config.hostDev : config.hostProd
const _api = new Api(host)
module.exports = _api
