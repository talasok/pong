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
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this.INITIAL_VELOCITY = 0.05; //0.025
        _this._mColors = [0x0, 0xff0000, 0x9900ff, 0xffff00, 0x00ff99];
        _this.width = Pong.sizeBall;
        _this.height = Pong.sizeBall;
        return _this;
    }
    Ball.prototype.reset = function () {
        this.x = this.mData.point[0] * Pong.sizeWall;
        this.y = this.mData.point[1] * Pong.sizeWall;
        this.direction = { x: 0 };
        while (Math.abs(this.direction.x) <= 0.2 ||
            Math.abs(this.direction.x) >= 0.9) {
            var heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
        }
        this.velocity = MapView.players[this.mData.dbid].speed; //this.INITIAL_VELOCITY
    };
    Ball.prototype.rect = function () {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    };
    Ball.prototype._setContent = function (data) {
        this.mData = data;
        if (!this.mShape) {
            this.mShape = new egret.Shape();
            this.mShape.graphics.lineStyle(Pong.sizeBall / 4, 0x000066);
            this.mShape.graphics.beginFill(this._mColors[this.mData.towerId], 1);
            var radius = Pong.sizeBall / 2;
            this.mShape.graphics.drawCircle(radius, radius, radius);
            // this.mShape.graphics.drawCircle(0, 0, radius)
            this.addChild(this.mShape);
        }
        this.reset();
    };
    Ball.prototype.update = function (delta, paddleRects) {
        console.log("update----------1", this.direction.x, this.direction.y);
        var rect = this.rect();
        var mapRect = { x: Pong.sizeWall, y: Pong.sizeWall, width: Pong.sizeWall * (Pong.sizeWidth - 2), height: Pong.sizeWall * (Pong.sizeHeight - 2) };
        var radius = Pong.sizeBall / 2;
        var _X = parseInt("" + (this.x + radius) / Pong.sizeWall);
        var _Y = parseInt("" + (this.y + radius) / Pong.sizeWall);
        var changeDirX = false;
        var changeDirY = false;
        var changeDir = false;
        // chạm trái or chạm phải
        if (mapRect.x >= rect.x || mapRect.width <= rect.x + radius) {
            this.direction.x *= -1;
            changeDir = true;
            changeDirX = true;
        }
        //chạm trên or chạm dưới
        if (mapRect.y >= rect.y || mapRect.height <= rect.y + radius) {
            this.direction.y *= -1;
            changeDir = true;
            changeDirY = true;
        }
        // console.log(" ------",_X,_Y);
        // if(_X < 0 || _X > Pong.sizeWidth-1 || _Y < 0 || _Y > Pong.sizeHeight-1){
        //     console.log("lỗi ------",_X,_Y);
        // }
        //1-9   0,8     --  1,8     --2,8
        //      0,9     --  1,9     --2,9
        //      0,10    --  1,10    --2,10
        // va chạm tâm điểm
        var wallItem5 = paddleRects[_X][_Y];
        this.changeDir(wallItem5);
        if (!changeDir) {
            var wallItem8 = paddleRects[_X][_Y - 1];
            this.changeDir(wallItem8);
            var wallItem2 = paddleRects[_X][_Y + 1];
            this.changeDir(wallItem2);
            var wallItem4 = paddleRects[_X - 1][_Y];
            this.changeDir(wallItem4);
            var wallItem7 = paddleRects[_X - 1][_Y - 1];
            this.changeDir(wallItem7);
            var wallItem1 = paddleRects[_X - 1][_Y + 1];
            this.changeDir(wallItem1);
            var wallItem6 = paddleRects[_X + 1][_Y];
            this.changeDir(wallItem6);
            var wallItem9 = paddleRects[_X + 1][_Y - 1];
            this.changeDir(wallItem9);
            var wallItem3 = paddleRects[_X + 1][_Y + 1];
            this.changeDir(wallItem3);
        }
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
    };
    Ball.prototype.changeDir = function (rect2) {
        var rect = this.rect();
        var radius = Pong.sizeBall / 2;
        var changeDir = false;
        if (rect2.NotWall() && rect2.NotSame(this.mData.towerId)) {
            // chạm trái // chạm phải
            if ((rect2.x >= rect.x || rect2.width <= rect.x + radius)) {
                this.direction.x *= -1;
                changeDir = true;
            }
            else if ((rect2.y >= rect.y || rect2.height <= rect.y + radius)) {
                this.direction.y *= -1;
                changeDir = true;
            }
        }
        if (changeDir) {
            rect2._setContent({ towerId: this.mData.towerId, isTower: false });
        }
    };
    Ball.prototype.collides = function (circle2) {
        var circle1 = this.rect();
        var dx = circle1.x - circle2.x;
        var dy = circle1.y - circle2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var colliding = distance < Pong.sizeBall;
        return colliding;
    };
    return Ball;
}(eui.Component));
__reflect(Ball.prototype, "Ball");
function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}
function collides(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y;
}
//# sourceMappingURL=Ball.js.map