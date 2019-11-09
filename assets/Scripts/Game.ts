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
export default class Game extends cc.Component {

    @property(cc.Prefab)
    starPrefab: cc.Prefab = null;

    @property(cc.Node)
    ground: cc.Node = null;

    @property
    maxStartDuration: number = 0;

    @property
    minStartDuration: number = 0;

    @property(cc.Node)
    player: cc.Node = null;
    
    groundY: number;


    spanNewStart() {
        let newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
    }

    getNewStarPosition() {
        let randX = 0;
        let randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        let maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;

        return cc.v2(randX, randY);
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.groundY = this.ground.y + this.ground.height / 2;
        this.spanNewStart();
    }

    start () {

    }

    // update (dt) {}
}
