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
var Tower = (function (_super) {
    __extends(Tower, _super);
    function Tower(icon) {
        var _this = _super.call(this) || this;
        if (!_this.icon) {
            _this.icon = new eui.Image;
            _this.addChild(_this.icon);
        }
        _this.icon.width = Pong.sizeWall * 3;
        _this.icon.height = Pong.sizeWall * 3;
        _this.icon.source = icon;
        return _this;
    }
    return Tower;
}(eui.Component));
__reflect(Tower.prototype, "Tower");
//# sourceMappingURL=Tower.js.map