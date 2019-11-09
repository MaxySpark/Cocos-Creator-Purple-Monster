// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property
    jumpHeight: number = 0;

    @property
    jumpDuration = 0;

    @property
    maxMovementSpeed: number = 0;

    @property
    accel: number = 0;

    accLeft: boolean;
    accRight: boolean;
    xSpeed = 0;

    // LIFE-CYCLE CALLBACKS:

    onKeyUp(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                console.log('down left');
                this.accLeft = false;
                break;
            case cc.macro.KEY.right:
                this.accRight = false;
                console.log('down right');
                break;
        }
    }

    onKeyDown(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                console.log('up left');
                this.accLeft = true;
                break;
            case cc.macro.KEY.right:
                this.accRight = true;
                console.log('up left');
                break;
        }
    }

    setJumpAction() {
        let jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionInOut());
        let jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionInOut());

        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    }

    onLoad () {
        // this.setJumpAction 
        this.node.runAction(this.setJumpAction());

        this.accRight = false;
        this.accLeft = false;
        this.xSpeed = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start () {

    }

    update (dt) {
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } 

        if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }

        if (Math.abs(this.xSpeed) > this.maxMovementSpeed) {
            this.xSpeed = this.maxMovementSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        this.node.x += this.xSpeed * dt;
    }
}
