var Global = require("Global");

cc.Class({
    extends: cc.Component,
    properties: {
        ballNode: cc.Node,
        ballSprite: cc.Sprite,
        starsGroupNode: cc.Node,
        starPrefab: cc.Prefab
    },
    onLoad() {
        if (screen.width > screen.height) {
            alert("This is a portrait game, please rotate your device.\nIf you like to play on a computer with a landscape screen, you may consider using developer tools to simulate mobile devices.");
            location.reload();
        }
        this.yMin = Math.random() * 960 - 480;
        this.yMax = Math.random() * 960 - 480;
        Global.ballPosition = this.ballNode.position;
        Global.isPlaying = true;
        Global.score = 0;
        for (var i = 1; i <= 230; i++) {
            var thisStar = Math.floor(Math.random() * 5);
            var newStarNode = cc.instantiate(this.starPrefab);
            switch (thisStar) {
                case 0:
                    newStarNode.color = cc.Color.YELLOW;
                    break;
                case 1:
                    newStarNode.color = cc.Color.RED;
                    break;
                case 2:
                    newStarNode.color = cc.Color.GREEN;
                    break;
                case 3:
                    newStarNode.color = cc.Color.BLUE;
                    break;
                case 4:
                    newStarNode.color = cc.Color.CYAN;
                    break;
            }
            this.starsGroupNode.addChild(newStarNode);
            newStarNode.x = (Math.random() * 1680) - 320;
            newStarNode.y = (Math.random() * 960) - 480;
        }
    },
    update() {
        if (Global.isClimbing) {
            this.ballNode.y += 6;
            if (this.ballSprite.node.angle <= 10 && Global.settings.enable.enableRotation) this.ballSprite.node.angle++;
            if (this.ballNode.y >= this.yMax) {
                Global.isClimbing = false;
                this.yMax = Math.random() * 960 - 480;
            }
        }
        else {
            this.ballNode.y -= 6;
            if (this.ballSprite.node.angle >= 10 && Global.settings.enable.enableRotation) this.ballSprite.node.angle--;
            if (this.ballNode.y <= this.yMin) {
                Global.isClimbing = true;
                this.yMin = Math.random() * 960 - 480;
            }
        }
        Global.ballPosition = this.ballNode.position;
    },
    onDestroy() {
        Global.ballPosition = null;
        Global.isPlaying = false;
        Global.isClimbing = false;
        Global.score = 0;
    }
});
