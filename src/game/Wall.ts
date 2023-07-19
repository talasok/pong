class Wall extends eui.Component {
    mData: { towerId: number, isTower: boolean }
    mShape: egret.Shape
    constructor() {
        super()
        this.width = Pong.sizeWall
        this.height = Pong.sizeWall
        if (!this.mShape) {
            this.mShape = new egret.Shape
            this.mShape.graphics.lineStyle(1, 0x0);
            this.mShape.graphics.beginFill(0x0, 0.5);
            this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall)
            this.mShape.graphics.endFill()
            this.addChild(this.mShape)
        }
    }

    _setContent(data) {
        this.mData = data
        this.mShape.graphics.clear();
        switch (this.mData.towerId) {
            case 0:
                this.mShape.graphics.lineStyle(1, 0xffffff);
                this.mShape.graphics.beginFill(0xffffff, 0.5);
                this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall)
                this.mShape.graphics.endFill()
                break;
            case 1:
                this.mShape.graphics.lineStyle(1, 0xffffff);
                this.mShape.graphics.beginFill(0xff0000, 0.5);
                this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall)
                this.mShape.graphics.endFill()
                break;
            case 2:
                this.mShape.graphics.lineStyle(1, 0xffffff);
                this.mShape.graphics.beginFill(0x9900ff, 0.5);
                this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall)
                this.mShape.graphics.endFill()
                break;
            case 3:
                this.mShape.graphics.lineStyle(1, 0xffffff);
                this.mShape.graphics.beginFill(0xffff00, 0.5);
                this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall)
                this.mShape.graphics.endFill()
                break;
            case 4:
                this.mShape.graphics.lineStyle(1, 0xffffff);
                this.mShape.graphics.beginFill(0x00ff99, 0.5);
                this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall)
                this.mShape.graphics.endFill()
                break;
            default:
                this.mShape.graphics.lineStyle(1, 0x0);
                this.mShape.graphics.beginFill(0x0, 0.5);
                this.mShape.graphics.drawRect(0, 0, Pong.sizeWall, Pong.sizeWall)
                this.mShape.graphics.endFill()
                break;
        }
    }

    // public rect() {
    //     return { x: this.x, y: this.y, width: this.width, height: this.height }
    // }

    public NotWall() {
        return this.mData.towerId != -1
    }

    public NotSame(towerId:number) {
        return this.mData.towerId != towerId
    }

}