var Global = require("Global");

cc.Class({
    extends: cc.Component,
    properties: {
        scoreDisplay: cc.Label,
        highestLabel: cc.Label,
        fragmentNode: cc.Node,
        fragmentLabel: cc.Label,
        fragmentAudio: cc.AudioClip
    },
    start() {
        this.gainedFragments = false;
        Global.fragments += Math.floor(Global.score / 10000);
        if (Global.score > Global.highestScore) {
            Global.highestScore = Global.score;
            this.highestLabel.getComponent(cc.Animation).play();
        }
        else {
            this.highestLabel.string = "Highest Score: " + Global.highestScore.toString();
        }
        Global.saveData();
    },
    update() {
        if (parseInt(this.scoreDisplay.string) < Global.score && Math.round(parseInt(this.scoreDisplay.string) + (Global.score / 25)) < Global.score) {
            if (Global.score < 100) this.scoreDisplay.string = (parseInt(this.scoreDisplay.string) + 10).toString();
            else this.scoreDisplay.string = Math.round(parseInt(this.scoreDisplay.string) + Global.score / 25).toString();
        }
        else {
            this.scoreDisplay.string = Global.score.toString();
            if (Global.score >= 10000) {
                if (!this.gainedFragments) {
                    this.fragmentLabel.string = Math.floor(Global.score / 10000).toString();
                    this.fragmentNode.getComponent(cc.Animation).play();
                    cc.audioEngine.play(this.fragmentAudio, false, Global.settings.volume);
                    this.gainedFragments = true;
                }
            }
        }
    }
});
