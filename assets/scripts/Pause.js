var Global = require("Global");
var Toast = require("Toast");
var Ball = require("Ball");

cc.Class({
    extends: cc.Component,
    onLoad() {
        this.isDestroyed = false;
    },
    continue() {
        Global.isPlaying = false;
        var ballAnim = cc.find("Canvas/Ball").getComponent(cc.Animation);
        var ballScript = cc.find("Canvas/Ball").getComponent(Ball);
        ballAnim.play();
        ballAnim.on("stop", ballScript.startGame, ballScript);
        cc.find("Canvas/Toast").getComponent(Toast).selfDestroy();
        this.selfDestroy();
    },
    selfDestroy() {
        if (!this.isDestroyed) {
            this.isDestroyed = true;
            var animation = this.node.getComponent(cc.Animation);
            animation.play("general-hide");
            animation.on("stop", function () {
                this.node.destroy();
            }, this);
        }
    }
});
