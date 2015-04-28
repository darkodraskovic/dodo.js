var ScenerySun = A_.SPRITES.Animated.extend({
    spriteSheet: "diskette/moon.png",
    bounded: false,
    origin: {x: 0.5, y: 0.5},
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);
        var sineProps = {period: 1, periodRand: 50, amplitude: 0.012, amplitudeRand: 50};
        this.sine = new A_.SPRITES.Addons.Sine(this, sineProps);
    },
    update: function () {
        this._super();
        this.sine.update();
        this.setScaleX(1 + this.sine.value);
        this.setScaleY(1 + this.sine.value);
    }
});

var SceneryStar = A_.SPRITES.Animated.extend({
    spriteSheet: "diskette/star.png",
    bounded: false,
    origin: {x: 0.5, y: 0.5},
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);
        var sineProps = {period: 0.5, periodRand: 25, amplitude: 0.15, amplitudeRand: 50};
        this.sine = new A_.SPRITES.Addons.Sine(this, sineProps);
    },
    update: function () {
        this._super();
        this.sine.update();
        this.setScaleX(1 + this.sine.value);
        this.setScaleY(1 + this.sine.value);
    }
});
var SceneryPyramid = A_.SPRITES.Animated.extend({
    spriteSheet: "diskette/pyramid.png",
    bounded: false,
    init: function (parent, x, y, props) {
        this._super(parent, x, y, props);
//        var displacementTexture = PIXI.Texture.fromImage("game/graphics/diskette/pyramidDisplacementMap.png");
//        var displacementFilter = new PIXI.DisplacementFilter(displacementTexture);
//        displacementFilter.scale.x = 10;
//        displacementFilter.scale.y = 10;
//        this.sprite.filters = [displacementFilter];
//        this.displacementFilter = displacementFilter;
        
//        var sineProps = {period: 1.5, periodRand: 25, amplitude: 3.5, amplitudeRand: 50};
//        this.sine = new A_.SPRITES.Addons.Sine(this, sineProps);
    },
//    update: function () {
//        this._super();
//        this.sine.update();
//        this.displacementFilter.scale.x = 5 + this.sine.value;
//        this.displacementFilter.scale.y = 5 + this.sine.value;
//    }
});