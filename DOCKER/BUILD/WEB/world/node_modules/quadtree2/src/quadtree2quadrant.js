var Quadtree2Quadrant = function Quadtree2Quadrant(leftTop, size, id, parent) {
  this.leftTop_     = leftTop.clone();
  this.children_    = [];
  this.objects_     = {};
  this.objectCount_ = 0;
  this.id_          = id || 0;
  this.parent_      = parent;
  this.refactoring_ = false;

  this.setSize(size);
};

Quadtree2Quadrant.prototype = {
  setSize : function setSize(size) {
    if(!size) { return; }

    this.size_        = size;
    this.rad_         = size.multiply(0.5, true);
    this.center_      = this.leftTop_.add(this.rad_, true);

    this.leftBot_     = this.leftTop_.clone();
    this.leftBot_.y  += size.y;
    this.rightTop_    = this.leftTop_.clone();
    this.rightTop_.x += size.x;
    this.rightBot_    = this.leftTop_.add(size, true);

    this.leftMid_     = this.center_.clone();
    this.leftMid_.x   = this.leftTop_.x;
    this.topMid_      = this.center_.clone();
    this.topMid_.y    = this.leftTop_.y;
  },

  makeChildren : function makeChildren(id) {
    if (this.children_.length > 0) { return false; }

    this.children_.push(
      new Quadtree2Quadrant(this.leftTop_,  this.rad_, id++, this),
      new Quadtree2Quadrant(this.topMid_,   this.rad_, id++, this),
      new Quadtree2Quadrant(this.leftMid_,  this.rad_, id++, this),
      new Quadtree2Quadrant(this.center_,   this.rad_, id++, this)
    );

    return id;
  },

  looseChildren : function looseChildren() {
    this.children_ = [];
  },

  addObjects : function addObjects(objs) {
    var id;

    for (id in objs) {
      this.addObject(id, objs[id]);
    }
  },

  addObject : function addObject(id, obj) {
    this.objectCount_++;
    this.objects_[id] = obj;
  },

  removeObjects : function removeObjects(removed, dir) {
    var id;

    if (!removed) { removed = []; }

    for (id in this.objects_) {
      removed.push({ obj : this.objects_[id], quadrant : this });
      delete this.objects_[id];
    }

    this.objectCount_ = 0;

    if (!dir || dir === 1) {
      if (this.parent_) { this.parent_.removeObjects(removed, 1); }
    }

    if (!dir || dir === -1) {
      this.children_.forEach(function(child) {
        child.removeObjects(removed, -1);
      });
    }

    return removed;
  },

  removeObject : function removeObject(id) {
    var result = this.objects_[id];
    this.objectCount_--;
    delete(this.objects_[id]);
    return result;
  },

  getObjectCountForLimit : function getObjectCountForLimit() {
    var i,
        id,
        objects = {};

    for (id in this.objects_) {
      objects[id] = true;
    }

    for (i = 0; i < this.children_.length; i++) {
      for (id in this.children_[i].objects_) {
        objects[id] = true;
      }
    }

    return Object.keys(objects).length;
  },

  getObjectCount : function getObjectCount(recursive, onelevel) {
    var result = this.objectCount_;

    if (recursive) {
      this.children_.forEach(function(child) {
        result += child.getObjectCount(!onelevel && recursive);
      });
    }

    return result;
  },

  intersectingChildren : function intersectingChildren(pos, rad) {
    return this.children_.filter(function(child) {
      return child.intersects(pos, rad);
    });
  },

  intersects : function intersects(pos, rad) {
    var dist = pos.subtract(this.center_, true).abs(),
        cornerDist;

    if (dist.x > this.rad_.x + rad) { return false; }
    if (dist.y > this.rad_.y + rad) { return false; }

    if (dist.x <= this.rad_.x) { return true; }
    if (dist.y <= this.rad_.y) { return true; }

    cornerDistSq = Math.pow(dist.x - this.rad_.x, 2) + Math.pow(dist.y - this.rad_.y, 2);
    return cornerDistSq <= Math.pow(rad, 2);
  },

  hasChildren : function hasChildren() {
    return this.getChildCount() !== 0;
  },

  getChildCount : function getChildCount(recursive) {
    var count = this.children_.length;

    if (recursive) {
      this.children_.forEach(function(child) {
        count += child.getChildCount(recursive);
      });
    }

    return count;
  },

  getChildren : function getChildren(recursive, result) {
    if (!result) result = [];

    result.push.apply(result, this.children_);

    if (recursive) {
      this.children_.forEach(function(child) {
        child.getChildren(recursive, result);
      });
    }

    return result;
  },

  getObjectsUp : function getObjectsUp(result) {
    var id;

    if (result.quadrants[this.id_]) {
      return;
    }

    result.quadrants[this.id_] = true;

    for (id in this.objects_) {
      result.objects[id] = this.objects_[id];
    }

    if (this.parent_) {
      this.parent_.getObjectsUp(result);
    }
  },

  getObjectsDown : function getObjectsDown(result) {
    var id;

    if (result.quadrants[this.id_]) {
      return;
    }

    result.quadrants[this.id_] = true;

    for (id in this.objects_) {
      result.objects[id] = this.objects_[id];
    }

    for (id = 0; id < this.children_.length; id++) {
      this.children_[id].getObjectsDown(result);
    }
  }
};

module.exports = Quadtree2Quadrant;
