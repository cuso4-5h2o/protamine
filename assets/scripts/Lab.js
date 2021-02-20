var Global = require("Global");

var magicStarType = cc.Class({
    name: "MagicStar",
    properties: {
        magicStarId: "",
        magicStarName: "",
        magicStarColor: cc.Color,
        magicStarDescription: ""
    }
});

cc.Class({
    extends: cc.Component,
    properties: {
        magicStars: {
            default: [],
            type: magicStarType
        },
        toastPrefab: cc.Prefab,
        fragmentsLabel: cc.Label,
        magicStarList: cc.Node,
        itemPrefab: cc.Prefab
    },
    onLoad() {
        for (var i = 0; i < this.magicStars.length; i++) {
            var itemNode = cc.instantiate(this.itemPrefab);
            var data = this.magicStars[i];
            this.magicStarList.addChild(itemNode);
            itemNode.getComponent("MagicStarItem").init({
                id: data.magicStarId,
                name: data.magicStarName,
                color: data.magicStarColor,
                description: data.magicStarDescription
            });
        }
    },
    update() {
        this.fragmentsLabel.string = Global.fragments.toString();
    }
});
