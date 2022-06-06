var Vec2                = require('vec2'),
    Quadtree2Helper     = require('./quadtree2helper'),
    Quadtree2Validator  = function Quadtree2Validator() {};

Quadtree2Validator.prototype = {
  isNumber : function isNumber(param, key) {
    if ('number' !== typeof param) {
      Quadtree2Helper.thrower('NaN', 'Not a Number', key);
    }
  },

  isString : function isString(param, key) {
    if (!(typeof param === 'string' || param instanceof String)) {
      Quadtree2Helper.thrower('NaS', 'Not a String', key);
    }
  },

  isVec2 : function isVec2(param, key) {
    var throwIt = false;

    throwIt = 'object' !== typeof param || param.x === undefined || param.y === undefined;

    if(throwIt) {
      Quadtree2Helper.thrower('NaV', 'Not a Vec2', key);
    }
  },

  isDefined : function isDefined(param, key) {
    if (param === undefined) {
      Quadtree2Helper.thrower('ND', 'Not defined', key);
    }
  },

  isObject : function isObject(param, key) {
    if ('object' !== typeof param) {
      Quadtree2Helper.thrower('NaO', 'Not an Object', key);
    }
  },

  hasKey : function hasKey(obj, k, key) {
    this.isDefined(obj, 'obj');
    if ( Object.keys(obj).indexOf(k.toString()) === -1 ) {
      Quadtree2Helper.thrower('OhnK', 'Object has no key', key + k);
    }
  },

  hasNoKey : function hasNoKey(obj, k, key) {
    this.isDefined(obj, 'obj');
    if ( Object.keys(obj).indexOf(k.toString()) !== -1 ) {
      Quadtree2Helper.thrower('OhK', 'Object has key', key + k);
    }
  },

  fnFalse : function fn(cb) {
    if(cb()) {
      Quadtree2Helper.thrower('FarT', 'function already returns true', Quadtree2Helper.fnName(cb));
    }
  },

  byCallbackObject : function byCallbackObject(obj, cbObj, keyTable) {
    var key;
    for (key in cbObj) {
      if (keyTable !== undefined) {
        cbObj[key](obj[keyTable[key]], keyTable[key]);
      } else {
        cbObj[key](obj[key], key);
      }
    }
  }
};

module.exports = Quadtree2Validator;
