cc.Class({
    extends: cc.Component,
    onLoad() {
        cc.director.preloadScene("home");
    },
    goHome() {
        cc.director.loadScene("home");
    }
});
