cc.Class({
    extends: cc.Component,
    onLoad() {
        this.isDestroyed = false;
    },
    selfDestroy() {
        if (!this.isDestroyed) {
            this.isDestroyed = true;
            var animation = this.node.getComponent(cc.Animation);
            animation.play("toast-close");
            animation.on("stop", function () {
                this.node.destroy();
            }, this);
        }
    }
});
