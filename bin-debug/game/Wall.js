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
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall() {
        var _this = _super.call(this) || this;
        _this.width = Pong.sizeWall;
        _this.height = Pong.sizeWall;
        if (!_this.mShape) {
            _this.mShape = new egret.Shape;
            _this.mShape.graphics.lineStyle(1, 0x0);
            _this.mShape.graphics.beginFill(0x0, 0.5);
            _this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall);
            _this.mShape.graphics.endFill();
            _this.addChild(_this.mShape);
        }
        return _this;
    }
    Wall.prototype._setContent = function (data) {
        this.mData = data;
        this.mShape.graphics.clear();
        switch (this.mData.towerId) {
            case 0:
                this.mShape.graphics.lineStyle(1, 0xffffff);
                this.mShape.graphics.beginFill(0xffffff, 0.5);
                this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall);
                this.mShape.graphics.endFill();
                break;
            case 1:
                this.mShape.graphics.lineStyle(1, 0xffffff);
                this.mShape.graphics.beginFill(0xff0000, 0.5);
                this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall);
                this.mShape.graphics.endFill();
                break;
            case 2:
                this.mShape.graphics.lineStyle(1, 0xffffff);
                this.mShape.graphics.beginFill(0x9900ff, 0.5);
                this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall);
                this.mShape.graphics.endFill();
                break;
            case 3:
                this.mShape.graphics.lineStyle(1, 0xffffff);
                this.mShape.graphics.beginFill(0xffff00, 0.5);
                this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall);
                this.mShape.graphics.endFill();
                break;
            case 4:
                this.mShape.graphics.lineStyle(1, 0xffffff);
                this.mShape.graphics.beginFill(0x00ff99, 0.5);
                this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall);
                this.mShape.graphics.endFill();
                break;
            default:
                this.mShape.graphics.lineStyle(1, 0x0);
                this.mShape.graphics.beginFill(0x0, 0.5);
                this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall);
                this.mShape.graphics.endFill();
                break;
        }
    };
    // public rect() {
    //     return { x: this.x, y: this.y, width: this.width, height: this.height }
    // }
    Wall.prototype.NotWall = function () {
        return this.mData.towerId != -1;
    };
    Wall.prototype.NotSame = function (towerId) {
        return this.mData.towerId != towerId;
    };
    return Wall;
}(eui.Component));
__reflect(Wall.prototype, "Wall");
//# sourceMappingURL=Wall.js.map