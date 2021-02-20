var Global = require("Global");

cc.Class({
    extends: cc.Component,
    onLoad() {
        cc.director.preloadScene("game");
        cc.director.preloadScene("lab");
        cc.director.preloadScene("settings");
    },
    startGame(node) {
        node.currentTarget.getComponent(cc.Animation).play();
        cc.director.loadScene("game");
        Global.isPlaying = false;
        Global.score = 0;
    },
    goToLab() {
        cc.director.loadScene("lab");
    },
    goToSetting() {
        cc.director.loadScene("settings");
    }
});
