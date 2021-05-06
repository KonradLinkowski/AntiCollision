// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"random.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRange = exports.getUnder = void 0;

function getUnder(max) {
  return getRange(0, max);
}

exports.getUnder = getUnder;

function getRange(min, max) {
  return Math.random() * (max - min) + min;
}

exports.getRange = getRange;
},{}],"vector.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector2 = exports.Vector3 = void 0;

var Vector3 =
/** @class */
function () {
  function Vector3(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  Vector3.prototype.add = function (v) {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  };

  Vector3.prototype.sub = function (v) {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  };

  Vector3.prototype.mul = function (v) {
    return new Vector3(this.x * v, this.y * v, this.z * v);
  };

  Vector3.prototype.div = function (v) {
    return new Vector3(this.x / v, this.y / v, this.z / v);
  };

  Vector3.prototype.toRGB = function () {
    return "rgb(" + this.x + " " + this.y + " " + this.z + ")";
  };

  return Vector3;
}();

exports.Vector3 = Vector3;

var Vector2 =
/** @class */
function () {
  function Vector2(x, y) {
    this.x = x;
    this.y = y;
  }

  Vector2.prototype.add = function (v) {
    return new Vector2(this.x + v.x, this.y + v.y);
  };

  Vector2.prototype.sub = function (v) {
    return new Vector2(this.x - v.x, this.y - v.y);
  };

  Vector2.prototype.mul = function (v) {
    return new Vector2(this.x * v, this.y * v);
  };

  Vector2.prototype.div = function (v) {
    return new Vector2(this.x / v, this.y / v);
  };

  return Vector2;
}();

exports.Vector2 = Vector2;
},{}],"ball.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;

var random_1 = require("./random");

var vector_1 = require("./vector");

var max_history = 100;

var Ball =
/** @class */
function () {
  function Ball(x, y, arg_r) {
    this.position = new vector_1.Vector2(x, y);
    this.velocity = new vector_1.Vector2(random_1.getRange(-4, 4), random_1.getRange(-4, 4));
    this.r = arg_r;
    this.position_history = [];
    this.current_idx = 0;

    for (var i = 0; i < max_history; i += 1) {
      this.position_history.push(new vector_1.Vector2(x, y));
    }

    this.stableCount = 0;
  }

  Ball.prototype.save = function () {
    this.position_history[this.current_idx] = this.position;
    this.current_idx = ++this.current_idx % max_history;
  };

  Ball.prototype.getVA = function () {
    var va = [];

    for (var i = 0; i < max_history; ++i) {
      var actual_idx = (i + this.current_idx) % max_history;
      var ratio = i / max_history;
      va[i].position = this.position_history[actual_idx];
      var color = ratio * 255;
      va[i].color = new vector_1.Vector3(0, color, 0);
    }

    return va;
  };

  Ball.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color.toRGB();
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath(); // console.log(this.position)
  };

  return Ball;
}();

exports.Ball = Ball;
},{"./random":"random.ts","./vector":"vector.ts"}],"main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ball_1 = require("./ball");

var random_1 = require("./random");

var vector_1 = require("./vector");

var $canvas = document.querySelector("canvas");
var ctx = $canvas.getContext("2d");
$canvas.width = window.innerWidth;
$canvas.height = window.innerHeight;
window.addEventListener('resize', function () {
  $canvas.width = window.innerWidth;
  $canvas.height = window.innerHeight;
});
var stable_color = new vector_1.Vector3(0, 255, 0);
var unstable_color = new vector_1.Vector3(255, 0, 0);
var speedDownFactor = 1;
var speedDownCounter = 1;
var waitingSpeedFactor = 1;
var speedDownFactorGoal = 1;
var nBalls = 20;
var maxSize = 5;
var minSize = 70;
var iterations = 0;
var spawn_range_factor = 0.5;
var balls = [];

for (var i = 0; i < nBalls; i++) {
  var angle = random_1.getUnder(2 * Math.PI);
  var radius = 350.0;
  var start_x = radius * Math.cos(angle);
  var start_y = radius * Math.sin(angle);
  balls.push(new ball_1.Ball(start_x + $canvas.width * 0.5, start_y + $canvas.height * 0.5, random_1.getRange(minSize, maxSize)));
}

