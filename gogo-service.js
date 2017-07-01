var util = require('util');

var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var CurrentSpeedCharacteristic = require('./current-speed-characteristic');

function GoGoService() {
  GoGoService.super_.call(this, {
      uuid: 'FFF0',
      characteristics: [
          new CurrentSpeedCharacteristic()
      ]
  });
}

util.inherits(GoGoService, BlenoPrimaryService);

module.exports = GoGoService;
