class MapView extends egret.DisplayObjectContainer {
    _MapXY
    sizeWall = 10
    mShape: egret.Shape
    lastTime: number
    static players = {
        "1": { dbid: 1, towerId: 0, speed: 0.05 },
        "2": { dbid: 2, towerId: 0, speed: 0.05 },
        "3": { dbid: 3, towerId: 0, speed: 0.05 },
        "4": { dbid: 4, towerId: 0, speed: 0.05 },
        "5": { dbid: 5, towerId: 0, speed: 0.15 },
        "6": { dbid: 6, towerId: 0, speed: 0.1 },
        "7": { dbid: 7, towerId: 0, speed: 0.2 },
        "8": { dbid: 8, towerId: 0, speed: 0.025 },
    }

    towers = {
        "1": { id: 1, icon: "1_png", point: [20, 20] },
        "2": { id: 2, icon: "2_png", point: [50, 20] },
        "3": { id: 3, icon: "3_png", point: [20, 70] },
        "4": { id: 4, icon: "4_png", point: [50, 70] },
    }

    mBalls: Ball[] = []

    constructor() {
        super()
        this.width = 720
        this.height = 1280
        if (!this.mShape) {
            this.mShape = new egret.Shape
            this.mShape.graphics.beginFill(0x0, 1);
            this.mShape.graphics.drawRect(0, 0, this.width, this.height)
            this.mShape.graphics.endFill()
            this.addChild(this.mShape)
        }
        var norWall = { towerId: 0 };
        var mWall = { towerId: -1 }
        this._MapXY = []
        for (var _x = 0; _x < Pong.sizeWidth; _x++) {
            if (!this._MapXY[_x])
                this._MapXY[_x] = []
            for (var _y = 0; _y < Pong.sizeHeight; _y++) {
                var item = new Wall();
                item.name = `${_x}_${_y}`
                item.x = this.sizeWall * _x
                item.y = this.sizeWall * _y
                if (_x == 0 || _x == Pong.sizeWidth - 1 || _y == 0 || _y == Pong.sizeHeight - 1) {
                    item._setContent(mWall)
                } else {
                    item._setContent(norWall)
                }
                this._MapXY[_x][_y] = item
                // if((_x == 20 && (_y==19||_y==20||_y==21)) || 
                // (_x == 19 && (_y==19||_y==20||_y==21)) || 
                // (_x == 21 && (_y==19||_y==20||_y==21)) ){
                //     item._setContent({ towerId: 1 })
                // }
                this.addChild(item)
            }
        }
        for (var id in this.towers) {
            var tower = this.towers[id]
            var wallitem = this._MapXY[tower.point[0]][tower.point[1]] as Wall
            wallitem._setContent({ towerId: tower.id, isTower: true })
            var towerItem = new Tower(tower.icon)
            this.addChild(towerItem)
            towerItem.x = (tower.point[0] - 1) * Pong.sizeWall
            towerItem.y = (tower.point[1] - 1) * Pong.sizeWall
        }

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this._onUpdate, this)
        this._addBall(1, 1)
        this._addBall(2, 2)
        this._addBall(3, 3)
        this._addBall(4, 4)
        this._addBall(5, 1)
        this._addBall(6, 1)
        this._addBall(7, 1)
        this._addBall(8, 1)
    }

    _onUpdate() {
        egret.startTick(this.update, this)
    }

    update(time: number) {
        if (this.lastTime) {
            var delta = time - this.lastTime
            for (var ball of this.mBalls) {
                ball.update(delta, this._MapXY)
            }
        }
        this.lastTime = time
        return true
    }

    stopTick() {
        this.lastTime = null
        return true
    }
    private _addBall(dbid: number, towerId: number) {
        var ball = new Ball()
        var tower = this.towers[towerId]
        ball._setContent({ dbid: dbid, towerId: towerId, point: tower.point})
        this.addChild(ball)
        this.mBalls.push(ball)
    }
}