var Global = require("Global");

cc.Class({
    extends: cc.Component,
    properties: {
        magicStarStatusPrefab: cc.Prefab
    },
    onLoad() {
        this.yellowNode = false;
        this.interval = setInterval(function () {
            if (Global.isPlaying) {
                if (Global.magicStarStatuses.yellow > 0) Global.magicStarStatuses.yellow--;
                if (Global.magicStarStatuses.green > 0) Global.magicStarStatuses.green--;
                if (Global.magicStarStatuses.blue > 0) Global.magicStarStatuses.blue--;
                if (Global.magicStarStatuses.red > 0) Global.magicStarStatuses.red--;
            }
        }, 1000);
    },
    update() {
        if (Global.magicStarStatuses.yellow) {
            if (this.yellowNode) this.yellowNode.opacity = (Global.magicStarStatuses.yellow / 20) * 255;
            else {
                this.yellowNode = cc.instantiate(this.magicStarStatusPrefab);
                this.yellowNode.color = cc.Color.YELLOW;
                this.node.addChild(this.yellowNode);
            }
        }
        else if (this.yellowNode) {
            Global.invincibleTime = true;
            setTimeout(function () {
                Global.invincibleTime = false;
            }, 450);
            Global.magicStarStatuses.yellow = null;
            Global.pickingRadius = 32;
            Global.haloNode.destroy();
            Global.haloNode = null;
            this.yellowNode.destroy();
            this.yellowNode = null;
        }
        if (Global.magicStarStatuses.green) {
            if (this.greenNode) this.greenNode.opacity = (Global.magicStarStatuses.green / (10 + 5 * Global.magicStars.green)) * 255;
            else {
                this.greenNode = cc.instantiate(this.magicStarStatusPrefab);
                this.greenNode.color = cc.Color.GREEN;
                this.node.addChild(this.greenNode);
            }
        }
        else if (this.greenNode) {
            Global.magicStarStatuses.green = null;
            Global.scoreTimes = 1;
            this.greenNode.destroy();
            this.greenNode = null;
        }
        if (Global.magicStarStatuses.red) {
            if (this.redNode) this.redNode.opacity = (Global.magicStarStatuses.red / (10 + Global.magicStars.red * 2)) * 255;
            else {
                this.redNode = cc.instantiate(this.magicStarStatusPrefab);
                this.redNode.color = cc.Color.RED;
                this.node.addChild(this.redNode);
            }
        }
        else if (this.redNode) {
            Global.invincibleTime = true;
            setTimeout(function () {
                Global.invincibleTime = false;
            }, 450);
            Global.magicStarStatuses.red = null;
            Global.speedPlaying /= Global.settings.speed;
            Global.particleNode.destroy();
            Global.particleNode = null;
            this.redNode.destroy();
            this.redNode = null;
        }
        if (Global.magicStarStatuses.blue) {
            if (this.blueNode) this.blueNode.opacity = (Global.magicStarStatuses.blue / (10 + Global.magicStars.blue * 5)) * 255;
            else {
                Global.invincibleTime = true;
                setTimeout(function () {
                    Global.invincibleTime = false;
                }, 450);
                this.blueNode = cc.instantiate(this.magicStarStatusPrefab);
                this.blueNode.color = cc.Color.BLUE;
                this.node.addChild(this.blueNode);
            }
        }
        else if (this.blueNode) {
            Global.magicStarStatuses.blue = null;
            this.blueNode.destroy();
            this.blueNode = null;
        }
    },
    onDestroy() {
        clearInterval(this.interval);
    }
});
