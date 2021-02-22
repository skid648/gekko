const _ = require('lodash');
const fs = require('co-fs');

const gekkoRoot = __dirname + '/../../';
var util = require(__dirname + '/../../core/util');

var config = {};

config.debug = false;
config.silent = false;

util.setConfig(config);

module.exports = function *() {
  const exchangesDir = yield fs.readdir(gekkoRoot + 'exchange/wrappers/');
  const exchanges = exchangesDir
  .filter(f => _.last(f, 3).join('') === '.js')
  .map(f => f.slice(0, -3));

  let allCapabilities = [];

  exchanges.forEach(function (exchange) {
    let Trader = null;

    try {
      Trader = require(gekkoRoot + 'exchange/wrappers/' + exchange);
      console.log(`Trying to load ${exchange} from ${gekkoRoot}exchange/wrappers/${exchange}.js`)
      Trader = require(`${gekkoRoot}exchange/wrappers/${exchange}.js`);
    } catch (e) {
      console.error(`Failed to load ${e}. Reason: ${e}`)
      return;
    }

    console.log(`${exchange}`, Trader, Trader.getCapabilities)

    if (!Trader || !Trader.getCapabilities) {
      return;
    }

    allCapabilities.push(Trader.getCapabilities());
  });

  this.body = allCapabilities;
}