addKeyListener("Space", function () {
  speedDownFactorGoal = speedDownFactor == 1 ? 10.0 : 1.0;
});
var ok_count = 0;
var mousePos = {
  x: 0,
  y: 0
};
window.addEventListener("mousemove", function (event) {
  mousePos.x = event.x;
  mousePos.y = event.y;
});
requestAnimationFrame(animate);

function animate(delta) {
  if (waitingSpeedFactor != speedDownFactorGoal) {
    waitingSpeedFactor += speedDownFactorGoal - waitingSpeedFactor;
  }

  var stable = true;

  if (!speedDownCounter) {
    for (var _i = 0, balls_1 = balls; _i < balls_1.length; _i++) {
      var ball = balls_1[_i];
      ball.stable = true;
      ball.save();
    }

    stable = update(balls, 1);

    if (!stable && ok_count < 200) {
      ok_count = 0;
    }

    if (stable) {
      ++ok_count;
    }

    if (waitingSpeedFactor) {
      speedDownFactor = waitingSpeedFactor;
    }

    speedDownCounter = speedDownFactor;
  }

  updatePos(balls, speedDownFactor);
  var center_of_mass = new vector_1.Vector2(0, 0);

  for (var _a = 0, balls_2 = balls; _a < balls_2.length; _a++) {
    var b = balls_2[_a];
    var stable_ratio = ok_count > 199 ? 1.0 : Math.min(1.0, b.stableCount / 255.0);
    var color = stable_color.mul(stable_ratio).add(unstable_color.mul(1.0 - stable_ratio));
    var r = b.r;
    if (speedDownFactor > 1) r = b.r;
    center_of_mass = center_of_mass.add(b.position);
    b.color = color;
  }

  center_of_mass = center_of_mass.div(balls.length);
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  ctx.save();
  ctx.translate(-center_of_mass.x + $canvas.width / 2, -center_of_mass.y + $canvas.height / 2);
  balls.forEach(function (b) {
    return b.draw(ctx);
  });
  ctx.fillStyle = 'purple';
  ctx.beginPath();
  ctx.arc(center_of_mass.x, center_of_mass.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
  iterations++;
  requestAnimationFrame(animate);
}

function update(balls, speed) {
  var stable = true;
  var nBalls = balls.length;
  var attraction_force_bug = 0.01;
  var center_position = new vector_1.Vector2($canvas.width * 0.5, $canvas.width * 0.5);

  for (var i = 0; i < nBalls; i++) {
    var current_ball = balls[i]; // Attraction to center

    var to_center = center_position.sub(current_ball.position);
    current_ball.velocity = current_ball.velocity.add(to_center.mul(attraction_force_bug));

    for (var k = i + 1; k < nBalls; k++) {
      var collider = balls[k];
      var collide_vec = current_ball.position.sub(collider.position);
      var dist = Math.sqrt(collide_vec.x * collide_vec.x + collide_vec.y * collide_vec.y);
      var minDist = current_ball.r + collider.r;

      if (dist < minDist) {
        stable = false;
        current_ball.stable = false;
        collider.stable = false;
        var collide_axe = collide_vec.div(dist);
        current_ball.position = current_ball.position.add(collide_axe.mul(0.5 * (minDist - dist)));
        collider.position = collider.position.sub(collide_axe.mul(0.5 * (minDist - dist)));
      }
    }
  }

  for (var i = 0; i < nBalls; i++) {
    if (balls[i].stable) balls[i].stableCount++;else balls[i].stableCount = 0;
  }

  return stable;
}

function getBallAt(position, balls) {
  for (var _i = 0, balls_3 = balls; _i < balls_3.length; _i++) {
    var ball = balls_3[_i];
    var v = position.sub(ball.position);
    var dist = Math.sqrt(v.x * v.x + v.y * v.y);

    if (dist < ball.r) {
      return ball;
    }
  }

  return null;
}

function updatePos(balls, speedDownFactor) {
  var dt = 0.016;

  for (var _i = 0, balls_4 = balls; _i < balls_4.length; _i++) {
    var currentBall = balls_4[_i];
    currentBall.position = currentBall.position.add(currentBall.velocity.mul(dt / speedDownFactor));
  }

  speedDownCounter--;
}

function dot(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

function length(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function normalize(v) {
  return v.div(length(v));
}

function addKeyListener(key, callback) {
  window.addEventListener("keyup", function (event) {
    if (event.code == key) callback();
  });
}
},{"./ball":"ball.ts","./random":"random.ts","./vector":"vector.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53384" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.js.map