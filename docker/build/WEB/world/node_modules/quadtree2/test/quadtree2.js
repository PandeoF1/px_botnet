var Quadtree2   = require('../src/quadtree2'),
    Vec2        = require('vec2'),
    assert      = require('assert'),
    should      = require('should'),
    defaultSize = new Vec2(100, 100),
    oFactory,
    qtFactory,
    qtFactoryWithObjects;


oFactory = function oFactory(id, pos, radius) {
  var r = {
    id_   : id,
    pos_  : pos     || new Vec2(Math.floor(Math.random() * defaultSize.x), Math.floor(Math.random() * defaultSize.y)),
    rad_  : radius  || 2
  };

  return r;
};

qtFactory = function qtFactory(size, limit, idKey){
  if (!size)  { size = defaultSize.clone(); }
  if (!limit) { limit = 4; }

  return new Quadtree2(size, limit, idKey, true);
};

qtFactoryWithObjects = function qtFactoryWithObjects(count, size, limit, idKey) {
  var i,
      objects = [],
      qt      = qtFactory(size, limit, idKey),
      obj;

  if (!count) count = 100;

  size = qt.getSize();

  for (i = 0; i < count; i++) {
    obj = oFactory();

    obj.pos_ = new Vec2(
      ~~(Math.random() * size.x),
      ~~(Math.random() * size.y)
    );

    objects.push(obj);
  }

  qt.addObjects(objects);

  return qt;
};

