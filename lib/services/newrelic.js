var
  nr;

module.exports = function (kuzzle) {
  this.kuzzle = kuzzle;

  this.init = function () {
    var controllers = ['write', 'read', 'admin', 'bulk'];

    if (!process.env.NEW_RELIC_APP_NAME) {
      return false;
    }

    nr = require('newrelic');
    this.kuzzle = kuzzle;

    controllers.forEach(function (controller) {
      this.kuzzle.hooks.add(controller+':rest:start', 'monitoring:logRest');
      this.kuzzle.hooks.add(controller+':mq:start', 'monitoring:logMq');
      this.kuzzle.hooks.add(controller+':websocket:start', 'monitoring:logWs');
    }.bind(this));

    this.kuzzle.pluginsManager.trigger('log:info', 'Monitoring service is enabled');
  };

  /**
   * Send to Newrelic the new transaction with the protocol, the controller and the action called
   *
   * @param {String} protocol can be websocket, mq or rest
   * @param {RequestObject|ResponseObject|RealTimeResponseObject} modelObject
   */
  this.log = function (protocol, modelObject) {
    nr.setTransactionName(protocol + '/' + modelObject.controller + '/' + modelObject.action);
  };
};