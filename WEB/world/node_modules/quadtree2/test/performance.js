var Quadtree2   = require('../src/quadtree2'),
    Vec2        = require('vec2'),
    assert      = require('assert'),
    should      = require('should'),
    logTime     = function(time) {
      //console.log(time[0] + ' s, ' + ((time[1] / 1e6).toFixed(4)) + ' ms');
    };


describe('Quadtree2', function(){
  context('with a lot of objects', function() {
    it('should be faster then the trivial solution', function() {
      var i,
          qt,
          times       = [],
          objects     = [],
          collisions  = {},
          params      = {
            gameSize        : new Vec2(100000, 100000),
            maxObjectRad    : 20,
            objectCount     : 1000,
            percentOfQuery  : 100
          };

      for (i = 0; i < params.objectCount; i++) {
        objects.push({
          id_   : i + 1,
          rad_  : ~~(Math.random() * params.maxObjectRad),
          q_    : (Math.random() * 100) < params.percentOfQuery,
          pos_  : new Vec2(
            ~~(Math.random() * params.gameSize.x),
            ~~(Math.random() * params.gameSize.y)
          )
        });
      }

      // Start timer
      times[0] = process.hrtime();

      collisions.trivial = {};

      for (i = 0; i < objects.length; i++) {
        if (objects[i].q_) {
          collisions.trivial[objects[i].id_] = {};

          for (j = 0; j < objects.length; j++) {
            if (i === j) continue;

            if (objects[i].rad_ + objects[j].rad_ > objects[i].pos_.distance(objects[j].pos_)) {
              collisions.trivial[objects[i].id_][objects[j].id_] = objects[j];
            }
          }
        }
      }

      times[0] = process.hrtime(times[0]);

      logTime(times[0]);

      collisions.qt = {};


      qt = new Quadtree2(params.gameSize, 2, 8);
      qt.debug(true);

      // It is debetable if adding the objects to the tree
      // should be benchmarked as well. Updating them
      // definitley, but that will be another test.

      for (i = 0; i < objects.length; i++) {
        qt.addObject(objects[i]);
      }

      times[1] = process.hrtime();

      for (i = 0; i < objects.length; i++) {
        if (objects[i].q_) {
          collisions.qt[objects[i].id_] = qt.getCollisionsForObject(objects[i]);
        }
      }

      times[1] = process.hrtime(times[1]);

      logTime(times[1]);

      times[1].should.lessThan(times[0]);
    });
  });
});

