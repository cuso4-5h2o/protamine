var Global = require("Global");

cc.Class({
    extends: cc.Component,
    properties: {
        toastPrefab: cc.Prefab,
        guidePrefab: cc.Prefab
    },
    onLoad() {
        cc.director.preloadScene("game");
        cc.director.preloadScene("lab");
        cc.director.preloadScene("settings");
    },
    startGame(node) {
        if (cc.sys.localStorage.getItem("shownGuide")=="1") {
            node.currentTarget.getComponent(cc.Animation).play();
            cc.director.loadScene("game");
            Global.isPlaying = false;
            Global.score = 0;
        }
        else this.showGuide();
    },
    showGuide () {
        cc.find("Canvas").addChild(cc.instantiate(this.toastPrefab));
        cc.find("Canvas").addChild(cc.instantiate(this.guidePrefab));
        cc.sys.localStorage.setItem("shownGuide", "1");
    },
    goToLab() {
        cc.director.loadScene("lab");
    },
    goToSetting() {
        cc.director.loadScene("settings");
    }
});
