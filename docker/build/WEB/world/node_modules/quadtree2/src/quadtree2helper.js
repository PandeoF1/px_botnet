var Quadtree2Helper = {
  fnName : function fnName(fn) {
    var ret = fn.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
  },

  // A verbose exception generator helper.
  thrower : function thrower(code, message, key) {
    var error = code;

    if(key)             { error += '_' + key; }
    if(message)         { error += ' - '; }
    if(message && key)  { error += key + ': '; }
    if(message)         { error += message; }

    throw new Error(error);
  },

  getIdsOfObjects : function getIdsOfObjects(hash) {
    var result = [];

    for (var id in hash) {
      result.push(hash[id].id_);
    }

    return result;
  },

  compare : function compare(a,b) {
    return a - b;
  },

  arrayDiffs : function arrayDiffs(arrA, arrB) {
    var i = 0,
        j = 0,
        retA = [],
        retB = [];

    arrA.sort(this.compare);
    arrB.sort(this.compare);

    while (i < arrA.length && j < arrB.length) {
      if (arrA[i] === arrB[j]) {
        i++;
        j++;
        continue;
      }

      if (arrA[i] < arrB[j]) {
        retA.push(arrA[i]);
        i++;
        continue;
      } else {
        retB.push(arrB[j]);
        j++;
      }
    }

    if(i < arrA.length) {
      retA.push.apply(retA, arrA.slice(i, arrA.length));
    } else {
      retB.push.apply(retB, arrB.slice(j, arrB.length));
    }

    return [retA, retB];
  }
};

module.exports = Quadtree2Helper;
