var Quadtree2Helper     = require('../src/quadtree2helper'),
    assert              = require('assert'),
    should              = require('should'),
    shortArr            = [3, 1, 2],
    shortSortedArr      = [1, 2, 3],
    similarArr          = [11, 14],
    similarArrExtended  = [2, 3, 11, 14],
    longArr             = [5, 6, 7, 4, 3, 8, 9],
    longSortedArr       = [3, 4, 5, 6, 7, 8, 9],
    longArrBigs         = [24, 2, 1, 555, 12, 355, 2, 24, 31, 15, 62],
    longSortedArrBigs   = [1, 2, 2, 12, 15, 24, 24, 31, 62, 355, 555];

describe('Quadtree2Helper', function(){
  describe('.arrayDiffs', function(){
    context('with two empty arrays', function() {
      it('should return an array of two empty array', function() {
        Quadtree2Helper.arrayDiffs([], []).should.eql([[], []]);
      });
    });

    context('with arrays of same content', function() {
      it('should return an array of two empty array', function() {
        Quadtree2Helper.arrayDiffs(shortSortedArr, shortArr).should.eql([[], []]);
      });

      it('should return an array of two empty array', function() {
        Quadtree2Helper.arrayDiffs(longSortedArr, longArr).should.eql([[], []]);
      });

      it('should return an array of two empty array', function() {
        Quadtree2Helper.arrayDiffs(longSortedArrBigs, longArrBigs).should.eql([[], []]);
      });
    });

    context('with arrays of similar content', function() {
      it('should return only the difference', function() {
        Quadtree2Helper.arrayDiffs(similarArr, similarArrExtended).should.eql([[], [2, 3]]);
      });
    });

    context('with arrays of different content', function() {
      it('should return only the different content', function() {
        Quadtree2Helper.arrayDiffs(shortSortedArr, [1]).should.eql([[2,3], []]);
      });

      it('should return only the different content', function() {
        Quadtree2Helper.arrayDiffs(shortSortedArr, longArr).should.eql([[1,2], [4,5,6,7,8,9]]);
      });

      it('should return only the different content', function() {
        Quadtree2Helper.arrayDiffs(longArr, [9, 5, 1, 10]).should.eql([[3,4,6,7,8], [1, 10]]);
      });

      it('should return only the different content', function() {
        Quadtree2Helper.arrayDiffs(longArrBigs, [2, 31, 122, 555, 62, 11, 58]).should.eql([[1, 2, 12, 15, 24, 24, 355], [11, 58, 122]]);
      });
    });
  });
});
