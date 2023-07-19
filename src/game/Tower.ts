class Tower extends eui.Component {
    icon:eui.Image
    constructor(icon:string) {
        super()
        if(!this.icon){
            this.icon = new eui.Image
            this.addChild(this.icon)
        }
        this.icon.width = Pong.sizeWall * 3
        this.icon.height = Pong.sizeWall * 3
        this.icon.source = icon
    }
}