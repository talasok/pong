var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MapView = (function (_super) {
    __extends(MapView, _super);
    function MapView() {
        var _this = _super.call(this) || this;
        _this.sizeWall = 10;
        _this.towers = {
            "1": { id: 1, icon: "1_png", point: [20, 20] },
            "2": { id: 2, icon: "2_png", point: [50, 20] },
            "3": { id: 3, icon: "3_png", point: [20, 70] },
            "4": { id: 4, icon: "4_png", point: [50, 70] },
        };
        _this.mBalls = [];
        _this.width = 720;
        _this.height = 1280;
        if (!_this.mShape) {
            _this.mShape = new egret.Shape;
            _this.mShape.graphics.beginFill(0x0, 1);
            _this.mShape.graphics.drawRect(0, 0, _this.width, _this.height);
            _this.mShape.graphics.endFill();
            _this.addChild(_this.mShape);
        }
        var norWall = { towerId: 0 };
        var mWall = { towerId: -1 };
        _this._MapXY = [];
        for (var _x = 0; _x < Pong.sizeWidth; _x++) {
            if (!_this._MapXY[_x])
                _this._MapXY[_x] = [];
            for (var _y = 0; _y < Pong.sizeHeight; _y++) {
                var item = new Wall();
                item.name = _x + "_" + _y;
                item.x = _this.sizeWall * _x;
                item.y = _this.sizeWall * _y;
                if (_x == 0 || _x == Pong.sizeWidth - 1 || _y == 0 || _y == Pong.sizeHeight - 1) {
                    item._setContent(mWall);
                }
                else {
                    item._setContent(norWall);
                }
                _this._MapXY[_x][_y] = item;
                // if((_x == 20 && (_y==19||_y==20||_y==21)) || 
                // (_x == 19 && (_y==19||_y==20||_y==21)) || 
                // (_x == 21 && (_y==19||_y==20||_y==21)) ){
                //     item._setContent({ towerId: 1 })
                // }
                _this.addChild(item);
            }
        }
        for (var id in _this.towers) {
            var tower = _this.towers[id];
            var wallitem = _this._MapXY[tower.point[0]][tower.point[1]];
            wallitem._setContent({ towerId: tower.id, isTower: true });
            var towerItem = new Tower(tower.icon);
            _this.addChild(towerItem);
            towerItem.x = (tower.point[0] - 1) * Pong.sizeWall;
            towerItem.y = (tower.point[1] - 1) * Pong.sizeWall;
        }
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this._onUpdate, _this);
        _this._addBall(1, 1);
        _this._addBall(2, 2);
        _this._addBall(3, 3);
        _this._addBall(4, 4);
        _this._addBall(5, 1);
        _this._addBall(6, 1);
        _this._addBall(7, 1);
        _this._addBall(8, 1);
        return _this;
    }
    MapView.prototype._onUpdate = function () {
        egret.startTick(this.update, this);
    };
    MapView.prototype.update = function (time) {
        if (this.lastTime) {
            var delta = time - this.lastTime;
            for (var _i = 0, _a = this.mBalls; _i < _a.length; _i++) {
                var ball = _a[_i];
                ball.update(delta, this._MapXY);
            }
        }
        this.lastTime = time;
        return true;
    };
    MapView.prototype.stopTick = function () {
        this.lastTime = null;
        return true;
    };
    MapView.prototype._addBall = function (dbid, towerId) {
        var ball = new Ball();
        var tower = this.towers[towerId];
        ball._setContent({ dbid: dbid, towerId: towerId, point: tower.point });
        this.addChild(ball);
        this.mBalls.push(ball);
    };
    MapView.players = {
        "1": { dbid: 1, towerId: 0, speed: 0.05 },
        "2": { dbid: 2, towerId: 0, speed: 0.05 },
        "3": { dbid: 3, towerId: 0, speed: 0.05 },
        "4": { dbid: 4, towerId: 0, speed: 0.05 },
        "5": { dbid: 5, towerId: 0, speed: 0.15 },
        "6": { dbid: 6, towerId: 0, speed: 0.1 },
        "7": { dbid: 7, towerId: 0, speed: 0.2 },
        "8": { dbid: 8, towerId: 0, speed: 0.025 },
    };
    return MapView;
}(egret.DisplayObjectContainer));
__reflect(MapView.prototype, "MapView");
//# sourceMappingURL=MapView.js.map