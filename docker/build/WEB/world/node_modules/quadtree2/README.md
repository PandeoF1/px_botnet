# Quadtree2.js
is a Node.js [npm-package][npm] / JavaScript implementation of two dimensional quadtree for collision detection. Exported for client side use with the help of [browserify][browserify].
It is a work in progress, look for the first stable release if interested.

[![Build Status][travis-img-src]][travis-a-href]

## Important notes
After experimenting around with performance tests, the current implementation does not justify the use in **game projects**. I've started the [grid2.js][github-grid2] project for collision detection and ray casting calculations in two dimensional space. It is not scaling structure, but performs lot better at the moment in browser games. Give it a try, if that is your use case.

## Try it!
Visit the projects [GitHub IO Page][github-io] and play around.

If you notice incorrect behavior please click on the "Log" button, copy the stuff and post it in the [issues][github-issues] and describe the problem \(or see the [contribute](#contribute) section\).

## About
A quadtree is a scaling data structure for collision detection. You can find theory on the [WIKI][wiki].

A simple example usecase would be a two dimensional game, with some moving objects like bullets and players. You want to know when a collision occours. Could easly just compare all the objects position with each other, but if there are a lot of them, that is not the right thing to do.

Upon adding objects to the quadtree you either specify the unique number identifier attribute of the objects, like `id`, or the quadtree will do this automatically.

## Install
- browser
  - include the [quadtree2.min.js][minified]
- Node.js
  - `var Vec2 = require('vec2');`
  - `var Quadtree2 = require('quadtree2');`

## Contribute
If you want to submit a bugfix, push a test for it as well \(should fail without the fix\).

- test with mocha \(after `npm install`\) `grunt test` or `grunt watch` if you want to run the tests on every change in source files
- test with browser by opening the index.html
- build it with `grunt`

If you've played around on the [GitHub IO Page][github-io] and noticed some incorrect behavior click on the "Log" button, copy the code and create a test case in the [test/demos.js][test-demo] file. I'm glad for just a test without any fix as well.

Please follow the [git flow][gitflow] branching model.

## Use
```javascript
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
```

## License
[MIT License][git-LICENSE]

  [git-LICENSE]: LICENSE
  [travis-img-src]: https://travis-ci.org/burninggramma/quadtree2.js.png?branch=master
  [travis-a-href]: https://travis-ci.org/burninggramma/quadtree2.js
  [minified]: https://github.com/burninggramma/quadtree2.js/blob/master/quadtree2.min.js
  [wiki]: http://en.wikipedia.org/wiki/Quadtree
  [browserify]: http://browserify.org/
  [gitflow]: https://github.com/nvie/gitflow
  [github-io]: http://burninggramma.github.io/quadtree2.js
  [github-issues]: https://github.com/burninggramma/quadtree2.js/issues
  [github-grid2]: https://github.com/burninggramma/grid2.js
  [test-demo]: test/demos.js
  [npm]: https://www.npmjs.org/package/quadtree2
