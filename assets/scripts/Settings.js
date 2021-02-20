var Global = require("Global");

var labeledToggleType = cc.Class({
    name: "labeledToggle",
    properties: {
        name: "",
        toggle: cc.Toggle
    }
});

cc.Class({
    extends: cc.Component,
    properties: {
        speedSlider: cc.Slider,
        volumeSlider: cc.Slider,
        toggleItems: {
            default: [],
            type: labeledToggleType
        },
        versionLabel: cc.Label
    },
    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        var that = this;
        this.hasChanged = false;
        this.timer = setInterval(() => {
            if (that.hasChanged) {
                Global.saveData();
                that.reLoad();
                that.hasChanged = false;
            }
        }, 500);
        this.versionLabel.string = this.versionLabel.string.replace("{version}", Global.project.version);
        this.reLoad();
    },
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        clearInterval(this.timer);
    },
    onSlided(data) {
        switch (data.slideEvents[0].customEventData) {
            case "speed":
                Global.settings.speed = data.progress + 0.5;
                break;
            case "volume":
                Global.settings.volume = data.progress;
                break;
        }
        this.hasChanged = true;
    },
    onChecked(data) {
        Global.settings.enable[data.checkEvents[0].customEventData] = data.isChecked;
        this.hasChanged = true;
    },
    reLoad() {
        this.speedSlider.progress = Global.settings.speed - 0.5;
        this.volumeSlider.progress = Global.settings.volume;
        for (var i = 0; i < this.toggleItems.length; i++) this.toggleItems[i].toggle.isChecked = Global.settings.enable[this.toggleItems[i].name];
    },
    reset() {
        Global.settings = {
            speed: 1,
            volume: 0.5,
            enable: {
                enableDayNight: true,
                enableParticle: true,
                enableRotation: true,
            }
        };
        Global.saveData();
        this.reLoad();
    },
    openHomePage() {
        window.open(Global.project.homePage);
    }
});
