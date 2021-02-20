var Global = require("Global");
var Toast = require("Toast");
var Costs = [10, 20, 40, 80, 160];

cc.Class({
    extends: cc.Component,
    properties: {
        iconNode: cc.Node,
        titleLabel: cc.Label,
        levelLabel: cc.Label,
        costLabel: cc.Label,
        purchaseLabel: cc.Label,
        progressPrefab: cc.Prefab,
        modalAudio: cc.AudioClip,
        purchaseAudio: cc.AudioClip,
        updateAudio: cc.AudioClip
    },
    onLoad() {
        this.isDestroyed = false;
    },
    init(data) {
        this.magicStarId = data.id;
        this.itemNode = data.itemNode;
        this.titleLabel.string = this.titleLabel.string.replace("{action}", ((Global.magicStars[this.magicStarId] >= 0) ? "upgrade" : "purchase")).replace("{name}", data.name);
        var cost = Global.magicStars[this.magicStarId] >= 0 ? Costs[Global.magicStars[this.magicStarId]] : 5;
        this.purchaseLabel.string = (Global.magicStars[this.magicStarId] >= 0) ? "Upgrade" : "Purchase";
        this.levelLabel.string = (Global.magicStars[this.magicStarId] >= 0) ? (Global.magicStars[this.magicStarId] + 1).toString() : "0";
        this.iconNode.color = data.color;
        this.costLabel.string = cost.toString() + ((Global.fragments >= cost) ? ", you have " : ", but you only have ") + Global.fragments.toString() + ".";
        if (Global.fragments < cost) this.purchaseLabel.node.parent.destroy();
        this.node.getComponent(cc.Animation).play("modal-open");
        cc.audioEngine.play(this.modalAudio, false, Global.settings.volume);
    },
    confirm() {
        if (Global.magicStars[this.magicStarId] >= 0) {
            if (Global.fragments >= Costs[Global.magicStars[this.magicStarId]]) {
                Global.fragments -= Costs[Global.magicStars[this.magicStarId]];
                Global.magicStars[this.magicStarId]++;
                cc.audioEngine.play(this.updateAudio, false, Global.settings.volume);
                this.itemNode.getChildByName("Cost").getChildByName("Label").getComponent(cc.Label).string = Costs[Global.magicStars[this.magicStarId]].toString();
                var progressNode = cc.instantiate(this.progressPrefab);
                this.itemNode.getChildByName("Progress").addChild(progressNode);
                progressNode.getComponent(cc.Animation).play();
                if (Global.magicStars[this.magicStarId] >= 5) {
                    this.itemNode.getChildByName("Cost").destroy();
                    this.itemNode.getChildByName("Upgrade").destroy();
                }
            }
        }
        else {
            if (Global.fragments >= 5) {
                Global.fragments -= 5;
                Global.magicStars[this.magicStarId] = 0;
                cc.audioEngine.play(this.purchaseAudio, false, Global.settings.volume);
                this.itemNode.getChildByName("Cost").getChildByName("Label").getComponent(cc.Label).string = Costs[Global.magicStars[this.magicStarId]].toString();
                this.itemNode.getChildByName("Upgrade").getChildByName("Label").getComponent(cc.Label).string = "Upgrade";
                this.itemNode.getChildByName("Progress").opacity = 255;
                this.itemNode.getChildByName("Description").opacity = 0;
            }
        }
        Global.saveData();
        this.selfDestroy();
    },
    selfDestroy() {
        if (!this.isDestroyed) {
            cc.find("Canvas/Toast").getComponent(Toast).selfDestroy();
            this.isDestroyed = true;
            var animation = this.node.getComponent(cc.Animation);
            animation.play("modal-close");
            animation.on("stop", function () {
                this.node.destroy();
            }, this);
        }
    }
});
