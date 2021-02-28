var Global = require("Global");

cc.Class({
    extends: cc.Component,
    properties: {
        ballSprite: cc.Sprite,
        gameOverPrefab: cc.Prefab,
        toastPrefab: cc.Prefab,
        pausePrefab: cc.Prefab,
        speedClimbing: 0,
        speedFalling: 0,
        comeAudio: cc.AudioClip,
        climbingAudio: cc.AudioClip,
        crashAudio: cc.AudioClip
    },
    start() {
        this.isClimbingAudioPlaying = false;
        var animation = this.node.getComponent(cc.Animation);
        animation.on("stop", this.startGame, this);
        cc.audioEngine.play(this.comeAudio, false, Global.settings.volume);
    },
    update() {
        if (Global.isPlaying) {
            if (Global.isClimbing) {
                if (Global.speedClimbing > 0.2) Global.speedClimbing /= 1.02;
                this.node.y += this.speedClimbing * Global.speedClimbing * (1 + Global.settings.speed);
                if (this.ballSprite.node.angle <= 40 && Global.settings.enable.rotation) this.ballSprite.node.angle++;
                if (!this.isClimbingAudioPlaying) {
                    this.climbingAudioHandle = cc.audioEngine.play(this.climbingAudio, true, Global.settings.volume / 1.5);
                    this.isClimbingAudioPlaying = true;
                }
            }
            else {
                if (Global.speedClimbing < 2) Global.speedClimbing *= 1.02;
                this.node.y -= this.speedFalling * Global.speedClimbing * (1 + Global.settings.speed);
                if (this.ballSprite.node.angle >= -40 && Global.settings.enable.rotation) this.ballSprite.node.angle--;
                if (this.isClimbingAudioPlaying) {
                    cc.audioEngine.stop(this.climbingAudioHandle);
                    this.isClimbingAudioPlaying = false;
                }
            }
            if (Global.invincibleTime && this.node.opacity >= 125) this.node.opacity--;
            if (!Global.invincibleTime && this.node.opacity <= 125) this.node.opacity++;
            if (this.node.y > -464 && this.node.y < 464) Global.ballPosition = this.node.position;
            else this.gameOver();
        }
    },
    startGame() {
        this.node.y = 0;
        Global.speedClimbing = 1;
        var animation = this.node.getComponent(cc.Animation);
        Global.isPlaying = true;
        Global.invincibleTime = true;
        setTimeout(function () {
            Global.invincibleTime = false;
        }, 900);
        animation.off("stop", this.startGame, this);
    },
    gameOver() {
        if (Global.invincibleTime) return;
        Global.isPlaying = false;
        Global.isClimbing = false;
        if (this.isClimbingAudioPlaying) {
            cc.audioEngine.stop(this.climbingAudioHandle);
            this.isClimbingAudioPlaying = false;
        }
        this.crashAnim = this.getComponent(cc.Animation);
        this.crashAnim.playAdditive("ball-crash");
        cc.audioEngine.play(this.crashAudio, false, Global.settings.volume);
        var that = this;
        this.played = () => {
            that.node.y = 0;
            Global.isPlaying = false;
            cc.find("Canvas").addChild(cc.instantiate(that.toastPrefab));
            cc.find("Canvas").addChild(cc.instantiate(that.gameOverPrefab));
            that.crashAnim.off("stop", that.played, that);
        }
        this.crashAnim.on("stop", that.played, that);
    },
    pauseGame() {
        if (Global.isPlaying) {
            if (this.isClimbingAudioPlaying) {
                cc.audioEngine.stop(this.climbingAudioHandle);
                this.isClimbingAudioPlaying = false;
            }
            Global.isPlaying = false;
            Global.isClimbing = false;
            this.getComponent(cc.Animation).playAdditive("ball-crash");
            cc.find("Canvas").addChild(cc.instantiate(this.toastPrefab));
            cc.find("Canvas").addChild(cc.instantiate(this.pausePrefab));
        }
    },
    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                Global.isClimbing = true;
                Global.speedClimbing = 1;
                break;
        }
    },
    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                Global.isClimbing = false;
                Global.speedClimbing = 1;
                break;
        }
    },
    onLoad() {
        Global.isClimbing = false;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onDestroy() {
        if (this.isClimbingAudioPlaying) {
            cc.audioEngine.stop(this.climbingAudioHandle);
            this.isClimbingAudioPlaying = false;
        }
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
});
