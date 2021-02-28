module.exports = {
    project: {
        version: "1.0.1",
        homePage: "https://github.com/cuso4-5h2o/protamine"
    },
    settings: cc.sys.localStorage.getItem("settings") ? JSON.parse(cc.sys.localStorage.getItem("settings")) : {
        speed: 1,
        volume: 0.5,
        enable: {
            dayNight: true,
            particle: true,
            rotation: true,
        }
    },
    fragments: cc.sys.localStorage.getItem("fragments") ? parseInt(cc.sys.localStorage.getItem("fragments")) : 0,
    highestScore: cc.sys.localStorage.getItem("highestScore") ? parseInt(cc.sys.localStorage.getItem("highestScore")) : 0,
    magicStars: cc.sys.localStorage.getItem("magicStars") ? JSON.parse(cc.sys.localStorage.getItem("magicStars")) : {},
    score: 0,
    ballPosition: null,
    isPlaying: false,
    isClimbing: false,
    pickingRadius: 32,
    speedPlaying: 1,
    speedClimbing: 1,
    scoreTimes: 1,
    haloNode: null,
    particleNode: null,
    magicStarStatuses: {},
    invincibleTime: false,
    saveData() {
        cc.sys.localStorage.setItem("fragments", this.fragments.toString());
        cc.sys.localStorage.setItem("highestScore", this.highestScore.toString());
        cc.sys.localStorage.setItem("settings", JSON.stringify(this.settings));
        cc.sys.localStorage.setItem("magicStars", JSON.stringify(this.magicStars));
    }
};
