var Global = require("Global");

cc.Class({
    extends: cc.Component,
    properties: {
        starPrefab: cc.Prefab,
        bigStarPrefab: cc.Prefab,
        magicStarPrefab: cc.Prefab,
        crossPrefab: cc.Prefab,
        smallStarsNode: cc.Node,
        bigStarsNode: cc.Node,
        magicStarsNode: cc.Node,
        crossesGroup: cc.Node,
        scoreDisplay: cc.Label,
        backgroundNode: cc.Node
    },
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        Global.speedPlaying = 1 + Global.settings.speed;
        this.isDay = true;
        Global.ballPosition = null;
        Global.score = 0;
        Global.isClimbing = false;
        Global.pickingRadius = 32;
        Global.haloNode = null;
        Global.speedClimbing = 1;
        Global.magicStarStatuses = {};
        Global.scoreTimes = 1;
        for (var i = 1; i <= 80; i++) {
            var thisStar = Math.random();
            var newStarNode = cc.instantiate(this.starPrefab);
            if (thisStar < 0.3) {
                newStarNode.color = cc.Color.YELLOW;
                newStarNode.getComponent("Star").starValue = 10;
            }
            else if (thisStar < 0.5) {
                newStarNode.color = cc.Color.RED;
                newStarNode.getComponent("Star").starValue = 20;
            }
            else if (thisStar < 0.65) {
                newStarNode.color = cc.Color.GREEN;
                newStarNode.getComponent("Star").starValue = 40;
            }
            else {
                newStarNode.color = cc.Color.BLUE;
                newStarNode.getComponent("Star").starValue = 80;
            }
            this.smallStarsNode.addChild(newStarNode);
            newStarNode.x = (Math.random() * 640) - 320;
            newStarNode.y = (Math.random() * 960) - 480;
        }
        for (var i = 1; i <= 80; i++) {
            var thisStar = Math.random();
            var newStarNode = cc.instantiate(this.starPrefab);
            if (thisStar < 0.3) {
                newStarNode.color = cc.Color.YELLOW;
                newStarNode.getComponent("Star").starValue = 10;
            }
            else if (thisStar < 0.5) {
                newStarNode.color = cc.Color.RED;
                newStarNode.getComponent("Star").starValue = 20;
            }
            else if (thisStar < 0.65) {
                newStarNode.color = cc.Color.GREEN;
                newStarNode.getComponent("Star").starValue = 40;
            }
            else {
                newStarNode.color = cc.Color.BLUE;
                newStarNode.getComponent("Star").starValue = 80;
            }
            this.smallStarsNode.addChild(newStarNode);
            newStarNode.x = (Math.random() * 1280) + 320;
            newStarNode.y = (Math.random() * 960) - 480;
        }
        var randomX = (Math.random() * 1640) + 320;
        var randomY = (Math.random() * 960) - 480;
        for (var i = 1; i <= 20; i++) {
            var thisStar = Math.random();
            var newStarNode = cc.instantiate(this.bigStarPrefab);
            if (thisStar < 0.3) {
                newStarNode.color = cc.Color.YELLOW;
                newStarNode.getComponent("Star").starValue = 10;
            }
            else if (thisStar < 0.5) {
                newStarNode.color = cc.Color.RED;
                newStarNode.getComponent("Star").starValue = 20;
            }
            else if (thisStar < 0.65) {
                newStarNode.color = cc.Color.GREEN;
                newStarNode.getComponent("Star").starValue = 40;
            }
            else {
                newStarNode.color = cc.Color.BLUE;
                newStarNode.getComponent("Star").starValue = 80;
            }
            this.bigStarsNode.addChild(newStarNode);
            newStarNode.x = randomX + Math.random() * 32 * i;
            newStarNode.y = randomY + (Math.random() * 16) - 8;
        }
        for (var i = 1; i <= 15; i++) {
            var newStarNode = cc.instantiate(this.starPrefab);
            this.smallStarsNode.addChild(newStarNode);
            newStarNode.color = cc.Color.CYAN;
            newStarNode.getComponent("Star").starType = 2;
            newStarNode.x = (Math.random() * 1400) + 320;
            newStarNode.y = (Math.random() * 960) - 480;
        }
        for (var i = 1; i <= 15; i++) {
            var newStarNode = cc.instantiate(this.crossPrefab);
            this.crossesGroup.addChild(newStarNode);
            newStarNode.x = (Math.random() * 1480) - 300;
            newStarNode.y = (Math.random() * 960) - 480;
            newStarNode.angle = (Math.random() * 360) - 180;
        }
        for (var i = 1; i <= 15; i++) {
            var thisStar = Math.floor(Math.random() * 4);
            var newStarNode = cc.instantiate(this.magicStarPrefab);
            switch (thisStar) {
                case 0:
                    if (Global.magicStars.green >= 0) {
                        newStarNode.color = cc.Color.GREEN;
                        newStarNode.getComponent("Star").starType = 7;
                    }
                    else continue;
                    break;
                case 1:
                    if (Global.magicStars.yellow >= 0) {
                        newStarNode.color = cc.Color.YELLOW;
                        newStarNode.getComponent("Star").starType = 4;
                    }
                    else continue;
                    break;
                case 2:
                    if (Global.magicStars.blue >= 0) {
                        newStarNode.color = cc.Color.BLUE;
                        newStarNode.getComponent("Star").starType = 5;
                    }
                    else continue;
                    break;
                case 3:
                    if (Global.magicStars.red >= 0) {
                        newStarNode.color = cc.Color.RED;
                        newStarNode.getComponent("Star").starType = 6;
                    }
                    else continue;
                    break;
            }
            this.magicStarsNode.addChild(newStarNode);
            newStarNode.x = (Math.random() * 5000) + 320;
            newStarNode.y = (Math.random() * 960) - 480;
            newStarNode.angle = (Math.random() * 360) - 180;
        }
    },
    update() {
        if (this.isDay && Math.floor(Global.score / 10000) % 2 == 1 && Global.settings.enable.dayNight) {
            this.isDay = false;
            this.backgroundNode.getComponent(cc.Animation).play("to-night");
        }
        if (!this.isDay && Math.floor(Global.score / 10000) % 2 == 0 && Global.settings.enable.dayNight) {
            this.isDay = true;
            this.backgroundNode.getComponent(cc.Animation).play("to-day");
        }
        this.scoreDisplay.string = Global.score.toString();
    },
    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onTouchStart() {
        Global.isClimbing = true;
        Global.speedClimbing = 1;
    },
    onTouchEnd() {
        Global.isClimbing = false;
        Global.speedClimbing = 1;
    },
    onTouchisCanceled() {
        cc.find("Canvas/Ball").getComponent("Ball").pauseGame();
    },
    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.escape:
                cc.find("Canvas/Ball").getComponent("Ball").pauseGame();
                break;
        }
    }
});
