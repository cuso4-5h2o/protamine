var Global = require("Global");
var Ball = require("Ball");

cc.Class({
    extends: cc.Component,
    properties: {
        starType: 0,
        starValue: 0,
        isRotatable: false,
        haloPrefab: cc.Prefab,
        particlePrefab: cc.Prefab,
        dissolvingAudio: cc.AudioClip,
        magicStarAudio: cc.AudioClip
    },
    onLoad() {
        this.isActived = false;
    },
    update() {
        switch (this.starType) {
            case 3:
                if (Global.magicStarStatuses.yellow > 0 || Global.magicStarStatuses.red) this.isActived = false;
                else this.isActived = true;
                break;
            case 4:
                if (Global.score > 25000 || cc.find("Canvas").getComponent("Game").isDay || Global.magicStarStatuses.yellow > 0 || Global.magicStarStatuses.blue > 0 || Global.magicStarStatuses.red > 0 || Global.magicStarStatuses.green > 0) this.isActived = false;
                else this.isActived = true;
                break;
            case 5:
                if (Global.score > 25000 || Global.magicStarStatuses.blue > 0 || Global.magicStarStatuses.red > 0 || Global.magicStarStatuses.yellow > 0) this.isActived = false;
                else this.isActived = true;
                break;
            case 6:
                if (Global.score > 25000 || Global.magicStarStatuses.blue > 0 || Global.magicStarStatuses.red > 0 || Global.magicStarStatuses.yellow > 0) this.isActived = false;
                else this.isActived = true;
                break;
            case 7:
                if (Global.score > 25000 || Global.magicStarStatuses.green > 0 || Global.magicStarStatuses.yellow > 0 || Global.magicStarStatuses.red > 0) this.isActived = false;
                else this.isActived = true;
                break;
            default:
                this.isActived = true;
        }
        if (this.isRotatable && Global.settings.enable.rotation) this.node.angle--;
        if (this.isCanceled) {
            this.node.y -= 6;
            if (this.node.y <= -500) {
                this.node.x = ((Math.random() * 640) + 960) + ((((Global.score / 50000) + 1) * Global.speedPlaying * 2) * 320);
                this.node.y = (Math.random() * 960) - 480;
                this.node.color = cc.Color.WHITE;
                this.isCanceled = false;
            }
        }
        if (Global.isPlaying) {
            this.node.x -= ((Global.score / 50000) + 1) * Global.speedPlaying * 2;
            if (this.node.x < -480) {
                this.node.x = (Math.random() * (640 + (this.starType >= 4 ? 5000 : 0))) + 320;
                this.node.y = (Math.random() * 960) - 480;
            }
            if (this.isActived && this.node.opacity < 255)
                this.node.opacity += 5;
            else if (!this.isActived && this.node.opacity > 0)
                this.node.opacity -= 5;
            if (this.node.opacity == 0)
                this.node.x = 960 + Math.random() * 2940;
            if (this.getBallDistance() < Global.pickingRadius && this.isActived) {
                this.onPicked();
                return;
            }
        }
    },
    getBallDistance: function () {
        return this.node.position.sub(Global.ballPosition).mag();
    },
    onPicked() {
        if (Global.invincibleTime) return;
        if (this.starType != 1 && this.starType != 3) {
            this.node.x = (Math.random() * 940) + 960;
            this.node.y = (Math.random() * 960) - 480;
        }
        switch (this.starType) {
            case 0:
                Global.score += Math.floor(this.starValue * Global.scoreTimes * Global.settings.speed);
                break;
            case 1:
                Global.score += Math.floor(this.starValue * Global.scoreTimes * 2.5 * Global.settings.speed);
                this.node.x = 1688;
                break;
            case 2:
                Global.score += Math.floor(Math.random() * 30 * Global.settings.speed);
                break;
            case 3:
                if (Global.magicStarStatuses.blue) {
                    if (Global.magicStarStatuses.blue > 0) {
                        if (this.isCanceled) return;
                        Global.magicStarStatuses.blue = Global.magicStarStatuses.blue - 5 > 0 ? Global.magicStarStatuses.blue - 5 : 0;
                        Global.score += Math.floor(this.starValue * Global.scoreTimes * Global.settings.speed);
                        this.node.getComponent(cc.Animation).play("cross-dissolve");
                        cc.audioEngine.play(this.dissolvingAudio, false, Global.settings.volume);
                        this.isCanceled = true;
                    }
                }
                else {
                    cc.find("Canvas/Ball").getComponent(Ball).gameOver();
                }
                break;
            case 4:
                cc.audioEngine.play(this.magicStarAudio, false, Global.settings.volume);
                Global.magicStarStatuses.yellow = 10;
                if (!Global.haloNode) {
                    Global.haloNode = cc.instantiate(this.haloPrefab);
                    var ballNode = cc.find("Canvas/Ball");
                    var size = 64 + 16 * Global.magicStars.yellow;
                    ballNode.addChild(Global.haloNode);
                    Global.haloNode.position = cc.v2(0, 0);
                    Global.haloNode.setContentSize(size * 2, size * 2);
                    Global.pickingRadius = size;
                }
                this.node.x = (Math.random() * 5140) + 1960;
                this.node.y = (Math.random() * 960) - 480;
                break;
            case 5:
                cc.audioEngine.play(this.magicStarAudio, false, Global.settings.volume);
                Global.magicStarStatuses.blue = 10 + Global.magicStars.blue * 5;
                this.node.x = (Math.random() * 5140) + 1960;
                this.node.y = (Math.random() * 960) - 480;
                break;
            case 6:
                cc.audioEngine.play(this.magicStarAudio, false, Global.settings.volume);
                Global.speedPlaying *= 1.5;
                Global.magicStarStatuses.red = 10 + Global.magicStars.red * 5;
                if (!Global.particleNode && Global.settings.enable.particle) {
                    Global.particleNode = cc.instantiate(this.particlePrefab);
                    var ballNode = cc.find("Canvas/Ball");
                    ballNode.addChild(Global.particleNode);
                }
                this.node.x = (Math.random() * 5140) + 1960;
                this.node.y = (Math.random() * 960) - 480;
                break;
            case 7:
                cc.audioEngine.play(this.magicStarAudio, false, Global.settings.volume);
                Global.scoreTimes = 2 + 0.5 * Global.magicStars.green;
                Global.magicStarStatuses.green = 10;
                this.node.x = (Math.random() * 5640) + 1960;
                this.node.y = (Math.random() * 960) - 480;
                break;
        }
    }
});
