var Global = require("Global");
var Costs = [10, 20, 40, 80, 160];

cc.Class({
    extends: cc.Component,
    properties: {
        magicStarIconNode: cc.Node,
        magicStarDescriptionNode: cc.Node,
        magicStarProgressNode: cc.Node,
        updateCostNode: cc.Node,
        updateButtonNode: cc.Node,
        magicStarNameLabel: cc.Label,
        magicStarDescriptionLabel: cc.Label,
        updateCostLabel: cc.Label,
        updateButtonLabel: cc.Label,
        toastPrefab: cc.Prefab,
        progressPrefab: cc.Prefab,
        purchasePrefab: cc.Prefab
    },
    init(data) {
        this.magicStarId = data.id;
        this.magicStarNameLabel.string = data.name;
        this.magicStarIconNode.color = data.color;
        this.magicStarDescriptionLabel.string = data.description;
        if (Global.magicStars[this.magicStarId] >= 0) {
            if (Global.magicStars[this.magicStarId] < 5) {
                this.updateCostNode.opacity = 255;
                this.updateCostLabel.string = Costs[Global.magicStars[this.magicStarId]].toString();
                this.updateButtonLabel.string = "Upgrade";
            }
            else {
                this.updateCostNode.destroy();
                this.updateButtonNode.destroy();
            }
            for (var i = 0; i < Global.magicStars[this.magicStarId]; i++) this.magicStarProgressNode.addChild(cc.instantiate(this.progressPrefab));
            this.magicStarProgressNode.opacity = 255;
        }
        else {
            this.updateCostNode.opacity = 255;
            this.updateCostLabel.string = "5";
            this.updateButtonLabel.string = "Purchase";
            this.magicStarDescriptionNode.opacity = 255;
        }
    },
    purchase() {
        cc.find("Canvas").addChild(cc.instantiate(this.toastPrefab));
        purchaseNode = cc.instantiate(this.purchasePrefab);
        cc.find("Canvas").addChild(purchaseNode);
        purchaseNode.getComponent("MagicStarPurchase").init({
            id: this.magicStarId,
            name: this.magicStarNameLabel.string,
            color: this.magicStarIconNode.color,
            itemNode: this.node,
        });
    }
});
