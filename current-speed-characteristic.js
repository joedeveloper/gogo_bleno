var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var CurrentSpeedCharacteristic = function() {
  CurrentSpeedCharacteristic.super_.call(this, {
    uuid: 'FFC3',
    properties: ['read', 'notify'],
    descriptors: [
      new Descriptor({
        uuid: '2901',
        value: 'Current Speed'
      }),
      new Descriptor({
        uuid: '2904',
        value: new Buffer([0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00 ]) // maybe 12 0xC unsigned 8 bit
      })
    ]
  });
  this._updateValueCallback = null;

  onNotify = function(){
    console.log('notify');
  }
};

util.inherits(CurrentSpeedCharacteristic, Characteristic);

var val = 0;
var incr = 1;
function updateVal(){
  if (val === 15){
    incr = -1;
  }
  if (val === 0 ){
    incr = 1;
  }
  val += incr;
  console.log(val);
}
setInterval(updateVal, 1000);

CurrentSpeedCharacteristic.prototype.onReadRequest = function(offset, callback) {
    callback(this.RESULT_SUCCESS, new Buffer([val]));
};


CurrentSpeedCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback){
  console.log('CurrentSpeedCharacteristic - onSubscribe');

  this._updateValueCallback = updateValueCallback;
  setInterval(function(){
    //updateVal();
    updateValueCallback(new Buffer([val]));

  },1000);


};

CurrentSpeedCharacteristic.prototype.onUnsubscribe = function() {
  console.log('CurrentSpeedCharacteristic - onUnsubscribe');

  this._updateValueCallback = null;
};

module.exports = CurrentSpeedCharacteristic;
