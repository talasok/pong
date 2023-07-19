class Ball extends eui.Component {
    mData: { dbid: number, towerId: number, point: number[], speed: number }
    mAvatar: eui.Image
    mShape: egret.Shape
    INITIAL_VELOCITY = 0.05//0.025
    direction
    velocity
    constructor() {
        super()
        this.width = Pong.sizeBall
        this.height = Pong.sizeBall
    }

    reset() {
        this.x = this.mData.point[0] * Pong.sizeWall
        this.y = this.mData.point[1] * Pong.sizeWall
        this.direction = { x: 0 }
        while (
            Math.abs(this.direction.x) <= 0.2 ||
            Math.abs(this.direction.x) >= 0.9
        ) {
            const heading = randomNumberBetween(0, 2 * Math.PI)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = MapView.players[this.mData.dbid].speed//this.INITIAL_VELOCITY
    }
    rect() {
        return { x: this.x, y: this.y, width: this.width, height: this.height }
    }
    _mColors = [0x0, 0xff0000, 0x9900ff, 0xffff00, 0x00ff99]
    _setContent(data: any) {
        this.mData = data
        if (!this.mShape) {
            this.mShape = new egret.Shape()
            this.mShape.graphics.lineStyle(Pong.sizeBall / 4, 0x000066);
            this.mShape.graphics.beginFill(this._mColors[this.mData.towerId], 1);
            var radius = Pong.sizeBall / 2
            this.mShape.graphics.drawCircle(radius, radius, radius)
            // this.mShape.graphics.drawCircle(0, 0, radius)
            this.addChild(this.mShape)
        }
        this.reset()
    }

    update(delta, paddleRects) {
        console.log("update----------1", this.direction.x, this.direction.y);
        const rect = this.rect()
        const mapRect = { x: Pong.sizeWall, y: Pong.sizeWall, width: Pong.sizeWall * (Pong.sizeWidth - 2), height: Pong.sizeWall * (Pong.sizeHeight - 2) }
        const radius = Pong.sizeBall / 2
        let _X = parseInt(`${(this.x + radius) / Pong.sizeWall}`)
        let _Y = parseInt(`${(this.y + radius) / Pong.sizeWall}`)
        var changeDirX = false
        var changeDirY = false
        var changeDir = false
        // chạm trái or chạm phải
        if (mapRect.x >= rect.x || mapRect.width <= rect.x + radius) {
            this.direction.x *= -1
            changeDir = true
            changeDirX = true
        }
        //chạm trên or chạm dưới
        if (mapRect.y >= rect.y || mapRect.height <= rect.y + radius) {
            this.direction.y *= -1
            changeDir = true
            changeDirY = true
        }


        // console.log(" ------",_X,_Y);
        // if(_X < 0 || _X > Pong.sizeWidth-1 || _Y < 0 || _Y > Pong.sizeHeight-1){
        //     console.log("lỗi ------",_X,_Y);

        // }

        //1-9   0,8     --  1,8     --2,8
        //      0,9     --  1,9     --2,9
        //      0,10    --  1,10    --2,10
        // va chạm tâm điểm
        let wallItem5 = paddleRects[_X][_Y] as Wall
        this.changeDir(wallItem5)
        if (!changeDir) {
            let wallItem8 = paddleRects[_X][_Y - 1] as Wall
            this.changeDir(wallItem8)
            let wallItem2 = paddleRects[_X][_Y + 1] as Wall
            this.changeDir(wallItem2)
            let wallItem4 = paddleRects[_X - 1][_Y] as Wall
            this.changeDir(wallItem4)
            let wallItem7 = paddleRects[_X - 1][_Y - 1] as Wall
            this.changeDir(wallItem7)
            let wallItem1 = paddleRects[_X - 1][_Y + 1] as Wall
            this.changeDir(wallItem1)
            let wallItem6 = paddleRects[_X + 1][_Y] as Wall
            this.changeDir(wallItem6)
            let wallItem9 = paddleRects[_X + 1][_Y - 1] as Wall
            this.changeDir(wallItem9)
            let wallItem3 = paddleRects[_X + 1][_Y + 1] as Wall
            this.changeDir(wallItem3)
        }

        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
    }
    private changeDir(rect2: Wall) {
        var rect = this.rect()
        const radius = Pong.sizeBall / 2
        let changeDir = false;
        if (rect2.NotWall() && rect2.NotSame(this.mData.towerId)) {
            // chạm trái // chạm phải
            if ((rect2.x >= rect.x || rect2.width <= rect.x + radius)) {
                this.direction.x *= -1
                changeDir = true
            } else//chạm trên // chạm dưới
                if ((rect2.y >= rect.y || rect2.height <= rect.y + radius)) {
                    this.direction.y *= -1
                    changeDir = true
                }
        }
        if (changeDir) {
            rect2._setContent({ towerId: this.mData.towerId, isTower: false })
        }
    }
    collides(circle2) {
        var circle1 = this.rect()
        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const colliding = distance < Pong.sizeBall;
        return colliding
    }
}
function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min
}

function collides(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y;
}