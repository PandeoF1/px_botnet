var Quadtree2 = require('../src/quadtree2'),
    Vec2      = require('vec2'),
    assert    = require('assert'),
    should    = require('should');

describe('README', function() {
  context('with the example', function() {
    it('should work', function() {
      // BEG README

      var // Variable to save the collisions
          alicesCollisions,
          bobsCollisions,
          bobsDeadlyCollisions,

          // This will initialize a quadtree with a 100x100 resolution,
          // with an object limit of 3 inside a quadrant.
          quadtree = new Quadtree2(new Vec2(100, 100), 3),

          // Alice will be staying fierce in the top left ...
          alice = {
            pos_ : new Vec2(20, 20),
            rad_ : 3
          },

          // ... with his rocket luncher, gonna try to shoot bob ...
          rocket = {
              pos_ : new Vec2(20, 20),
              rad_ : 5
          },

          // ... however there is a bunker on the field ...
          bunker = {
            pos_ : new Vec2(50, 50),
            rad_ : 10
          },

          // ... will it save bob?
          bob = {
            pos_ : new Vec2(80, 80),
            rad_ : 3
          };


      // Add all of our beloved character to the quadtree.
      quadtree.addObjects([alice, rocket, bunker, bob]);

      // On the start Alice collides with her own rocket.
      alicesCollisions = quadtree.getCollisionsForObject(alice);
      // Object.keys(alicesCollisions).length;
      // >> 1;

      // Bob is just sitting and waiting.
      bobsCollisions = quadtree.getCollisionsForObject(bob);
      // Object.keys(bobsCollisions).length;
      // >> 0;

      // The rocket flys over to bob
      rocket.pos_.x = 78;
      rocket.pos_.y = 78;

      // Update our data structure
      quadtree.updateObject(rocket);
      
      // Lets get the deadly hit
      bobsDeadlyCollisions = quadtree.getCollisionsForObject(bob);
      // Object.keys(bobsDeadlyCollisions).length;
      // >> 1;

      // END README

      // Test it!
      alicesCollisions.should.eql({ 2 : rocket });
      bobsCollisions.should.eql({});
      bobsDeadlyCollisions.should.eql({ 2 : rocket });
    });
  });
});