describe('Quadtree2', function(){
  describe('constructor', function(){
    context('with inproper arguments', function() {
      it('should throw NaV_size_', function(){
        Quadtree2.bind(null, 1,2).should.throw(/^NaV_size_/);
      });

      it('should throw NaN_quadrantObjectsLimit_', function(){
        Quadtree2.bind(null, new Vec2(2,3), null).should.throw(/^NaN_quadrantObjectsLimit_/);
      });
    });

    context('with proper arguments', function() {
      it('should not throw', function(){
        Quadtree2.bind(null, new Vec2(2,3), 4).should.not.throw();
      });
    });

    context('without limit', function() {
      it('should not throw', function() {
        Quadtree2.bind(null, new Vec2(2,3), undefined).should.not.throw();
      });
    });
  });

  describe('#getSize', function(){
    it('should return just a clone of the size', function() {
      var qt    = qtFactory(new Vec2(2, 3)),
          size  = qt.getSize();

      size.x = 5;

      qt.getSize().x.should.not.eql(5);
      qt.getSize().x.should.eql(2);
    });
  });

  describe('#addObject', function(){
    context('with inproper arguments', function() {
      it('should throw ND_obj', function() {
        var qt = qtFactory();
        qt.addObject.should.throw(/^ND_obj/);
      });

      it('should throw NaO_obj', function() {
        var qt = qtFactory();
        qt.addObject.bind(null, 1).should.throw(/^NaO_obj/);
      });

      it('should throw NaN_rad_', function() {
        var qt = qtFactory(),
            o  = { pos_ : new Vec2(1,2), rad_ : 'x' };

        qt.addObject.bind(null, o).should.throw(/^NaN_rad_/);
      });
    });

    context('with obj id based configuration', function() {
      context('without obj id defined', function() {
        it('should throw NaN_id_', function() {
          var qt = qtFactory(),
              o  = { pos_ : new Vec2(1,2), rad_ : 3 };

          qt.setObjectKey('id', 'id_');
          qt.addObject.bind(null, o).should.throw(/^NaN_id_/);
        });
      });

      context('with used obj id', function() {
        it('should throw OhK_x', function() {
          var qt = qtFactory(),
              o1 = oFactory(),
              o2 = oFactory();

          o2.id_ = o1.id_ = 2;

          qt.setObjectKey('id', 'id_');
          qt.addObject.bind(null, o1).should.not.throw();
          qt.addObject.bind(null, o2).should.throw(/^OhK_id_2/);
        });
      });
    });

    it('should increase the object count', function() {
      var qt = qtFactory(),
          o  = oFactory();

      qt.getCount().should.eql(0);
      qt.addObject(o);
      qt.getCount().should.eql(1);
    });

    it('should assign auto id to the object', function() {
      var qt = qtFactory(),
          o1 = { pos_ : new Vec2(1,2), rad_ : 3 };
          o2 = { pos_ : new Vec2(1,2), rad_ : 3 };

      qt.addObjects([o1, o2]);

      o1.id_.should.not.eql(undefined);
      o2.id_.should.eql(2);
    });
  });

  describe('#setObjectKey', function(){
    context('with inited Quadtree2', function() {
      it('should throw FarT', function() {
        var qt = qtFactoryWithObjects();

        qt.setObjectKey.bind(null, 'p', 'newPos_').should.throw(/^FarT_checkInit/);
      });
    });
  });

  describe('#getQuadrantCount', function(){
    context('with some objects', function() {
      it('should behave correctly - 1', function() {
        var qt = qtFactory(new Vec2(100, 100), 1, 3),
            o1 = oFactory(null, new Vec2(2,2), 1),
            o2 = oFactory(null, new Vec2(98,98), 1),
            o3 = oFactory(null, new Vec2(52,2), 1),
            o4 = oFactory(null, new Vec2(70,3), 1),

            checkSingleQss = function(qss, qssLength, leftTop, size) {
              Object.keys(qss).length.should.eql(qssLength);
              if (qss.length !== 1) { return; }
              for (var id in qss) {
                qss[id].leftTop_.should.eql(leftTop);
                qss[id].size_.should.eql(size);
              }
            };

        qt.debug(true);
        qt.addObjects([o1, o2]);
        qt.getQuadrantCount().should.eql(5);

        qt.addObjects([o3, o4]);
        qt.getQuadrantCount().should.eql(13);
        checkSingleQss(qt.getSmallestIntersectingQuadrants(o3), 1, new Vec2(50, 0), new Vec2(6.25, 6.25));
      });

      it('should behave correctly', function() {
        var qt = qtFactory(new Vec2(100, 100), 4),
            o1 = oFactory(null, new Vec2(2,2), 1),
            o2 = oFactory(null, new Vec2(4,4), 1),
            o3 = oFactory(null, new Vec2(4,2), 1),
            o4 = oFactory(null, new Vec2(2,4), 1),
            o5 = oFactory(null, new Vec2(6,2), 1);

        qt.debug(true);
        qt.addObjects([o1, o2, o3, o4, o5]);
        qt.getQuadrantCount().should.eql(21);
        qt.getLeafQuadrants().length.should.eql(16);
      });

      it('should return the right count', function() {
        qtFactoryWithObjects(1, null, 4).getQuadrantCount().should.eql(1);
      });

      it('should return the right count', function() {
        qtFactoryWithObjects(4, null, 4).getQuadrantCount().should.eql(1);
      });

      it('should return more quadrants', function() {
        var qt = qtFactoryWithObjects(1000, new Vec2(1000, 1000), 20);
        qt.getQuadrantCount().should.above(50);
        qt.getQuadrantCount().should.below(150);
      });
    });
  });

  describe('#updateObjects', function(){
    beforeEach(function() {
      var qt = qtFactory(new Vec2(100, 100), 2),
          o1 = oFactory(null, new Vec2(3,  3), 1),
          o2 = oFactory(null, new Vec2(3,  4), 2);

      qt.addObjects([o1, o2]);

      this.qt = qt;
    });

    afterEach(function() {
      delete this.qt;
    });

    context('with moving object into a full quadrant', function() {
      it('should increase the quadrants count', function() {
        var o3 = oFactory(null, new Vec2(60, 4), 2);

        this.qt.addObject(o3);
        this.qt.getQuadrantCount().should.eql(5);

        o3.pos_.x = 40;

        this.qt.updateObject(o3);
        this.qt.getQuadrantCount().should.eql(9);
      });
    });

    context('with moving object out of a full quadrant', function() {
      it('should decrease the quadrants count', function() {
        var o3 = oFactory(null, new Vec2(40, 4), 2);

        this.qt.addObject(o3);
        this.qt.getQuadrantCount().should.eql(9);

        o3.pos_.x = 60;

        this.qt.updateObject(o3);
        this.qt.getQuadrantCount().should.eql(5);
      });
    });

    context('with moving object out of the quadtree', function() {
      it('should have no quadrants', function() {
        var o3 = oFactory(null, new Vec2(60, 4), 2);

        this.qt.addObject(o3);
        this.qt.getQuadrantCount().should.eql(5);

        o3.pos_.x = -40;
        o3.pos_.y = -40;

        this.qt.updateObject(o3);
        this.qt.getQuadrantCount().should.eql(1);
      });
    });
  });

  describe('#removeObject', function(){
    context('with a nearly refactorable quadrant and subquadrants', function() {
      beforeEach(function() {
        var qt = qtFactory(new Vec2(100, 100), 3),
            o1 = oFactory(1, new Vec2(3,  3), 1),
            o2 = oFactory(2, new Vec2(3,  4), 2),
            o3 = oFactory(3, new Vec2(3,  3), 2),
            o4 = oFactory(4, new Vec2(40,  4), 2);

        qt.addObjects([o1, o2, o3, o4]);

        this.o4 = o4;
        this.qt = qt;
      });

      afterEach(function() {
        delete this.qt;
      });

      it('should reassign those objects', function() {
        this.qt.removeObject(this.o4);
        this.qt.debug(true);
        this.qt.getCount().should.eql(3);

      });

      it('should refactor recursively', function() {
        this.qt.getQuadrantCount().should.eql(9);
        this.qt.removeObject(this.o4);
        this.qt.getQuadrantCount().should.eql(1);
      });
    });
  });

  describe('#data_.root_', function(){
    context('when adding items', function() {
      it('should not change', function() {
        var qt = qtFactory(),
            id,
            i;

        qt.debug(true);

        id = qt.data_.root_.id_;

        for (i = 0; i < 50; i++) {
          qt.addObject(oFactory());
        }

        qt.data_.root_.id_.should.eql(id);
      });
    });
  });

  describe('#getPossibleCollisionsForObject', function(){
    context('with non-colliding objects', function() {
      it('should return an empty object', function() {
        var qt = qtFactory(new Vec2(100, 100), 2),
            o1 = oFactory(1, new Vec2(20,20), 5),
            o2 = oFactory(2, new Vec2(42,52), 5),
            o3 = oFactory(3, new Vec2(10,11), 2),
            o4 = oFactory(4, new Vec2(50,52), 30),
            o5 = oFactory(5, new Vec2(62,62), 5),
            o6 = oFactory(6, new Vec2(62,82), 5),
            o7 = oFactory(7, new Vec2(22,22), 5);

        qt.addObjects([o1, o2, o3, o4, o5, o6, o7]);

        qt.getPossibleCollisionsForObject(o1).should.eql({ 3 : o3, 4 : o4, 7 : o7 });
      });
    });

    context('with some colliding objects', function() {
      it('should return the two objects in the correct order', function() {
        var qt = qtFactory(new Vec2(100, 100), 2),
            o1 = oFactory(3, new Vec2(20,20), 5),
            o2 = oFactory(2, new Vec2(22,22), 5),
            o3 = oFactory(4, new Vec2(60,60), 2);


        qt.debug(true);
        qt.addObjects([o1, o2, o3]);
        (qt.data_.quadrants_[2][qt.data_.root_.id_] === undefined).should.eql(true);

        qt.getPossibleCollisionsForObject(o1).should.eql({ 2 : o2 });
      });
    });
  });

  describe('#getCollisionsForObject', function(){
    context('with non-colliding objects', function() {
      it('should return an empty object', function() {
        var qt = qtFactory(),
            o1 = oFactory(1, new Vec2(20,20), 5),
            o2 = oFactory(2, new Vec2(42,52), 5);

        qt.addObjects([o1, o2]);

        qt.getCollisionsForObject(o1).should.eql({});
      });
    });

    context('with some colliding objects', function() {
      it('should return the two objects in the correct order', function() {
        var qt = qtFactory(new Vec2(100, 100), 2),
            o1 = oFactory(1, new Vec2(20,20), 5),
            o2 = oFactory(2, new Vec2(42,52), 5),
            o3 = oFactory(3, new Vec2(10,11), 2),
            o4 = oFactory(4, new Vec2(50,52), 30),
            o5 = oFactory(5, new Vec2(62,62), 5),
            o6 = oFactory(6, new Vec2(62,82), 5),
            o7 = oFactory(7, new Vec2(22,22), 5);

        qt.addObjects([o1, o2, o3, o4, o5, o6, o7]);

        qt.getCollisionsForObject(o1).should.eql({ 7 : o7 });
      });
    });
  });
});
