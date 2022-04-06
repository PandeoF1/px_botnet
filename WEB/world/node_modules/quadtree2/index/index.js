window.onload = function () {
  app = {
    w_                          : 500,
    h_                          : 500,
    limit_                      : 4,
    rad_                        : 20,
    chance_                     : 50,
    addChance_                  : 70,
    mouseAction_                : 0,
    objCount_                   : 0,
    quadCount_                  : 0,
    logLength_                  : 0,
    objects_                    : {},
    collidedObjects_            : {},
    oldCollidedObjects_         : {},
    possibleCollidedObjects_    : {},
    oldPossibleCollidedObjects_ : {},
    closestObj_                 : null,
    oldClosestObj_              : null,
    movedObj_                   : null,
    log_                        : '',
    logShown_                   : false,
    change_                     : false,
    rerender_                   : false,
    autoAdd_                    : false,
    $app                        : document.getElementById('app'),
    $autoAdd                    : document.getElementById('app-autoAdd'),
    $autoAdd_                   : document.getElementById('app-autoAdd_'),
    $mouseAction                : document.getElementById('app-mouseAction'),
    $mouseAction_               : document.getElementById('app-mouseAction_'),
    $closestObjId_              : document.getElementById('app-closestObjId_'),
    $closestObjQuadrantIds_     : document.getElementById('app-closestObjQuadrantIds_'),
    $logInfo                    : document.getElementById('app-logInfo'),
    $logInfo_                   : document.getElementById('app-logInfo_'),
    $log                        : document.getElementById('app-log'),
    $graphics_                  : document.getElementById('app-graphics_'),
    $objCount_                  : document.getElementById('app-objCount_'),
    $quadCount_                 : document.getElementById('app-quadCount_'),

    colors_ : {
      neutral   : 0xd3d3d3,
      selected  : 0x9253ee,
      collided  : 0xee2211,
      neighbor  : 0x11aea7
    }
  };

  app.renderer  = PIXI.autoDetectRenderer(app.w_, app.h_);
  app.stage     = new PIXI.Stage(0x353535, true);
  app.graphics  = new PIXI.Graphics();

  app.mouseActionTranslation = function mouseActionTranslation() {
    return {
      0 : 'add',
      1 : 'remove',
      2 : 'move'
    }[app.mouseAction_];
  };

  app.getClosestObjectToPoint = function getClosestObjectToPoint(point) {
    var id,
        obj,
        dist,
        firstKey    = Object.keys(app.objects_)[0],
        closestObj  = firstKey && app.objects_[firstKey],
        closestDist = !closestObj || closestObj.pos_.distance(point);

    if (!closestObj) { return; }

    for (id in app.objects_) {
      obj   = app.objects_[id];
      dist  = obj.pos_.distance(point);
      if (dist < closestDist) {
        closestDist = dist;
        closestObj = obj;
      }
    }

    return closestObj;
  };

  app.vectorFromMouseEvent = function vectorFromMouseEvent(e) {
    var off = $(app.$graphics_).parent().offset(); 
    return new Vec2(e.pageX - off.left, e.pageY - off.top);
  };

  app.handleMouseClick = function handleMouseClick(e) {
    var point = app.vectorFromMouseEvent(e);

    switch (app.mouseAction_) {

    case 0:
      app.addObject({ pos_ : point });
      break;
    case 1:
      app.removeObject(app.closestObj_);
      break;
    case 2:
      app.movedObj_ = app.movedObj_ ? null : app.closestObj_;
      if (app.movedObj_) { app.moveObject(point); }
      break;
    }

    app.updateClosestObject(point);

    app.change();
    e.stopPropagation();
  };

  app.updatePossibleCollidedObjects = function updatePossibleCollidedObjects() {
    var id;

    for (id in app.oldPossibleCollidedObjects_) {
      app.oldPossibleCollidedObjects_[id].c_ = undefined;
    }

    app.possibleCollidedObjects_ = app.qt.getPossibleCollisionsForObject(app.closestObj_);

    for (id in app.possibleCollidedObjects_) {
      app.possibleCollidedObjects_[id].c_ = app.colors_.neighbor;
    }

    app.oldPossibleCollidedObjects_ = app.possibleCollidedObjects_;
  };

  app.updateCollidedObjects = function markCollidedObjects() {
    var id;

    for (id in app.oldCollidedObjects_) {
      app.oldCollidedObjects_[id].c_ = undefined;
    }

    app.collidedObjects_ = app.qt.getCollisionsForObject(app.closestObj_);

    for (id in app.collidedObjects_) {
      app.collidedObjects_[id].c_ = app.colors_.collided;
    }

    app.oldCollidedObjects_ = app.collidedObjects_;
  };

  app.handleMouseMove = function handleMouseMove(e) {
    app.updateClosestObject(app.vectorFromMouseEvent(e));
  };

  app.updateClosestObject = function updateClosestObject(point) {
    var id;

    if (app.oldClosestObj_) { app.oldClosestObj_.c_ = undefined; }

    if (app.movedObj_) {
      app.moveObject(point);
      app.closestObj_ = app.movedObj_;
    } else {
      app.closestObj_ = app.getClosestObjectToPoint(point);
    }

    if (!app.closestObj_) { return; }

    app.updatePossibleCollidedObjects();
    app.updateCollidedObjects();

    app.closestObj_.c_ = app.colors_.selected;
    app.oldClosestObj_ = app.closestObj_;

    app.change();
  };

  app.handleMouseOut = function handleMouseOut() {
    app.movedObj_ = null;
  };

  app.update = function update() {
    if (app.autoAdd_) {
      app.addObject();
    }

    if (app.change_) {
      app.info();
      app.redraw();
      app.updateObject();
      app.change_ = false;
    }

    app.renderer.render(app.stage);
  };

  app.info = function info() {
    app.quadCount_ = app.qt.getQuadrantCount();
    app.objCount_  = app.qt.getCount();

    app.$objCount_.innerHTML     = app.objCount_;
    app.$quadCount_.innerHTML    = app.quadCount_;
    app.$autoAdd_.innerHTML      = app.autoAdd_;
    app.$mouseAction_.innerHTML  = app.mouseActionTranslation();
    app.$logInfo_.innerHTML      = app.logLength_;
    app.$closestObjId_.innerHTML = app.closestObj_ && app.closestObj_.id_ || 'n/a';
    app.$closestObjQuadrantIds_.innerHTML = app.closestObj_ && JSON.stringify(Object.keys(app.qt.data_.quadrants_[app.closestObj_.id_])) || 'n/a';

    if (app.logShown_) {
      app.$log.innerHTML = app.log_;
    }
  };

  app.redraw = function redraw() {
    app.graphics.clear();
    app.qt.getQuadrants().forEach(function(quadrant){
      app.drawQuadrant(quadrant);
    });
  };

  app.createRandomObject = function createRandomObject() {
    var s = app.qt.getSize();
    return { pos_ : new Vec2(~~(Math.random() * s.x), ~~(Math.random() * s.y)) };
  };

  app.change = function change(key) {
    if(key) app[key+'_'] = !app[key+'_'];
    app.change_ = true;
  };

  app.chance = function chance(percent) {
    return Math.random() * 100 < ( percent || app.chance_ );
  };

  app.addObject = function addObject(obj) {
    if(obj || app.chance(app.addChance_)) {
      obj = obj || app.createRandomObject();
      obj.rad_ = ~~(Math.random() * app.rad_) + 1;
      app.qt.addObject(obj);
      app.objects_[obj.id_] = obj;
      app.change();

      app.log('var o' + obj.id_ + ' = { pos_ : new Vec2(' + obj.pos_.x + ', ' + obj.pos_.y + '), rad_ : ' + obj.rad_ + ' };');
      app.log('qt.addObject(o' + obj.id_ + ');');
    }
  };

  app.removeObject = function removeObject(obj) {
    app.qt.removeObject(obj);
    delete app.objects_[obj.id_];
    app.change();

    app.log('qt.removeObject(o' + obj.id_ + ');');
  };

  app.moveObject = function moveObject(point) {
    app.movedObj_.pos_ = point;
    app.change();

    app.log('o' + app.movedObj_.id_ + '.pos_ = new Vec2(' + point.x + ', ' + point.y + ');');
  };

  app.updateObject = function updateObject() {
    if (!app.movedObj_) { return; }

    app.qt.updateObject(app.movedObj_);

    app.log('qt.updateObject(o' + app.movedObj_.id_ + ');');
  };


  app.drawQuadrant = function drawQuadrant(quadrant) {
    var id, o;
    app.graphics.lineStyle(2, 0x00d900, 1);
    app.graphics.moveTo(quadrant.leftTop_.x,  quadrant.leftTop_.y);
    app.graphics.lineTo(quadrant.rightTop_.x, quadrant.rightTop_.y);
    app.graphics.lineTo(quadrant.rightBot_.x, quadrant.rightBot_.y);
    app.graphics.lineTo(quadrant.leftBot_.x,  quadrant.leftBot_.y);
    app.graphics.lineTo(quadrant.leftTop_.x,  quadrant.leftTop_.y);
    for (id in quadrant.objects_) {
      o = quadrant.objects_[id];
      app.graphics.lineStyle(2, o.c_ || app.colors_.neutral, 1);
      app.graphics.drawCircle(o.pos_.x, o.pos_.y, o.rad_);
    }
  };

  app.autoAdd = function autoAdd() {
    app.change('autoAdd');
  };

  app.mouseAction = function mouseAction() {
    app.mouseAction_++;
    app.mouseAction_ = app.mouseAction_ % 3;
    app.change();
  };

  app.showLog = function showLog(e, forced) {
    if (forced !== undefined) {
      app.logShown_ = forced;
    }

    if (app.logShown_) {
      app.$log.className = '';
    } else {
      app.$log.className = 'hidden';
      app.$log.innerHTML = '';
    }

    app.change('logShown');
  };

  app.log = function log(message) {
    app.log_ += message + '<br>';
    app.logLength_++;
  };

  app.start = function start() {
    app.qt = new Quadtree2(new Vec2(app.w_, app.h_), app.limit_);
    app.log('var qt = new Quadtree2(new Vec2(' + app.w_ + ', ' + app.h_ + '), ' + app.limit_ + ');');
    app.$graphics_.appendChild(app.renderer.view);
    app.qt.debug(true);
    app.renderer.view.style.display = 'block';
    app.stage.addChild(app.graphics);
    app.rerender_ = setInterval(function(){ app.update(); }, 60);
    app.$autoAdd.onclick       = app.autoAdd;
    app.$mouseAction.onclick   = app.mouseAction;
    app.$graphics_.onclick     = app.handleMouseClick;
    app.$graphics_.onmousemove = app.handleMouseMove;
    app.$graphics_.onmouseout  = app.handleMouseOut;
    app.$logInfo.onclick       = app.showLog;

    app.showLog();
  };

  app.start();
  app.redraw();
  app.change();
};
